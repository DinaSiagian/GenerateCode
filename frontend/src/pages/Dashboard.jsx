import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Package, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import api from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    tersedia: 0,
    dipinjam: 0,
    maintenance: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard-stats');
        // LIHAT INI: Data yang muncul di image_4da880.png harusnya muncul di console
        console.log("Data Berhasil Diambil:", response.data); 
        setStats(response.data);
      } catch (err) {
        console.error("Koneksi ke Lumen Gagal:", err);
      }
    };
    fetchStats();
  }, []);

  // Konfigurasi kartu yang mengambil data dari state 'stats'
  const cards = [
    { title: "TOTAL BARANG", val: stats.total, color: "primary", icon: <Package size={30}/> },
    { title: "TERSEDIA", val: stats.tersedia, color: "success", icon: <CheckCircle size={30}/> },
    { title: "DIPINJAM", val: stats.dipinjam, color: "warning", icon: <Clock size={30}/> },
    { title: "MAINTENANCE", val: stats.maintenance, color: "danger", icon: <AlertTriangle size={30}/> },
  ];

  return (
    <div className="p-4">
      <h3 className="fw-bold mb-4">Ringkasan Sistem Inventaris</h3>
      <Row className="g-4">
        {cards.map((item, i) => (
          <Col md={3} key={i}>
            <Card className={`h-100 shadow-sm border-0 border-start border-5 border-${item.color}`}>
              <Card.Body className="d-flex align-items-center">
                <div className={`p-3 rounded-3 bg-${item.color} bg-opacity-10 text-${item.color} me-3`}>
                  {item.icon}
                </div>
                <div>
                  <h6 className="text-muted mb-1 small fw-bold text-uppercase">{item.title}</h6>
                  <h2 className="fw-bold mb-0">{item.val}</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;