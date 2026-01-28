import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Badge, Spinner, Container } from "react-bootstrap";
import { MapPin, Tag, Package, Info } from "lucide-react";
import api from "../api";

const ItemDetail = () => {
    const { kode_barang } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await api.get(`/items/detail/${kode_barang}`);
                setItem(res.data);
            } catch (err) {
                console.error("Data tidak ditemukan");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [kode_barang]);

    if (loading)
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
            </div>
        );

    if (!item)
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <h4>Data Aset Tidak Ditemukan</h4>
            </div>
        );

    return (
        <div className="bg-primary vh-100 d-flex align-items-center">
            <Container className="d-flex justify-content-center">
                <Card
                    className="shadow-lg border-0 rounded-4 overflow-hidden"
                    style={{ maxWidth: "500px", width: "90%" }}
                >
                    <div className="bg-dark p-4 text-center">
                        <h5 className="text-primary fw-bold mb-0">
                            INFORMASI ASET
                        </h5>
                        <small className="text-white-50">
                            {item.kode_barang}
                        </small>
                    </div>
                    <Card.Body className="p-4 bg-white">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-dark mb-1">
                                {item.nama_barang}
                            </h2>
                            <Badge
                                bg={
                                    item.status === "Tersedia"
                                        ? "success"
                                        : "warning"
                                }
                                className="px-3 py-2 rounded-pill"
                            >
                                {item.status}
                            </Badge>
                        </div>

                        <div className="d-flex align-items-center mb-3 p-3 border rounded-3">
                            <Tag className="text-primary me-3" size={24} />
                            <div>
                                <label className="text-muted small d-block">
                                    Kategori
                                </label>
                                <span className="fw-bold text-dark">
                                    {item.kategori}
                                </span>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-3 p-3 border rounded-3">
                            <MapPin className="text-danger me-3" size={24} />
                            <div>
                                <label className="text-muted small d-block">
                                    Lokasi Penempatan
                                </label>
                                <span className="fw-bold text-dark">
                                    {item.lokasi}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-muted small mb-0">
                                Scan date:{" "}
                                {new Date().toLocaleDateString("id-ID")}
                            </p>
                            <p className="fw-bold text-primary small">
                                GENCODE - PT PELINDO
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default ItemDetail;
