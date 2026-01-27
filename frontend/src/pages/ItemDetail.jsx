import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Badge, Spinner, Button } from "react-bootstrap";
import { ArrowLeft, MapPin, Tag, Package, Info } from "lucide-react";
import api from "../api";

const ItemDetail = () => {
    const { kode_barang } = useParams(); // Ambil kode dari URL
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await api.get(`/items/detail/${kode_barang}`);
                setItem(res.data);
            } catch (err) {
                console.error("Barang tidak ditemukan");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [kode_barang]);

    if (loading)
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );

    if (!item)
        return (
            <div className="text-center mt-5">
                <h4>⚠️ Barang Tidak Ditemukan</h4>
                <Link to="/inventory">
                    <Button variant="primary">Kembali ke Inventaris</Button>
                </Link>
            </div>
        );

    return (
        <div className="p-4 d-flex justify-content-center">
            <Card
                className="shadow-lg border-0"
                style={{ maxWidth: "600px", width: "100%" }}
            >
                <Card.Header className="bg-primary text-white p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="m-0 fw-bold">Detail Informasi Aset</h4>
                        <Badge bg="light" text="dark">
                            {item.kode_barang}
                        </Badge>
                    </div>
                </Card.Header>
                <Card.Body className="p-4">
                    <div className="mb-4 text-center">
                        <div className="display-6 fw-bold text-dark mb-2">
                            {item.nama_barang}
                        </div>
                        <Badge
                            bg={
                                item.status === "Tersedia"
                                    ? "success"
                                    : "warning"
                            }
                            className="px-3 py-2"
                        >
                            Status: {item.status}
                        </Badge>
                    </div>

                    <div className="d-flex align-items-center mb-3 p-3 bg-light rounded">
                        <Tag className="me-3 text-primary" />
                        <div>
                            <small className="text-muted d-block">
                                Kategori
                            </small>
                            <span className="fw-bold">{item.kategori}</span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center mb-3 p-3 bg-light rounded">
                        <MapPin className="me-3 text-danger" />
                        <div>
                            <small className="text-muted d-block">
                                Lokasi Penempatan
                            </small>
                            <span className="fw-bold">{item.lokasi}</span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded">
                        <Info className="me-3 text-info" />
                        <div>
                            <small className="text-muted d-block">
                                Terakhir Update
                            </small>
                            <span className="fw-bold">
                                {new Date(item.updated_at).toLocaleString(
                                    "id-ID",
                                )}
                            </span>
                        </div>
                    </div>

                    <Link to="/inventory">
                        <Button
                            variant="outline-secondary"
                            className="w-100 d-flex align-items-center justify-content-center gap-2"
                        >
                            <ArrowLeft size={18} /> Kembali ke Daftar
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ItemDetail;
