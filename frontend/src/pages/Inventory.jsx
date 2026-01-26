import React, { useState, useEffect } from 'react';
import { Table, Card, Badge } from 'react-bootstrap';
import api from '../api';

const Inventory = () => {
  const [items, setItems] = useState([]);

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
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
export default Inventory;