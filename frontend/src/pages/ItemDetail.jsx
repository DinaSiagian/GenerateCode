import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Badge, Spinner, Container, Button } from "react-bootstrap";
import { MapPin, Tag, HandHelping } from "lucide-react";
import api from "../api";

const ItemDetail = () => {
    const { kode_barang } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDetail = async () => {
        try {
            const res = await api.get(`/items/scan/${kode_barang}`);
            setItem(res.data);
        } catch (err) { console.error("Data aset tidak ditemukan"); } finally { setLoading(false); }
    };

    useEffect(() => { fetchDetail(); }, [kode_barang]);

    const handleBorrow = async () => {
        if (!window.confirm(`Yakin ingin meminjam ${item.nama_barang}?`)) return;
        try {
            await api.put(`/items/borrow/${item.kode_barang}`);
            alert("Berhasil meminjam aset!");
            fetchDetail();
        } catch (err) { alert("Gagal memproses peminjaman."); }
    };

    if (loading) return <div className="vh-100 d-flex justify-content-center align-items-center"><Spinner animation="border" variant="light" /></div>;
    if (!item) return <div className="vh-100 d-flex justify-content-center align-items-center text-white"><h4>Aset Tidak Terdaftar</h4></div>;

    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ background: '#007bff' }}>
            <Container className="d-flex justify-content-center p-3">
                <Card className="card-premium overflow-hidden" style={{ maxWidth: "450px", width: "100%" }}>
                    <div className="bg-dark p-4 text-center">
                        <h5 className="text-primary fw-bold mb-0">INFORMASI ASET</h5>
                        <small className="text-white-50">{item.kode_barang}</small>
                    </div>
                    <Card.Body className="p-4 bg-white">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-dark">{item.nama_barang}</h2>
                            <Badge bg={item.status === "Tersedia" ? "success" : "primary"} className="px-3 py-2 rounded-pill shadow-sm fs-6">
                                {item.status}
                            </Badge>
                        </div>
                        <div className="p-3 border rounded-3 mb-3 d-flex align-items-center bg-light">
                            <Tag className="text-primary me-3" size={24} />
                            <div><small className="text-muted d-block">Kategori</small><strong className="text-dark">{item.kategori}</strong></div>
                        </div>
                        <div className="p-3 border rounded-3 mb-4 d-flex align-items-center bg-light">
                            <MapPin className="text-danger me-3" size={24} />
                            <div><small className="text-muted d-block">Lokasi Penempatan</small><strong className="text-dark">{item.lokasi}</strong></div>
                        </div>
                        {item.status === "Tersedia" && (
                            <Button variant="primary" className="w-100 py-3 fw-bold rounded-3 shadow" onClick={handleBorrow}>
                                <HandHelping className="me-2" size={20} /> PINJAM BARANG
                            </Button>
                        )}
                        <div className="mt-4 text-center text-muted small">
                            Scan date: {new Date().toLocaleDateString("id-ID")}<br/>
                            <strong>GENCODE - PT PELINDO</strong>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};
export default ItemDetail;