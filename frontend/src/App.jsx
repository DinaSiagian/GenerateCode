import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import AddItem from './pages/AddItem';
import ItemDetail from './pages/ItemDetail';

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="vh-100 p-3 shadow" style={{ width: '280px', position: 'fixed', background: '#1a365d', color: 'white' }}>
      <h4 className="fw-bold mb-5 text-center">GENCODE ADMIN</h4>
      <nav className="nav flex-column gap-2">
        <Link to="/" className={`nav-link rounded ${location.pathname === '/' ? 'bg-primary text-white shadow' : 'text-white-50'}`}>Dashboard</Link>
        <Link to="/inventory" className={`nav-link rounded ${location.pathname === '/inventory' ? 'bg-primary text-white shadow' : 'text-white-50'}`}>Inventaris Aset</Link>
        <Link to="/tambah" className={`nav-link rounded ${location.pathname === '/tambah' ? 'bg-primary text-white shadow' : 'text-white-50'}`}>Registrasi Baru</Link>
      </nav>
    </div>
  );
};

const LayoutWrapper = () => {
  const location = useLocation();
  const isPublic = location.pathname.includes('/item/') || location.pathname.includes('/scan/');

  if (isPublic) {
    return (
      <div className="w-100 min-vh-100" style={{ background: '#007bff' }}>
        <Routes>
          <Route path="/item/:kode_barang" element={<ItemDetail />} />
          <Route path="/scan/:kode_barang" element={<ItemDetail />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ marginLeft: '280px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/tambah" element={<AddItem />} />
        </Routes>
      </div>
    </div>
  );
};

export default function App() {
  return <Router><LayoutWrapper /></Router>;
}