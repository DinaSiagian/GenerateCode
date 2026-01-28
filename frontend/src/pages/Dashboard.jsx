import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Package, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import api from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, tersedia: 0, dipinjam: 0, maintenance: 0 });
  useEffect(() => { api.get('/dashboard-stats').then(res => setStats(res.data)); }, []);

  const cards = [
    { title: "TOTAL BARANG", val: stats.total, color: "primary", icon: <Package/> },
    { title: "TERSEDIA", val: stats.tersedia, color: "success", icon: <CheckCircle/> },
    { title: "DIPINJAM", val: stats.dipinjam, color: "warning", icon: <Clock/> },
    { title: "MAINTENANCE", val: stats.maintenance, color: "danger", icon: <AlertTriangle/> },
  ];

  return (
    <Row className="g-4">
      {cards.map((c, i) => (
        <Col md={3} key={i}>
          <Card className={`h-100 shadow-sm border-0 border-start border-5 border-${c.color}`}>
            <Card.Body className="d-flex align-items-center">
              <div className={`p-3 rounded-3 bg-${c.color} bg-opacity-10 text-${c.color} me-3`}>{c.icon}</div>
              <div><h6 className="text-muted mb-1 small fw-bold">{c.title}</h6><h2 className="fw-bold mb-0">{c.val}</h2></div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default Dashboard;