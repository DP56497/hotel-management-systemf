import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserCircle, LogOut, Menu, X, Hotel, Utensils, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './OwnerLayout.css';

const OwnerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user?.name || 'Owner';
  const userInitials = userName.substring(0, 2).toUpperCase();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-layout">
      {/* Drawer Sidebar */}
      <aside className={`sidebar glass-panel ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Hotel size={32} className="text-gradient" />
          {/* <h2 className="text-gradient">Jogmaya Hotel</h2> */}
          <button className="close-btn mobile-only" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <p className="nav-label">Overview</p>
            <NavLink to="/owner" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </div>

          <div className="nav-section">
            <p className="nav-label">Management</p>
            <NavLink to="/owner/managers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <UserCircle size={20} />
              <span>Managers</span>
            </NavLink>
            <NavLink to="/owner/staff" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Users size={20} />
              <span>Staff</span>
            </NavLink>
          </div>

          <div className="nav-section">
            <p className="nav-label">Operations</p>
            <NavLink to="/owner/menu" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Utensils size={20} />
              <span>Menu Management</span>
            </NavLink>
            <NavLink to="/owner/bills" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
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
              <p className="role">Hotel Admin</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header glass-panel">
          <div className="header-left">
            <button className="menu-btn" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <h2 className="page-title">Owner Portal</h2>
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

export default OwnerLayout;
