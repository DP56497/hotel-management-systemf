import React, { useState, useEffect, useRef } from 'react';
import { FileText, Printer, ChevronDown, ChevronUp, Hotel, Phone, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE, authHeader } from '../../utils/api';
import './Bills.css';

const StatusBadge = ({ status }) => {
  const map = { Active: 'badge-blue', Completed: 'badge-green', Cancelled: 'badge-orange' };
  return <span className={`badge ${map[status] || 'badge-blue'}`}>{status}</span>;
};

const Bills = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const printRef = useRef();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/orders`, { headers: authHeader(user.token) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setOrders(data);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };
    if (user?.token) fetchOrders();
  }, [user]);

  const filtered = orders.filter(o => {
    const matchStatus = filter === 'All' || o.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || o.customerName?.toLowerCase().includes(q) || o.customerMobile?.includes(q) || o.tableNumber?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const printBill = (order) => {
    const win = window.open('', '_blank', 'width=800,height=600');
    const ownerName = user.role === 'Owner' ? user.name : (order.staffName || '');
    win.document.write(`
      <!DOCTYPE html><html><head>
      <title>Bill - ${order.customerName}</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family: Arial, sans-serif; }
        body { padding: 40px; color: #111; }
        .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; padding-bottom:16px; border-bottom:2px solid #111; }
        .hotel-name { font-size:22px; font-weight:700; }
        .hotel-sub { font-size:13px; color:#555; margin-top:4px; }
        .owner-block { text-align:right; font-size:13px; color:#555; }
        .owner-name { font-size:15px; font-weight:600; color:#111; }
        .bill-title { text-align:center; font-size:18px; font-weight:700; margin-bottom:16px; letter-spacing:1px; }
        .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:20px; font-size:13px; }
        .info-item { padding:8px 12px; background:#f5f5f5; border-radius:6px; }
        .info-label { color:#777; font-size:11px; text-transform:uppercase; margin-bottom:2px; }
        .info-val { font-weight:600; color:#111; }
        table { width:100%; border-collapse:collapse; margin-bottom:16px; font-size:13px; }
        th { background:#111; color:white; padding:8px 12px; text-align:left; font-weight:600; }
        td { padding:8px 12px; border-bottom:1px solid #eee; }
        tr:last-child td { border-bottom:none; }
        .total-row { background:#f9f9f9; font-weight:700; font-size:15px; }
        .footer { text-align:center; font-size:12px; color:#888; margin-top:20px; padding-top:16px; border-top:1px solid #ddd; }
        @media print { body { padding:20px; } button { display:none; } }
      </style></head><body>
      <div class="header">
        <div>
          <div class="hotel-name">🏨 ${user?.hotelDetails?.name || order.hotelName || 'Hotel'}</div>
          <div class="hotel-sub">${user?.hotelDetails?.location || ''} ${user?.hotelDetails?.district ? ', ' + user.hotelDetails.district : ''}</div>
        </div>
        <div class="owner-block">
          <div class="owner-name">${ownerName}</div>
          <div>Owner / Manager</div>
        </div>
      </div>
      <div class="bill-title">BILL / INVOICE</div>
      <div class="info-grid">
        <div class="info-item"><div class="info-label">Customer Name</div><div class="info-val">${order.customerName}</div></div>
        <div class="info-item"><div class="info-label">Mobile Number</div><div class="info-val">${order.customerMobile}</div></div>
        <div class="info-item"><div class="info-label">Table Number</div><div class="info-val">${order.tableNumber}</div></div>
        <div class="info-item"><div class="info-label">Date & Time</div><div class="info-val">${new Date(order.createdAt).toLocaleString()}</div></div>
      </div>
      <table>
        <thead><tr><th>#</th><th>Item Name</th><th>Category</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr></thead>
        <tbody>
          ${order.items.map((item, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${item.name}</td>
              <td>${item.subCategory || '—'}</td>
              <td>${item.qty}</td>
              <td>₹${item.price.toLocaleString()}</td>
              <td>₹${(item.price * item.qty).toLocaleString()}</td>
            </tr>`).join('')}
          <tr class="total-row">
            <td colspan="5" style="text-align:right; padding-right:16px;">Grand Total</td>
            <td>₹${order.totalAmount.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <div class="footer">Thank you for dining with us! · ${user?.hotelDetails?.name || order.hotelName || 'Hotel'}</div>
      <br/>
      <button onclick="window.print()" style="padding:8px 24px;background:#111;color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px;">🖨 Print Bill</button>
      </body></html>`);
    win.document.close();
    setTimeout(() => win.focus(), 300);
  };

  const totalRevenue = orders.filter(o => o.status === 'Completed').reduce((s, o) => s + o.totalAmount, 0);

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Bills & Orders</h2>
          <p className="page-subtitle">View all orders, generate bills, and export PDFs.</p>
        </div>
        <div className="bills-stat glass-panel">
          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Total Revenue</span>
          <span style={{ color: '#6ee7b7', fontWeight: 700, fontSize: '1.2rem' }}>₹{totalRevenue.toLocaleString()}</span>
        </div>
      </div>

      {error && <div className="error-banner">⚠️ {error}</div>}

      {/* Filters */}
      <div className="bills-filters glass-panel">
        <input className="input-field" placeholder="Search by name, mobile, table..." value={search}
          onChange={e => setSearch(e.target.value)} style={{ maxWidth: 280 }} />
        <div className="filter-pills">
          {['All', 'Active', 'Completed', 'Cancelled'].map(f => (
            <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-panel table-container" style={{ marginTop: '1rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>Loading orders...</div>
        ) : (
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Customer</th>
                  <th>Mobile</th>
                  <th>Table</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Bill</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="9" className="empty-state">No orders found.</td></tr>
                ) : filtered.map(order => (
                  <React.Fragment key={order._id}>
                    <tr>
                      <td>
                        <button className="expand-btn" onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                          {expanded === order._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div className="avatar-sm" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>
                            {order.customerName?.charAt(0).toUpperCase()}
                          </div>
                          <span>{order.customerName}</span>
                        </div>
                      </td>
                      <td style={{ color: '#94a3b8' }}>{order.customerMobile}</td>
                      <td><span className="id-badge">{order.tableNumber}</span></td>
                      <td>{order.items.length} item(s)</td>
                      <td className="font-semibold text-accent">₹{order.totalAmount.toLocaleString()}</td>
                      <td><StatusBadge status={order.status} /></td>
                      <td style={{ color: '#64748b', fontSize: '0.8rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="print-btn" onClick={() => printBill(order)} title="Print / Download Bill">
                          <Printer size={15} /> Bill
                        </button>
                      </td>
                    </tr>
                    {expanded === order._id && (
                      <tr className="expanded-row">
                        <td colSpan="9">
                          <div className="expanded-detail">
                            <table className="detail-table">
                              <thead>
                                <tr><th>#</th><th>Item</th><th>Category</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr>
                              </thead>
                              <tbody>
                                {order.items.map((item, idx) => (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{item.name}</td>
                                    <td><span className="dept-pill" style={{ fontSize: '0.75rem' }}>{item.subCategory}</span></td>
                                    <td>× {item.qty}</td>
                                    <td>₹{item.price}</td>
                                    <td className="text-accent font-semibold">₹{(item.price * item.qty).toLocaleString()}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bills;
