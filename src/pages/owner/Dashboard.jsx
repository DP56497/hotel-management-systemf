import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, UserCheck, DollarSign, Clock, Hotel, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE, authHeader } from '../../utils/api';
import './Dashboard.css';

const salaryData = [
  { name: 'Jan', managers: 4000, staff: 2400 },
  { name: 'Feb', managers: 3000, staff: 1398 },
  { name: 'Mar', managers: 2000, staff: 9800 },
  { name: 'Apr', managers: 2780, staff: 3908 },
  { name: 'May', managers: 1890, staff: 4800 },
  { name: 'Jun', managers: 2390, staff: 3800 },
  { name: 'Jul', managers: 3490, staff: 4300 },
];

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

  const approveUser = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/staff/${id}/approve`, {
        method: 'PUT',
        headers: authHeader(user.token),
      });
      if (res.ok) {
        setManagers(managers.map(m => m._id === id ? { ...m, status: 'Approved' } : m));
        setStaff(staff.map(s => s._id === id ? { ...s, status: 'Approved' } : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const rejectUser = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/staff/${id}/reject`, {
        method: 'PUT',
        headers: authHeader(user.token),
      });
      if (res.ok) {
        setManagers(managers.filter(m => m._id !== id));
        setStaff(staff.filter(s => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeStaff = staff.filter(s => s.status === 'Approved').length;
  const activeManagersCount = managers.filter(m => m.status === 'Approved').length;
  const pendingRequests = [...managers, ...staff].filter(u => u.status === 'Pending');
  const totalSalary = (activeStaff * 2500) + (activeManagersCount * 4000);

  const dynamicTeamData = [
    { name: 'Staff', count: activeStaff },
    { name: 'Managers', count: activeManagersCount },
    { name: 'Pending', count: pendingRequests.length },
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

            <div className="stat-card glass-panel">
              <div className="stat-icon bg-orange"><Clock size={24} /></div>
              <div className="stat-details">
                <p className="stat-title">Pending Approvals</p>
                <h3 className="stat-value">{pendingRequests.length}</h3>
              </div>
            </div>
          </div>

          {pendingRequests.length > 0 && (
            <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} style={{ color: '#f97316' }} /> Pending Account Approvals
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pendingRequests.map(req => (
                  <div key={req._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h4 style={{ color: 'white', fontSize: '1.05rem', marginBottom: '6px' }}>
                        {req.fullName}
                        <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'rgba(59,130,246,0.2)', color: '#3b82f6', borderRadius: '12px', marginLeft: '8px', verticalAlign: 'middle' }}>{req.role}</span>
                      </h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{req.email}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => approveUser(req._id)}
                        className="btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1rem', background: '#10b981', border: 'none' }}
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button
                        onClick={() => rejectUser(req._id)}
                        className="btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1rem', background: '#ef4444', border: 'none' }}
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="charts-grid">
            <div className="chart-card glass-panel">
              <h3 className="chart-title">Salary Expenditure (6 Months)</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salaryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorManagers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorStaff" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                    <Area type="monotone" dataKey="staff" stroke="#3b82f6" fillOpacity={1} fill="url(#colorStaff)" name="Staff Salary" />
                    <Area type="monotone" dataKey="managers" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorManagers)" name="Manager Salary" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

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
