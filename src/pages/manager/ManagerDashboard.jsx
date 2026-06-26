// import React from 'react';
// import { User, Mail, Shield, Hotel, MapPin } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import '../owner/Staff.css';

// const ManagerDashboard = () => {
//   const { user } = useAuth();

//   if (!user) return null;

//   return (
//     <div className="page-container animate-fade-in" style={{ padding: '2rem' }}>
//       <div className="page-header" style={{ marginBottom: '2rem' }}>
//         <div>
//           <h2 className="page-title">Manager Dashboard</h2>
//           <p className="page-subtitle">Your account and hotel assignment details.</p>
//         </div>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', maxWidth: '900px' }}>
//         {/* Profile Card */}
//         <div className="glass-panel" style={{ padding: '2rem' }}>
//           <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Profile</h3>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
//             <div className="avatar-sm" style={{ width: '72px', height: '72px', fontSize: '1.8rem', flexShrink: 0 }}>
//               {user.name ? user.name.charAt(0).toUpperCase() : 'M'}
//             </div>
//             <div>
//               <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>{user.name}</h3>
//               <span className="badge badge-green">{user.role}</span>
//             </div>
//           </div>

//           <div style={{ display: 'grid', gap: '1rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
//               <Mail className="text-accent" size={20} />
//               <div>
//                 <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>Email Address</p>
//                 <p style={{ fontWeight: '500' }}>{user.email}</p>
//               </div>
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
//               <Shield className="text-accent" size={20} />
//               <div>
//                 <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>Account Status</p>
//                 <p style={{ fontWeight: '500', color: user.status === 'Pending' ? '#f59e0b' : user.status === 'Rejected' ? '#ef4444' : '#10b981' }}>{user.status || 'Approved'}</p>
//               </div>
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
//               <User className="text-accent" size={20} />
//               <div>
//                 <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>Role</p>
//                 <p style={{ fontWeight: '500' }}>{user.role}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Hotel Card */}
//         {user.hotelDetails && (
//           <div className="glass-panel" style={{ padding: '2rem' }}>
//             <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Assigned Hotel</h3>

//             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
//               <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                 <Hotel size={28} style={{ color: '#3b82f6' }} />
//               </div>
//               <div>
//                 <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{user.hotelDetails.name}</h3>
//                 <span style={{ fontSize: '0.8rem', padding: '2px 10px', background: 'rgba(16,185,129,0.2)', color: '#10b981', borderRadius: '12px' }}>Active Property</span>
//               </div>
//             </div>

//             <div style={{ display: 'grid', gap: '1rem' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
//                 <MapPin className="text-accent" size={20} />
//                 <div>
//                   <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>Location</p>
//                   <p style={{ fontWeight: '500' }}>{user.hotelDetails.location || '—'}</p>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
//                 <MapPin className="text-accent" size={20} />
//                 <div>
//                   <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>District / City</p>
//                   <p style={{ fontWeight: '500' }}>{user.hotelDetails.district || '—'}</p>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
//                 <MapPin className="text-accent" size={20} />
//                 <div>
//                   <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>State / Country</p>
//                   <p style={{ fontWeight: '500' }}>{user.hotelDetails.state}{user.hotelDetails.country ? `, ${user.hotelDetails.country}` : ''}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;



import React, { useState, useEffect, useCallback } from 'react';
import { User, Mail, Shield, Hotel, MapPin, RefreshCw, Clock, UtensilsCrossed, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE, authHeader } from '../../utils/api';
import './ManagerDashboard.css';

