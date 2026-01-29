import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { QrCode, Save } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import api from '../api';

const AddItem = () => {
  // State ini harus cocok dengan yang diminta controller di backend
  const [formData, setFormData] = useState({ 
    nama_barang: '', 
    kode_barang: '', 
    kategori: 'Elektronik', // Default value
    lokasi: 'Lantai 1 - Divisi IT', // Default value (PENTING: Jangan kosong)
    status: 'Tersedia' // Default value
  });

  // Opsi dropdown
  const categories = ["Elektronik", "Perabot", "Kendaraan", "ATK", "Mesin", "Fasilitas"];
  const floors = [1, 2, 3, 4, 5, 6, 7, 8];
  const divisions = ["IT", "SDM", "Keuangan", "Operasional"];
  const locationOptions = [];
  floors.forEach(f => divisions.forEach(d => locationOptions.push(`Lantai ${f} - Divisi ${d}`)));

  const handleSave = async (e) => {
    e.preventDefault();
    // Validasi di frontend sebelum kirim
    if (!formData.kode_barang) return alert("Mohon generate kode barang terlebih dahulu!");
    if (!formData.nama_barang) return alert("Nama barang wajib diisi!");

    try { 
      // Mengirim data ke backend
      await api.post('/items', formData); 
      alert("SUKSES: Aset berhasil disimpan ke database!"); 
      // Reset form setelah berhasil
      setFormData({ ...formData, nama_barang: '', kode_barang: '' }); 
    } catch (err) { 
        console.error(err);
        // Tampilkan pesan error yang lebih jelas
        const errorMessage = err.response?.data?.message || "Gagal Menyimpan! Pastikan backend berjalan dan kode unik.";
        alert(errorMessage); 
    }
  };

  // Fungsi untuk generate kode acak
  const generateCode = () => {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      setFormData({...formData, kode_barang: `PEL-${randomNum}`});
  };

  return (
    <Row className="g-4">
      <Col md={8}>
        <Card className="card-premium p-4">
          <h5 className="fw-bold text-primary mb-4">Registrasi Aset Baru</h5>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold">NAMA BARANG</Form.Label>
              <Form.Control required className="form-control-lg" placeholder="Contoh: Laptop Dell..." value={formData.nama_barang} onChange={e => setFormData({...formData, nama_barang: e.target.value})} />
            </Form.Group>
            <Row className="mb-4">
              <Col md={6}>
                  <Form.Label className="small fw-bold">KATEGORI</Form.Label>
                  <Form.Select className="form-select-lg" value={formData.kategori} onChange={e => setFormData({...formData, kategori: e.target.value})}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </Form.Select>
              </Col>
              <Col md={6}>
                  <Form.Label className="small fw-bold">LOKASI PENEMPATAN</Form.Label>
                  <Form.Select className="form-select-lg" value={formData.lokasi} onChange={e => setFormData({...formData, lokasi: e.target.value})}>
                      {locationOptions.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </Form.Select>
              </Col>
            </Row>
            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold">KODE BARANG (UNIK)</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control readOnly className="form-control-lg bg-light" placeholder="Klik tombol di samping..." value={formData.kode_barang} />
                <Button variant="dark" className="px-4" onClick={generateCode}><QrCode/></Button>
              </div>
            </Form.Group>
            <Button type="submit" className="btn-blue-gradient w-100 py-3 mt-2"><Save className="me-2"/> SIMPAN DATA ASET</Button>
          </Form>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="card-premium p-4 text-center" style={{ background: '#f8f9fa' }}>
          <h6 className="fw-bold mb-3">Preview QR Code Label</h6>
          <div className="p-3 bg-white shadow-sm border rounded-4 d-inline-block">
            {/* QR Code mengarah ke IP Laptop */}
            {formData.kode_barang ? <QRCodeCanvas value={`http://10.181.8.82:5173/scan/${formData.kode_barang}`} size={180} /> : <div style={{width:180, height:180}} className="d-flex align-items-center justify-content-center bg-light text-muted small fw-bold">Generate Kode Dulu</div>}
          </div>
          <p className="text-muted small mt-3 mb-0">QR ini akan dicetak dan ditempel pada aset fisik.</p>
        </Card>
      </Col>
    </Row>
  );
};
export default AddItem;