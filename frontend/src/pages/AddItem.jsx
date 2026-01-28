import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { QrCode, Save, MapPin } from "lucide-react";
import api from "../api";

const AddItem = () => {
    const [formData, setFormData] = useState({
        nama_barang: "",
        kode_barang: "",
        kategori: "Elektronik",
        lokasi: "Lantai 1 - Divisi IT",
        status: "Tersedia",
    });

    // Data Pilihan Kategori (8 Kategori)
    const categories = [
        "Elektronik",
        "Perabot Kantor",
        "Kendaraan",
        "Alat Tulis Kantor (ATK)",
        "Mesin & Alat Berat",
        "Fasilitas Umum",
        "Alat Kebersihan",
        "Keamanan (K3)",
    ];

    // Data Pilihan Lokasi (8 Lantai x 4 Divisi)
    // Data Pilihan Lokasi (8 Lantai x 4 Divisi)
    const floors = [1, 2, 3, 4, 5, 6, 7, 8];

    const divisionsByFloor = {
        1: ["IT", "SDM", "Keuangan", "Operasional"],
        2: ["Marketing", "Legal", "Pengadaan", "Logistik"],
        3: ["Akuntansi", "Audit Internal", "Perencanaan", "Risiko"],
        4: [
            "Customer Service",
            "Quality Control",
            "Compliance",
            "Public Relation",
        ],
        5: ["Engineering", "Maintenance", "Asset Management", "HSE"],
        6: ["Data Analyst", "Business Intelligence", "R&D", "Innovation"],
        7: [
            "Corporate Strategy",
            "PMO",
            "Procurement Support",
            "Vendor Management",
        ],
        8: [
            "Direksi",
            "Sekretariat Perusahaan",
            "Internal Control",
            "Corporate Affairs",
        ],
    };

    const locationOptions = [];
    floors.forEach((f) => {
        divisionsByFloor[f].forEach((d) => {
            locationOptions.push(`Lantai ${f} - Divisi ${d}`);
        });
    });

    const handleGenerate = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        setFormData({ ...formData, kode_barang: `GEN-${randomNum}` });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/items", formData);
            alert("Barang Berhasil Tersimpan!");
            setFormData({ ...formData, nama_barang: "", kode_barang: "" });
        } catch (err) {
            alert("Gagal Simpan! Periksa koneksi atau kode barang.");
        }
    };

    return (
        <div className="p-4">
            <Card className="shadow-sm border-0 p-4">
                <h4 className="fw-bold mb-4 text-primary">Input Aset Baru</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Nama Barang</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Contoh: Laptop Asus"
                            value={formData.nama_barang}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    nama_barang: e.target.value,
                                })
                            }
                            required
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">
                                    Kategori
                                </Form.Label>
                                <Form.Select
                                    value={formData.kategori}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            kategori: e.target.value,
                                        })
                                    }
                                >
                                    {categories.map((cat, i) => (
                                        <option key={i} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">
                                    Lokasi Penempatan
                                </Form.Label>
                                <Form.Select
                                    value={formData.lokasi}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            lokasi: e.target.value,
                                        })
                                    }
                                >
                                    {locationOptions.map((loc, i) => (
                                        <option key={i} value={loc}>
                                            {loc}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">
                                    Kode Barang
                                </Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="text"
                                        value={formData.kode_barang}
                                        readOnly
                                    />
                                    <Button
                                        variant="dark"
                                        onClick={handleGenerate}
                                    >
                                        <QrCode size={18} />
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                        <Save size={20} /> SIMPAN KE DATABASE
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default AddItem;
