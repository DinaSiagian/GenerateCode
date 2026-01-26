import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import api from '../api';

const AddItem = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");

  const generateCode = () => setKode(`GEN-${Math.floor(1000 + Math.random() * 9000)}`);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post('/items', { 
      nama_barang: nama, 
      kode_barang: kode, 
      kategori: 'Elektronik', 
      status: 'Tersedia' 
    });
    alert("Barang Berhasil Tersimpan ke MySQL!");
    navigate('/inventory'); 
  } catch (err) {
    console.error("ERROR NYA ADALAH:", err.response); // LIHAT DI F12
    alert("Gagal Simpan! Cek Console (F12) untuk detail error.");
  }
};

  return (
    <Row className="p-4 g-4">
      <Col md={8}>
        <Card className="p-4 shadow-sm border-0">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Nama Barang</Form.Label>
              <Form.Control value={nama} onChange={(e) => setNama(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Kode Barang</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control readOnly value={kode} className="bg-light" />
                <Button variant="dark" onClick={generateCode}>Generate</Button>
              </div>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100 fw-bold" disabled={!kode}>SIMPAN DATA</Button>
          </Form>
        </Card>
      </Col>
      <Col md={4} className="text-center">
        <Card className="p-4 shadow-sm border-0 h-100 d-flex flex-column align-items-center justify-content-center">
          <QRCodeSVG value={kode || "N/A"} size={180} />
          <h5 className="mt-3 font-monospace">{kode || "----"}</h5>
        </Card>
      </Col>
    </Row>
  );
};
export default AddItem;