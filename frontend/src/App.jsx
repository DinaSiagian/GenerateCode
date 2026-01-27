import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Box, PlusCircle, LogOut } from 'lucide-react';

// Import Halaman - Pastikan penamaannya sesuai dengan file di folder src/pages/
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import AddItem from './pages/AddItem'; // SEKARANG SUDAH SESUAI

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/inventory', name: 'Inventaris', icon: <Box size={20} /> },
    { path: '/tambah', name: 'Tambah Barang', icon: <PlusCircle size={20} /> },
  ];

  return (
    <div className="sidebar bg-dark text-white vh-100 p-3 shadow" style={{ width: '260px', position: 'fixed' }}>
      <h4 className="fw-bold text-primary mb-5 px-2">GENCODE ADMIN</h4>
      
      <nav className="nav flex-column gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link d-flex align-items-center gap-3 rounded px-3 py-2 transition-all ${
              location.pathname === item.path ? 'bg-primary text-white shadow' : 'text-light opacity-75 hover-opacity-100'
            }`}
            style={{ textDecoration: 'none' }}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-5 border-top border-secondary mx-2" style={{ position: 'absolute', bottom: '20px', width: '220px' }}>
        <Link to="/logout" className="nav-link text-danger d-flex align-items-center gap-3">
          <LogOut size={20} />
          <span>Keluar</span>
        </Link>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="d-flex bg-light min-vh-100">
        <Sidebar />

        <div className="flex-grow-1" style={{ marginLeft: '260px' }}>
          <header className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center shadow-sm">
            <span className="text-muted fw-medium">Super Admin Dashboard</span>
            <div className="rounded-circle bg-light p-2 shadow-sm">🔔</div>
          </header>

          <main className="p-4">
            <Routes>
              {/* Route Dashboard mengambil data statistik dari MySQL */}
              <Route path="/" element={<Dashboard />} />
              
              {/* Route Inventaris untuk CRUD */}
              <Route path="/inventory" element={<Inventory />} />
              
              {/* Route Tambah Barang menggunakan komponen AddItem */}
              <Route path="/tambah" element={<AddItem />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;