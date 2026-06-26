import React, { useState, useEffect } from 'react';
import { Search, X, UserPlus, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE, authHeader } from '../../utils/api';
import './Managers.css';

const Managers = () => {
  const { user } = useAuth();
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/staff`, {
          headers: authHeader(user.token),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load managers');
        const approvedManagers = data
          .filter(u => u.role === 'Manager' && u.status === 'Approved')
          .map(m => ({
            id: m._id.substring(m._id.length - 6).toUpperCase(),
            _id: m._id,
            name: m.fullName,
            email: m.email,
            joinDate: m.createdAt ? m.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10),
            endDate: 'Active',
            baseSalary: 4000,
            totalSalary: 0,
            status: 'Active',
          }));
        setManagers(approvedManagers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchManagers();
  }, [user]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const filteredManagers = managers.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Managers Overview</h2>
          <p className="page-subtitle">Manage hotel managers, salaries, and employment history.</p>
        </div>
        <button className="btn-primary flex-center gap-2" onClick={() => setShowInfoModal(true)}>
          <UserPlus size={18} /> Add Manager
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="glass-panel table-container">
        <div className="table-actions">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="input-field search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>Loading manager data...</div>
        ) : (
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Manager ID</th>
                  <th>Name</th>
                  <th>Join Date</th>
                  <th>End Date</th>
                  <th>Base Salary</th>
                  <th>Total Salary Paid</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredManagers.length > 0 ? (
                  filteredManagers.map((manager) => (
                    <tr key={manager.id}>
                      <td><span className="id-badge">{manager.id}</span></td>
                      <td>
                        <div className="person-cell">
                          <div className="avatar-sm">{manager.name.charAt(0)}</div>
                          <div className="person-details">
                            <span className="person-name">{manager.name}</span>
                            <span className="person-email">{manager.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>{manager.joinDate}</td>
                      <td>{manager.endDate === 'Active' ? '-' : manager.endDate}</td>
                      <td>${manager.baseSalary.toLocaleString()}</td>
                      <td className="font-semibold text-accent">${manager.totalSalary.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${manager.status === 'Active' ? 'badge-green' : 'badge-orange'}`}>
                          {manager.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-state">No approved managers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Modal – how to add a manager */}
      {showInfoModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Info size={20} style={{ color: '#3b82f6' }} /> How to Add a Manager</h3>
              <button className="close-btn" onClick={() => setShowInfoModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '1rem 0', color: '#94a3b8', lineHeight: 1.8 }}>
              <p>Managers must <strong style={{ color: 'white' }}>self-register</strong> using the Sign Up page:</p>
              <ol style={{ marginLeft: '1.5rem', marginTop: '0.75rem' }}>
                <li>Go to <strong style={{ color: '#3b82f6' }}>/signup</strong> and select the <strong style={{ color: 'white' }}>Manager</strong> role.</li>
                <li>Choose <strong style={{ color: 'white' }}>{user?.hotelDetails?.name || 'your hotel'}</strong> from the hotel dropdown.</li>
                <li>Once registered, their account is immediately active and ready to log in.</li>
              </ol>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowInfoModal(false)}>Got it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Managers;
