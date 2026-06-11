import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { ChefHat, CheckCircle2, Clock, AlertCircle, Hotel, MapPin, User, Check, XCircle, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE, authHeader } from '../../utils/api';
import './StaffDashboard.css';

const StaffDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchActiveOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/orders/active`, { headers: authHeader(user.token) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setOrders(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (user?.token) fetchActiveOrders();
    const interval = setInterval(() => {
      if (user?.token) fetchActiveOrders();
    }, 10000); // Polling every 10s
    return () => clearInterval(interval);
  }, [user]);

  const updateOrderStatus = async (id, status) => {
    try {
      const endpoint = status === 'Completed' ? 'complete' : 'cancel';
      const res = await fetch(`${API_BASE}/api/orders/${id}/${endpoint}`, {
        method: 'PATCH',
        headers: authHeader(user.token)
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      setOrders(prev => prev.filter(o => o._id !== id));
    } catch (err) { setError(err.message); }
  };

  return (
    <div className="page-container animate-fade-in" style={{ padding: '2rem' }}>

      {/* Welcome Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ChefHat size={28} className="text-accent" />
            Welcome, {user?.name || 'Staff Member'}
          </h2>
          <p className="page-subtitle">Manage customer orders and update dish preparation status.</p>
        </div>

        {user?.hotelDetails && (
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

      {error && <div className="error-banner" style={{ marginBottom: '1.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: '8px' }}>⚠️ {error}</div>}

      {user?.status === 'Pending' && (
        <div style={{ marginBottom: '1.5rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', color: '#fcd34d', padding: '0.75rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} />
          Your account is pending Owner approval.
        </div>
      )}

      {/* Orders Section */}
      <div className="page-header" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="page-title" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={20} className="text-accent" /> My Active Orders
        </h3>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => navigate('/staff/new-order')}>
          <Plus size={16} /> New Order
        </button>
      </div>

      <div className="orders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {loading ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', gridColumn: '1/-1', padding: '3rem' }}>Fetching orders...</p>
        ) : orders.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
            <ChefHat size={48} className="text-secondary" style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Active Orders</h3>
            <p className="text-secondary" style={{ marginBottom: '1.5rem' }}>You don't have any active orders at the moment.</p>
            <button className="btn-primary" onClick={() => navigate('/staff/new-order')} style={{ margin: '0 auto' }}>
              Start New Order
            </button>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="order-card glass-panel" style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="order-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="order-id" style={{ color: '#6366f1', fontWeight: 600 }}>#{order._id.substring(order._id.length - 4)}</span>
                <span className="order-time" style={{ color: '#64748b', fontSize: '0.8rem' }}>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="order-body" style={{ marginBottom: '1.25rem' }}>
                <h3 className="order-item" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Table {order.tableNumber}</h3>
                <p className="order-table" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{order.customerName} · {order.customerMobile}</p>
                
                <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '4px' }}>
                      <span>{item.qty} × {item.name}</span>
                      <span>₹{item.price * item.qty}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'white', marginTop: '0.5rem', fontSize: '1rem' }}>
                    <span>Total</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
              <div className="order-footer" style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-primary" 
                   style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#10b981', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}
                   onClick={() => updateOrderStatus(order._id, 'Completed')}>
                  <Check size={16} /> Serve & Complete
                </button>
                <button className="btn-secondary" 
                  style={{ padding: '0.75rem', color: '#ef4444' }}
                  onClick={() => { if(window.confirm('Cancel this order?')) updateOrderStatus(order._id, 'Cancelled')}}>
                  <XCircle size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
