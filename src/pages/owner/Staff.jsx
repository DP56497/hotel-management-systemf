import React, { useState, useEffect } from 'react';
import { Search, Filter, X, UserPlus, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE, authHeader } from '../../utils/api';
import './Staff.css';

const departments = ['All', 'Gujarati food dish', 'Punjabi food dish', 'Chinese food dish', 'South Indian food dish'];

const Staff = () => {
  const { user } = useAuth();
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/staff`, {
          headers: authHeader(user.token),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load staff');
        const approvedStaff = data
          .filter(u => u.role === 'Staff' && u.status === 'Approved')
          .map(s => ({
            id: s._id.substring(s._id.length - 6).toUpperCase(),
            _id: s._id,
            name: s.fullName,
            email: s.email,
            department: s.department || departments[1],
            joinDate: s.createdAt ? s.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10),
            endDate: 'Active',
            salary: 2500,
            status: 'Active',
          }));
        setStaff(approvedStaff);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchStaff();
  }, [user]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || s.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Staff Directory</h2>
          <p className="page-subtitle">Manage hotel staff, departments, and payroll.</p>
        </div>
        <button className="btn-primary flex-center gap-2" onClick={() => setShowInfoModal(true)}>
          <UserPlus size={18} /> Add Staff
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="glass-panel table-container">
        <div className="table-actions staff-actions">
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
          <div className="filter-wrapper">
            <Filter size={18} className="filter-icon" />
            <select
              className="input-field filter-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>Loading staff data...</div>
        ) : (
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Join Date</th>
                  <th>End Date</th>
                  <th>Monthly Salary</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <tr key={member.id}>
                      <td><span className="id-badge staff-id">{member.id}</span></td>
                      <td>
                        <div className="person-cell">
                          <div className="avatar-sm staff-avatar">{member.name.charAt(0)}</div>
                          <div>
                            <span className="person-name">{member.name}</span>
                            <br />
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{member.email}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className="dept-pill">{member.department}</span></td>
                      <td>{member.joinDate}</td>
                      <td>{member.endDate === 'Active' ? '-' : member.endDate}</td>
                      <td className="font-semibold text-accent">${member.salary.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${member.endDate === 'Active' ? 'badge-green' : 'badge-orange'}`}>
                          {member.endDate === 'Active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-state">No approved staff members found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Modal – how to add staff */}
      {showInfoModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Info size={20} style={{ color: '#3b82f6' }} /> How to Add Staff</h3>
              <button className="close-btn" onClick={() => setShowInfoModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '1rem 0', color: '#94a3b8', lineHeight: 1.8 }}>
              <p>Staff members must <strong style={{ color: 'white' }}>self-register</strong> using the Sign Up page:</p>
              <ol style={{ marginLeft: '1.5rem', marginTop: '0.75rem' }}>
                <li>Go to <strong style={{ color: '#3b82f6' }}>/signup</strong> and select the <strong style={{ color: 'white' }}>Staff</strong> role.</li>
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

export default Staff;
