import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
<<<<<<< Updated upstream
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
=======
import { QrCode, Save } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react'; // Pastikan library ini sudah terinstall
import api from '../api';

const AddItem = () => {
  const [formData, setFormData] = useState({ 
    nama_barang: '', 
    kode_barang: '', 
    kategori: 'Elektronik', 
    lokasi: 'Lantai 1 - Divisi IT', 
    status: 'Tersedia' 
  });

  const categories = ["Elektronik", "Perabot", "Kendaraan", "ATK", "Mesin", "Fasilitas", "Kebersihan", "K3"];
  const floors = [1, 2, 3, 4, 5, 6, 7, 8];
  const divisions = ["IT", "SDM", "Keuangan", "Operasional"];

  const locationOptions = [];
  floors.forEach(f => {
    divisions.forEach(d => {
      locationOptions.push(`Lantai ${f} - Divisi ${d}`);
    });
  });

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Pastikan kode barang sudah di-generate sebelum simpan
    if (!formData.kode_barang) {
      alert("Klik tombol QR dulu untuk generate kode!");
      return;
    }

    try { 
      // Mengirim data ke http://localhost:8000/api/items
      await api.post('/items', formData); 
      alert("Barang Berhasil Tersimpan!"); 
      
      // Reset form agar bisa input barang baru lagi
      setFormData({ 
        nama_barang: '', 
        kode_barang: '', 
        kategori: 'Elektronik', 
        lokasi: 'Lantai 1 - Divisi IT', 
        status: 'Tersedia' 
      }); 
    } catch (err) { 
      console.error(err);
      alert("Gagal Simpan! Pastikan MySQL aktif dan koneksi internet stabil."); 
    }
  };

  return (
    <div className="p-2">
      <Row>
        <Col md={8}>
          <Card className="p-4 shadow-sm border-0">
            <h4 className="fw-bold mb-4 text-primary text-uppercase">Input Aset Baru</h4>
            <Form onSubmit={handleSave}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nama Barang</Form.Label>
                <Form.Control 
                  required 
                  placeholder="Masukkan nama aset..."
                  value={formData.nama_barang} 
                  onChange={e => setFormData({...formData, nama_barang: e.target.value})} 
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Kategori</Form.Label>
                    <Form.Select 
                      value={formData.kategori}
                      onChange={e => setFormData({...formData, kategori: e.target.value})}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Lokasi Penempatan</Form.Label>
                    <Form.Select 
                      value={formData.lokasi}
                      onChange={e => setFormData({...formData, lokasi: e.target.value})}
                    >
                      {locationOptions.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Kode Barang</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control 
                    readOnly 
                    placeholder="Klik tombol generate..."
                    value={formData.kode_barang} 
                  />
                  <Button 
                    variant="dark" 
                    onClick={() => setFormData({...formData, kode_barang: `GEN-${Math.floor(1000 + Math.random() * 9000)}`})}
                  >
                    <QrCode size={18}/>
                  </Button>
                </div>
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 fw-bold py-2 shadow-sm">
                <Save size={20} className="me-2"/> SIMPAN DATA KE DATABASE
              </Button>
            </Form>
          </Card>
        </Col>

        {/* PRATINJAU QR CODE (BARU) */}
        <Col md={4}>
          <Card className="p-4 shadow-sm border-0 text-center h-100 d-flex flex-column align-items-center justify-content-center">
            <h6 className="fw-bold text-muted mb-3 text-uppercase">Pratinjau QR Scan</h6>
            {formData.kode_barang ? (
              <>
                <div className="p-3 bg-white border rounded shadow-sm mb-3">
                  {/* LINK DISINI MENGGUNAKAN IP KAMU */}
                  <QRCodeCanvas 
                    value={`http://10.181.8.82:5173/scan/${formData.kode_barang}`} 
                    size={180}
                  />
                </div>
                <div className="fw-bold text-primary">{formData.kode_barang}</div>
                <small className="text-muted mt-2">Scan QR ini dengan HP kamu untuk melihat detail aset.</small>
              </>
            ) : (
              <div className="text-muted italic">Klik generate untuk melihat QR Code</div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
>>>>>>> Stashed changes
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