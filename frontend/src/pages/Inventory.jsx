import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';
import api from '../api';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const loadData = () => api.get('/items').then(res => setItems(res.data));
  useEffect(() => { loadData(); }, []);

  const handlePrint = (item) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html><body><h3>${item.nama_barang}</h3><div id="qr"></div><script>const canvas = window.opener.document.getElementById('qr-source-${item.id}'); const img = document.createElement('img'); img.src = canvas.toDataURL(); document.getElementById('qr').appendChild(img); setTimeout(() => { window.print(); window.close(); }, 500);</script></body></html>`);
    printWindow.document.close();
  };

  return (
    <Table striped bordered hover bg="white">
      <thead><tr><th>Kode</th><th>Nama</th><th>Lokasi</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.kode_barang}</td>
            <td>{item.nama_barang}</td>
            <td>{item.lokasi}</td>
            <td><Badge bg={item.status === 'Tersedia' ? 'success' : 'warning'}>{item.status}</Badge></td>
            <td>
              <Button size="sm" variant="outline-primary" onClick={() => handlePrint(item)}>Cetak</Button>
              <div style={{ display: 'none' }}>
<QRCodeCanvas 
  value={`http://10.181.6.108:5173/item/${item.kode_barang}`} 
  size={128} 
/>              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default Inventory;