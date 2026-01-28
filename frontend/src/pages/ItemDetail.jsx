import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Badge, Spinner, Container, Button } from "react-bootstrap";
import { MapPin, Tag, Package, Info, HandHelping } from "lucide-react"; // Perbaikan: HandHelping tanpa spasi
import api from "../api";

const ItemDetail = () => {
    const { kode_barang } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [borrowing, setBorrowing] = useState(false); // State untuk proses klik tombol

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

    useEffect(() => {
        fetchDetail();
    }, [kode_barang]);

    // Fungsi untuk menangani peminjaman barang
    const handleBorrow = async () => {
        if (
            !window.confirm(
                `Apakah Anda yakin ingin meminjam ${item.nama_barang}?`,
            )
        )
            return;

        setBorrowing(true);
        try {
            // Mengirim permintaan ke backend untuk update status dan jumlah
            // Pastikan backend Anda memiliki endpoint PUT /items/borrow/{kode_barang}
            await api.put(`/items/borrow/${item.kode_barang}`);

            alert(
                "Berhasil meminjam barang! Status admin otomatis diperbarui.",
            );

            // Segarkan data untuk melihat perubahan status terbaru
            fetchDetail();
        } catch (err) {
            alert(
                err.response?.data?.message ||
                    "Gagal melakukan peminjaman barang. Pastikan endpoint tersedia.",
            );
        } finally {
            setBorrowing(false);
        }
    };

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
                                        : item.status === "Dipinjam"
                                          ? "primary"
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

                        {/* Penambahan Tombol Pinjam: Hanya muncul jika statusnya "Tersedia" */}
                        {item.status === "Tersedia" && (
                            <div className="mt-4">
                                <Button
                                    variant="primary"
                                    className="w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center"
                                    onClick={handleBorrow}
                                    disabled={borrowing}
                                >
                                    {borrowing ? (
                                        <Spinner
                                            animation="sm"
                                            size="sm"
                                            className="me-2"
                                        />
                                    ) : (
                                        <HandHelping
                                            className="me-2"
                                            size={20}
                                        />
                                    )}
                                    PINJAM BARANG
                                </Button>
                                <p
                                    className="text-center text-muted tiny mt-2"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    *Peminjaman akan mengurangi jumlah tersedia
                                    di database.
                                </p>
                            </div>
                        )}

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
