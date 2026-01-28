import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Badge, Container } from 'react-bootstrap';
import { Box, MapPin, Tag, Info } from 'lucide-react';
import api from '../api';

const ScanResult = () => {
  const { kode_barang } = useParams();
  const [item, setItem] = useState(null);
  useEffect(() => { api.get(`/items/scan/${kode_barang}`).then(res => setItem(res.data)); }, [kode_barang]);

  if (!item) return <div className="p-5 text-center">Mencari data...</div>;

  return (
    <Container className="p-3 d-flex justify-content-center">
      <Card className="shadow-lg border-0 w-100" style={{ maxWidth: '400px', borderRadius: '20px' }}>
        <div className="bg-primary p-4 text-white text-center rounded-top">
          <Box size={40} className="mb-2" />
          <h5 className="fw-bold mb-0">DETAIL ASET</h5>
        </div>
        <Card.Body className="p-4">
          <div className="text-center mb-4"><small className="text-muted fw-bold">KODE</small><h2 className="fw-bold">{item.kode_barang}</h2></div>
          <div className="mb-3"><small className="text-muted d-block">Nama</small><span className="fw-bold">{item.nama_barang}</span></div>
          <div className="mb-3"><small className="text-muted d-block">Kategori</small><span className="fw-bold">{item.kategori}</span></div>
          <div className="mb-4"><small className="text-muted d-block">Lokasi</small><span className="fw-bold">{item.lokasi}</span></div>
          <div className="text-center bg-light p-3 rounded">
            <Badge bg={item.status === 'Tersedia' ? 'success' : 'warning'} className="px-4 py-2 fs-6">{item.status.toUpperCase()}</Badge>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default ScanResult;