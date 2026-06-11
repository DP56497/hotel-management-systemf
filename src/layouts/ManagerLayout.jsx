import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, X, Hotel, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './OwnerLayout.css';

const ManagerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();

  const userName = user?.name || 'Manager';
  const userInitials = userName.substring(0, 2).toUpperCase();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard-layout">
      <aside className={`sidebar glass-panel ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Hotel size={32} className="text-gradient" />
          <button className="close-btn mobile-only" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <p className="nav-label">Overview</p>
            <NavLink to="/manager" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </div>

          <div className="nav-section">
            <p className="nav-label">Operations</p>
            <NavLink to="/manager/bills" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <FileText size={20} />
              <span>Bills & Orders</span>
            </NavLink>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">{userInitials}</div>
            <div className="user-details">
              <p className="name">{userName}</p>
              <p className="role">Hotel Manager</p>
            </div>
          </div>
          <button className="logout-btn" onClick={() => logout()}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="header glass-panel">
          <div className="header-left">
            <button className="menu-btn" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <h2 className="page-title">Manager Portal</h2>
          </div>
          <div className="header-right">
            <div className="header-avatar">{userInitials}</div>
          </div>
        </header>

        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ManagerLayout;
