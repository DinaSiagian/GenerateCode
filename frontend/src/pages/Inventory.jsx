import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Modal, Form, InputGroup } from "react-bootstrap";
import { Trash2, Edit, Printer, Search } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import api from "../api";

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci pencarian
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const loadData = () => api.get("/items").then((res) => setItems(res.data));
    useEffect(() => {
        loadData();
    }, []);

    // FUNGSI FILTER: Sekarang menyaring berdasarkan Nama, Kode, DAN Lokasi
    const filteredItems = items.filter(
        (item) =>
            item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.kode_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.lokasi &&
                item.lokasi.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    const handlePrint = (item) => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
      <html>
        <head>
          <title>Cetak Label - ${item.kode_barang}</title>
          <style>
            body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .label-box { border: 2px solid #000; padding: 15px; width: 250px; text-align: center; border-radius: 8px; }
            .company { font-weight: bold; font-size: 14px; margin-bottom: 10px; color: #0056b3; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            .item-name { font-size: 16px; font-weight: bold; margin: 10px 0; }
            .qr-code { margin: 10px 0; }
            .item-code { font-family: monospace; font-size: 14px; background: #eee; padding: 2px 5px; }
          </style>
        </head>
        <body>
          <div class="label-box">
            <div class="company">GENCODE ADMIN SYSTEM</div>
            <div class="item-name">${item.nama_barang}</div>
            <div id="qr-container" class="qr-code"></div>
            <div class="item-code">${item.kode_barang}</div>
          </div>
          <script>
            const canvas = window.opener.document.getElementById('qr-source-${item.id}');
            const img = document.createElement('img');
            img.src = canvas.toDataURL();
            img.width = 120;
            document.getElementById('qr-container').appendChild(img);
            setTimeout(() => { window.print(); window.close(); }, 500);
          </script>
        </body>
      </html>
    `);
        printWindow.document.close();
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setShowEdit(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await api.put(`/items/${selectedItem.id}`, selectedItem);
        setShowEdit(false);
        loadData();
    };

    const deleteItem = async (id) => {
        if (window.confirm("Hapus aset ini?")) {
            await api.delete(`/items/${id}`);
            loadData();
        }
    };

    return (
        <div className="p-4">
            {/* Kolom Pencarian Dinamis */}
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h4 className="fw-bold text-dark m-0">Daftar Inventaris</h4>
                <InputGroup style={{ width: "350px" }}>
                    <InputGroup.Text className="bg-white border-end-0">
                        <Search size={18} className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Cari Nama, Kode, atau Lokasi..."
                        className="border-start-0 shadow-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>

            {/* PENAMBAHAN: QR Code sekarang berisi Link Detail Aset */}
            <div style={{ display: "none" }}>
                {items.map((item) => (
                    <QRCodeCanvas
                        id={`qr-source-${item.id}`}
                        key={item.id}
                        value={`${window.location.origin}/item/${item.kode_barang}`}
                        size={128}
                    />
                ))}
            </div>

            <Table
                hover
                responsive
                className="bg-white shadow-sm rounded border"
            >
                <thead className="table-light">
                    <tr>
                        <th>Kode</th>
                        <th>Nama Barang</th>
                        <th>Kategori</th>
                        <th>Lokasi</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <tr key={item.id}>
                                <td className="fw-bold text-primary">
                                    {item.kode_barang}
                                </td>
                                <td>{item.nama_barang}</td>
                                <td>{item.kategori}</td>
                                {/* PENAMBAHAN: Kolom Lokasi agar data Lantai & Divisi terlihat */}
                                <td>{item.lokasi || "-"}</td>
                                <td>
                                    <Badge
                                        bg={
                                            item.status === "Tersedia"
                                                ? "success"
                                                : item.status === "Dipinjam"
                                                  ? "warning"
                                                  : "danger"
                                        }
                                    >
                                        {item.status}
                                    </Badge>
                                </td>
                                <td>
                                    <Button
                                        variant="link"
                                        className="text-dark me-1"
                                        title="Cetak Label"
                                        onClick={() => handlePrint(item)}
                                    >
                                        <Printer size={18} />
                                    </Button>
                                    <Button
                                        variant="link"
                                        className="text-primary me-1"
                                        onClick={() => handleEdit(item)}
                                    >
                                        <Edit size={18} />
                                    </Button>
                                    <Button
                                        variant="link"
                                        className="text-danger"
                                        onClick={() => deleteItem(item.id)}
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-4 text-muted"
                            >
                                Data tidak ditemukan...
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showEdit} onHide={() => setShowEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ubah Status Barang</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdate}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Status Aset</Form.Label>
                            <Form.Select
                                value={selectedItem?.status || ""}
                                onChange={(e) =>
                                    setSelectedItem({
                                        ...selectedItem,
                                        status: e.target.value,
                                    })
                                }
                            >
                                <option value="Tersedia">Tersedia</option>
                                <option value="Dipinjam">Dipinjam</option>
                                <option value="Maintenance">Maintenance</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">
                            Simpan Perubahan
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};
export default Inventory;
