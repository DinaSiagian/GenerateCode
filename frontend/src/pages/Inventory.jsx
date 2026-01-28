import React, { useState, useEffect } from 'react';
import { Table, Card, Badge } from 'react-bootstrap';
import api from '../api';

const Inventory = () => {
  const [items, setItems] = useState([]);
<<<<<<< Updated upstream

  useEffect(() => {
    api.get('/items').then(res => setItems(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <Card className="m-4 shadow-sm border-0 p-4">
      <h4 className="fw-bold mb-4">Daftar Inventaris PT Pelindo</h4>
      <Table hover responsive>
        <thead className="table-light"><tr><th>Kode</th><th>Nama Barang</th><th>Status</th></tr></thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="fw-bold text-primary">{item.kode_barang}</td>
              <td>{item.nama_barang}</td>
              <td><Badge bg="success">{item.status}</Badge></td>
=======
  const [searchTerm, setSearchTerm] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadData = () => api.get('/items').then(res => setItems(res.data));
  useEffect(() => { loadData(); }, []);

  const filteredItems = items.filter(item => 
    item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.kode_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = (item) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Label ${item.kode_barang}</title><style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}.label{border:2px solid #000;padding:15px;width:250px;text-align:center;border-radius:8px;}.name{font-weight:bold;font-size:16px;margin:10px 0;}</style></head>
        <body>
          <div class="label">
            <div>GENCODE ADMIN</div>
            <div class="name">${item.nama_barang}</div>
            <div id="qr"></div>
            <div style="background:#eee;margin-top:10px;">${item.kode_barang}</div>
          </div>
          <script>
            const canvas = window.opener.document.getElementById('qr-source-${item.id}');
            const img = document.createElement('img');
            img.src = canvas.toDataURL();
            img.width = 120;
            document.getElementById('qr').appendChild(img);
            setTimeout(() => { window.print(); window.close(); }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="p-2">
      <InputGroup className="mb-4 shadow-sm" style={{ maxWidth: '400px' }}>
        <InputGroup.Text className="bg-white border-end-0"><Search size={18}/></InputGroup.Text>
        <Form.Control placeholder="Cari aset..." className="border-start-0" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </InputGroup>

      <div style={{ display: 'none' }}>
        {items.map(item => <QRCodeCanvas id={`qr-source-${item.id}`} key={item.id} value={`http://192.168.1.13:5173/scan/${item.kode_barang}`} size={128} />)}
      </div>

      <Table hover responsive className="bg-white shadow-sm rounded">
        <thead className="table-light"><tr><th>Kode</th><th>Nama</th><th>Kategori</th><th>Lokasi</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td className="fw-bold text-primary">{item.kode_barang}</td>
              <td>{item.nama_barang}</td>
              <td>{item.kategori}</td>
              <td>{item.lokasi}</td>
              <td><Badge bg={item.status === 'Tersedia' ? 'success' : 'warning'}>{item.status}</Badge></td>
              <td>
                <Button variant="link" onClick={() => handlePrint(item)}><Printer size={18}/></Button>
                <Button variant="link" onClick={() => { setSelectedItem(item); setShowEdit(true); }}><Edit size={18}/></Button>
                <Button variant="link" className="text-danger" onClick={() => api.delete(`/items/${item.id}`).then(loadData)}><Trash2 size={18}/></Button>
              </td>
>>>>>>> Stashed changes
            </tr>
          ))}
        </tbody>
      </Table>
<<<<<<< Updated upstream
    </Card>
=======

      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton><Modal.Title>Ubah Status</Modal.Title></Modal.Header>
        <Form onSubmit={async (e) => { e.preventDefault(); await api.put(`/items/${selectedItem.id}`, selectedItem); setShowEdit(false); loadData(); }}>
          <Modal.Body>
            <Form.Select value={selectedItem?.status || ""} onChange={(e) => setSelectedItem({...selectedItem, status: e.target.value})}>
              <option value="Tersedia">Tersedia</option>
              <option value="Dipinjam">Dipinjam</option>
              <option value="Maintenance">Maintenance</option>
            </Form.Select>
          </Modal.Body>
          <Modal.Footer><Button type="submit" variant="primary">Simpan</Button></Modal.Footer>
        </Form>
      </Modal>
    </div>
>>>>>>> Stashed changes
  );
};
export default Inventory;