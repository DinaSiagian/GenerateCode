import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Package, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import api from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, tersedia: 0, dipinjam: 0, maintenance: 0 });
  useEffect(() => { api.get('/dashboard-stats').then(res => setStats(res.data)); }, []);

  const cards = [
    { title: "Total Aset", val: stats.total, color: "linear-gradient(135deg, #2b6cb0, #4299e1)", icon: <Package/> },
    { title: "Tersedia", val: stats.tersedia, color: "linear-gradient(135deg, #2f855a, #48bb78)", icon: <CheckCircle/> },
    { title: "Dipinjam", val: stats.dipinjam, color: "linear-gradient(135deg, #c05621, #ed8936)", icon: <Clock/> },
    { title: "Maintenance", val: stats.maintenance, color: "linear-gradient(135deg, #c53030, #f56565)", icon: <AlertTriangle/> },
  ];

  return (
    <div>
      <h4 className="fw-bold mb-4">Ringkasan Operasional</h4>
      <Row className="g-4">
        {cards.map((c, i) => (
          <Col md={3} key={i}>
            <Card className="border-0 text-white shadow h-100 p-2" style={{ background: c.color, borderRadius: '20px' }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="opacity-75 fw-semibold">{c.title}</span>
                  <div className="p-2 bg-white bg-opacity-20 rounded-circle">{c.icon}</div>
                </div>
                <h2 className="fw-bold mb-0">{c.val} <small className="fs-6 opacity-75">Unit</small></h2>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Dashboard;