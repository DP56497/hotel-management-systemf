import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, UserCheck, DollarSign, Clock, Hotel, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE, authHeader } from '../../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [managers, setManagers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllStaff = async () => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/staff`, {
        headers: authHeader(user.token),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load staff');
      setManagers(data.filter(u => u.role === 'Manager'));
      setStaff(data.filter(u => u.role === 'Staff'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) fetchAllStaff();
  }, [user]);

  const activeStaff = staff.length;
  const activeManagersCount = managers.length;
  const totalSalary = (activeStaff * 2500) + (activeManagersCount * 4000);

  const dynamicTeamData = [
    { name: 'Staff', count: activeStaff },
    { name: 'Managers', count: activeManagersCount },
  ];

  return (
    <div className="dashboard-container animate-fade-in">

      <div className="dashboard-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
            Welcome back, {user?.name || 'Owner'}
          </h2>
          <p style={{ color: '#94a3b8' }}>Here's what's happening with your operations today.</p>
        </div>

        {user?.hotelDetails && (
          <div style={{ textAlign: 'right', background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: '600', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
              <Hotel size={18} style={{ color: '#3b82f6' }} />
              {user.hotelDetails.name}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
              <MapPin size={14} /> {user.hotelDetails.location}, {user.hotelDetails.district}
            </p>
          </div>
        )}
      </div>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '4rem' }}>Loading dashboard data...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card glass-panel">
              <div className="stat-icon bg-blue"><Users size={24} /></div>
              <div className="stat-details">
                <p className="stat-title">Active Staff</p>
                <h3 className="stat-value">{activeStaff}</h3>
              </div>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-icon bg-purple"><UserCheck size={24} /></div>
              <div className="stat-details">
                <p className="stat-title">Active Managers</p>
                <h3 className="stat-value">{activeManagersCount}</h3>
              </div>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-icon bg-green"><DollarSign size={24} /></div>
              <div className="stat-details">
                <p className="stat-title">Est. Monthly Payroll</p>
                <h3 className="stat-value">${totalSalary.toLocaleString()}</h3>
              </div>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-card glass-panel">
              <h3 className="chart-title">Team Distribution</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dynamicTeamData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px' }} />
                    <Bar dataKey="count" fill="#ec4899" radius={[4, 4, 0, 0]} name="Members" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