const DEFAULT_TABLES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [timeTicker, setTimeTicker] = useState(Date.now());

  const fetchActiveOrders = useCallback(async (isManual = false) => {
    if (!user?.token) return;
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders/active`, {
        headers: authHeader(user.token)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch active orders');
      setActiveOrders(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  // Initial fetch and auto-polling
  useEffect(() => {
    fetchActiveOrders();
    const interval = setInterval(() => {
      fetchActiveOrders();
    }, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, [fetchActiveOrders]);

  // Elapsed time ticker update
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTicker(Date.now());
    }, 30000); // Update elapsed times every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getElapsedTime = (createdAt) => {
    const diffMs = timeTicker - new Date(createdAt).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    const remainingMins = diffMins % 60;
    return `${diffHrs}h ${remainingMins}m ago`;
  };

  if (!user) return null;

  // Extract all table numbers (default + any dynamically present in active orders)
  const activeTableNumbers = activeOrders.map(o => o.tableNumber);
  const allTables = Array.from(new Set([...DEFAULT_TABLES, ...activeTableNumbers]));

  // Sort tables: numerical tables first, then custom alphanumeric ones
  const sortedTables = allTables.sort((a, b) => {
    const numA = parseInt(a, 10);
    const numB = parseInt(b, 10);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });

  // Calculate statistics
  const totalTablesCount = sortedTables.length;
  const occupiedTablesCount = activeOrders.length;
  const availableTablesCount = totalTablesCount - occupiedTablesCount;
  const totalDiners = activeOrders.reduce((sum, order) => sum + 1, 0); // Active customer counts

  return (
    <div className="page-container animate-fade-in" style={{ padding: '2rem' }}>
      
      {/* Welcome Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="page-title">Manager Dashboard</h2>
          <p className="page-subtitle">Real-time status updates of restaurant tables (Empty vs Full).</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className={`refresh-btn ${refreshing ? 'spinning' : ''}`} 
            onClick={() => fetchActiveOrders(true)}
            title="Refresh Table Status"
            disabled={refreshing}
          >
            <RefreshCw size={18} />
          </button>
          
          {user.hotelDetails && (
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '0.8rem 1.2rem', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Hotel size={20} style={{ color: '#3b82f6' }} />
              <div>
                <p style={{ fontWeight: '600', color: 'white', fontSize: '0.95rem' }}>{user.hotelDetails.name}</p>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} /> {user.hotelDetails.district}{user.hotelDetails.location ? `, ${user.hotelDetails.location}` : ''}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="error-banner" style={{ marginBottom: '1.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: '8px' }}>
          ⚠️ {error}
        </div>
      )}

      {user.status === 'Pending' && (
        <div style={{ marginBottom: '1.5rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', color: '#fcd34d', padding: '0.75rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} />
          Your account is pending Owner approval.
        </div>
      )}

      {/* Stats Cards Section */}
      <div className="dashboard-stats">
        <div className="stat-card-mini total glass-panel animate-fade-in">
          <div className="icon-container">
            <UtensilsCrossed size={22} />
          </div>
          <div className="stat-info">
            <h4>{totalTablesCount}</h4>
            <p>Total Tables</p>
          </div>
        </div>

        <div className="stat-card-mini available glass-panel animate-fade-in">
          <div className="icon-container">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info">
            <h4>{availableTablesCount}</h4>
            <p>Available (Empty)</p>
          </div>
        </div>

        <div className="stat-card-mini occupied glass-panel animate-fade-in">
          <div className="icon-container">
            <Clock size={22} />
          </div>
          <div className="stat-info">
            <h4>{occupiedTablesCount}</h4>
            <p>Occupied (Full)</p>
          </div>
        </div>

        <div className="stat-card-mini diners glass-panel animate-fade-in">
          <div className="icon-container">
            <Users size={22} />
          </div>
          <div className="stat-info">
            <h4>{totalDiners}</h4>
            <p>Active Orders</p>
          </div>
        </div>
      </div>

      {/* Live Table Grid Section */}
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'white' }}>Live Table Status Map</h3>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>Fetching live tables data...</div>
      ) : (
        <div className="tables-grid">
          {sortedTables.map(tableNo => {
            const activeOrder = activeOrders.find(o => o.tableNumber === tableNo);
            const isOccupied = !!activeOrder;

            return (
              <div 
                key={tableNo} 
                className={`table-card glass-panel ${isOccupied ? 'status-full animate-pulse-border' : 'status-empty'}`}
              >
                <div className="table-card-header">
                  <span className="table-title">Table {tableNo}</span>
                  <div className={`status-indicator ${isOccupied ? 'full' : 'empty'}`}>
                    <span className="pulse-dot"></span>
                    <span>{isOccupied ? 'Occupied' : 'Empty'}</span>
                  </div>
                </div>

                <div className="table-card-body">
                  {isOccupied ? (
                    <>
                      <div className="customer-detail">
                        <div className="row">
                          <span className="label">Customer</span>
                          <span className="value">{activeOrder.customerName}</span>
                        </div>
                        <div className="row">
                          <span className="label">Contact</span>
                          <span className="value">{activeOrder.customerMobile}</span>
                        </div>
                        <div className="row">
                          <span className="label">Seated For</span>
                          <span className="value" style={{ color: '#fb923c', fontWeight: 600 }}>
                            {getElapsedTime(activeOrder.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="order-items-preview">
                        <span className="label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items Summary</span>
                        <div className="items-list">
                          {activeOrder.items.map((item, idx) => (
                            <div key={idx} className="item-row">
                              <span>{item.qty} × {item.name}</span>
                              <span>₹{item.price * item.qty}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bill-amount-row">
                        <span>Total Due</span>
                        <span style={{ color: '#10b981' }}>₹{activeOrder.totalAmount.toLocaleString()}</span>
                      </div>

                      {activeOrder.staffName && (
                        <div className="server-info">
                          <User size={12} />
                          <span>Served by: {activeOrder.staffName}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '1rem 0', opacity: 0.5 }}>
                      <CheckCircle2 size={36} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center' }}>Ready for new guests</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Collapsible Account & Hotel Info Section */}
      <div className="collapsible-profile">
        <div className="collapsible-header glass-panel" style={{ padding: '1rem 1.5rem', borderRadius: '12px' }} onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <h3 style={{ fontSize: '1.05rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} /> Account & Assigned Hotel details
          </h3>
          {isProfileOpen ? <ChevronUp size={20} style={{ color: '#94a3b8' }} /> : <ChevronDown size={20} style={{ color: '#94a3b8' }} />}
        </div>

        {isProfileOpen && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', maxWidth: '900px', marginTop: '1.5rem' }} className="animate-fade-in">
            {/* Profile Card */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Profile</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="avatar-sm" style={{ width: '72px', height: '72px', fontSize: '1.8rem', flexShrink: 0 }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'M'}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>{user.name}</h3>
                  <span className="badge badge-green">{user.role}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <Mail className="text-accent" size={20} />
                  <div>
                    <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>Email Address</p>
                    <p style={{ fontWeight: '500' }}>{user.email}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <Shield className="text-accent" size={20} />
                  <div>
                    <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>Account Status</p>
                    <p style={{ fontWeight: '500', color: user.status === 'Pending' ? '#f59e0b' : user.status === 'Rejected' ? '#ef4444' : '#10b981' }}>{user.status || 'Approved'}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <User className="text-accent" size={20} />
                  <div>
                    <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>Role</p>
                    <p style={{ fontWeight: '500' }}>{user.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Card */}
            {user.hotelDetails && (
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Assigned Hotel</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Hotel size={28} style={{ color: '#3b82f6' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{user.hotelDetails.name}</h3>
                    <span style={{ fontSize: '0.8rem', padding: '2px 10px', background: 'rgba(16,185,129,0.2)', color: '#10b981', borderRadius: '12px' }}>Active Property</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <MapPin className="text-accent" size={20} />
                    <div>
                      <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>Location</p>
                      <p style={{ fontWeight: '500' }}>{user.hotelDetails.location || '—'}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <MapPin className="text-accent" size={20} />
                    <div>
                      <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>District / City</p>
                      <p style={{ fontWeight: '500' }}>{user.hotelDetails.district || '—'}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <MapPin className="text-accent" size={20} />
                    <div>
                      <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginBottom: '0.2rem' }}>State / Country</p>
                      <p style={{ fontWeight: '500' }}>{user.hotelDetails.state}{user.hotelDetails.country ? `, ${user.hotelDetails.country}` : ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;


