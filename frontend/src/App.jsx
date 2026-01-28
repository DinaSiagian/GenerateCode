import React from 'react';
<<<<<<< Updated upstream
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, Card, Button } from 'react-bootstrap';
import { LayoutDashboard, Package, PlusCircle, LogOut, Bell } from 'lucide-react';

// Import Halaman
import Inventory from './pages/Inventory';
import AddItem from './pages/AddItem';

const DashboardOverview = () => (
  <div className="py-4">
    <h2 className="fw-bold mb-4">Ringkasan Sistem Inventaris</h2>
    <Row className="g-4">
      <Col md={4}><Card className="shadow-sm border-0 border-start border-primary border-5 p-3"><Card.Body><h6 className="text-muted fw-bold">TOTAL BARANG</h6><h2 className="fw-bold">142</h2></Card.Body></Card></Col>
      <Col md={4}><Card className="shadow-sm border-0 border-start border-warning border-5 p-3"><Card.Body><h6 className="text-muted fw-bold">TERTUNDA</h6><h2 className="fw-bold text-warning">12</h2></Card.Body></Card></Col>
      <Col md={4}><Card className="shadow-sm border-0 border-start border-danger border-5 p-3"><Card.Body><h6 className="text-muted fw-bold">DIKEMBALIKAN</h6><h2 className="fw-bold text-danger">5</h2></Card.Body></Card></Col>
    </Row>
  </div>
);
=======
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Box, PlusCircle } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import AddItem from './pages/AddItem';
import ScanResult from './pages/ScanResult';

const Sidebar = () => {
  const location = useLocation();
  const menus = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20}/> },
    { path: '/inventory', name: 'Inventaris', icon: <Box size={20}/> },
    { path: '/tambah', name: 'Tambah Barang', icon: <PlusCircle size={20}/> },
  ];
  return (
    <div className="bg-dark text-white vh-100 p-3 shadow" style={{ width: '260px', position: 'fixed' }}>
      <h4 className="fw-bold text-primary mb-5 px-2">GENCODE ADMIN</h4>
      <nav className="nav flex-column gap-2">
        {menus.map(m => (
          <Link key={m.path} to={m.path} className={`nav-link d-flex align-items-center gap-3 rounded px-3 py-2 ${location.pathname === m.path ? 'bg-primary text-white shadow' : 'text-light opacity-75'}`} style={{ textDecoration: 'none' }}>
            {m.icon} <span>{m.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
>>>>>>> Stashed changes

export default function App() {
  return (
    <Router>
<<<<<<< Updated upstream
      <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
        {/* SIDEBAR */}
        <div className="bg-dark text-white p-4 sticky-top shadow" style={{ width: '280px', height: '100vh' }}>
          <h4 className="fw-black mb-5 text-primary tracking-tighter">GENCODE ADMIN</h4>
          <Nav className="flex-column gap-2">
            <Nav.Link as={NavLink} to="/" end className="text-white d-flex align-items-center gap-3 p-3 rounded shadow-sm">
              <LayoutDashboard size={20} /> Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/inventory" className="text-white d-flex align-items-center gap-3 p-3 rounded">
              <Package size={20} /> Inventaris
            </Nav.Link>
            <Nav.Link as={NavLink} to="/tambah" className="text-white d-flex align-items-center gap-3 p-3 rounded">
              <PlusCircle size={20} /> Tambah Barang
            </Nav.Link>
            <hr className="my-5 border-secondary" />
            <Button variant="link" className="text-danger d-flex align-items-center gap-3 p-0 text-decoration-none">
              <LogOut size={20} /> Keluar
            </Button>
          </Nav>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-grow-1 overflow-auto">
          <Navbar bg="white" className="shadow-sm px-4 py-3 sticky-top">
            <Navbar.Brand className="text-muted fs-6">Super Admin Dashboard</Navbar.Brand>
            <Nav className="ms-auto"><Bell size={20} className="text-muted mt-1" /></Nav>
          </Navbar>
          <Container fluid className="p-4">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
=======
      <div className="d-flex bg-light min-vh-100">
        <Sidebar />
        <div className="flex-grow-1" style={{ marginLeft: '260px' }}>
          <header className="bg-white border-bottom px-4 py-3 shadow-sm">Super Admin Dashboard</header>
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
>>>>>>> Stashed changes
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/tambah" element={<AddItem />} />
              <Route path="/scan/:kode_barang" element={<ScanResult />} />
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}