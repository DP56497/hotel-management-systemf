import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, X, UtensilsCrossed, Coffee } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE, authHeader } from '../../utils/api';
import './MenuManagement.css';

const FOOD_SUBCATEGORIES = ['Gujarati', 'Punjabi', 'Chinese', 'South Indian'];
const DRINK_SUBCATEGORIES = ['Drinks'];
const ALL_SUBCATEGORIES = [...FOOD_SUBCATEGORIES, ...DRINK_SUBCATEGORIES];

const defaultForm = { category: 'Food', subCategory: 'Gujarati', name: '', price: '' };

const MenuManagement = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Food');
  const [activeSubCat, setActiveSubCat] = useState('Gujarati');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  const fetchMenu = async () => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/menu`, { headers: authHeader(user.token) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setItems(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (user?.token) fetchMenu(); }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/menu`, {
        method: 'POST',
        headers: authHeader(user.token),
        body: JSON.stringify({ ...form, price: Number(form.price) })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setItems(prev => [...prev, data]);
      setShowModal(false);
      setForm(defaultForm);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const toggleAvail = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/menu/${id}/availability`, {
        method: 'PATCH',
        headers: authHeader(user.token)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setItems(prev => prev.map(i => i._id === id ? data : i));
    } catch (err) { setError(err.message); }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this item? It will be removed for all staff.')) return;
    try {
      const res = await fetch(`${API_BASE}/api/menu/${id}`, {
        method: 'DELETE',
        headers: authHeader(user.token)
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) { setError(err.message); }
  };

  const filteredItems = items.filter(i => i.category === activeTab && i.subCategory === activeSubCat);
  const subcats = activeTab === 'Food' ? FOOD_SUBCATEGORIES : DRINK_SUBCATEGORIES;

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">Menu Management</h2>
          <p className="page-subtitle">Add, remove, or toggle availability of food and drink items.</p>
        </div>
        <button className="btn-primary flex-center gap-2" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add Item
        </button>
      </div>

      {error && (
        <div className="error-banner">⚠️ {error}</div>
      )}

      {/* Category Tabs */}
      <div className="menu-tabs">
        {['Food', 'Drink'].map(tab => (
          <button
            key={tab}
            className={`menu-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab); setActiveSubCat(tab === 'Food' ? 'Gujarati' : 'Drinks'); }}
          >
            {tab === 'Food' ? <UtensilsCrossed size={16} /> : <Coffee size={16} />}
            {tab}
          </button>
        ))}
      </div>

      {/* SubCategory Tabs */}
      <div className="sub-tabs">
        {subcats.map(s => (
          <button key={s} className={`sub-tab ${activeSubCat === s ? 'active' : ''}`} onClick={() => setActiveSubCat(s)}>
            {s}
          </button>
        ))}
      </div>

      {/* Items Table */}
      <div className="glass-panel table-container" style={{ marginTop: '1rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>Loading menu...</div>
        ) : (
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Price (₹)</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? filteredItems.map(item => (
                  <tr key={item._id}>
                    <td style={{ fontWeight: 500 }}>{item.name}</td>
                    <td><span className="dept-pill">{item.subCategory}</span></td>
                    <td className="font-semibold text-accent">₹{item.price.toLocaleString()}</td>
                    <td>
                      <button
                        className="avail-toggle"
                        onClick={() => toggleAvail(item._id)}
                        title={item.available ? 'Click to mark unavailable' : 'Click to mark available'}
                      >
                        {item.available
                          ? <><ToggleRight size={24} style={{ color: '#10b981' }} /> <span style={{ color: '#10b981' }}>Available</span></>
                          : <><ToggleLeft size={24} style={{ color: '#ef4444' }} /> <span style={{ color: '#ef4444' }}>Unavailable</span></>}
                      </button>
                    </td>
                    <td>
                      <button className="delete-btn" onClick={() => deleteItem(item._id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="empty-state">No items in this category. Click "Add Item" to get started.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div className="modal-header">
              <h3>Add Menu Item</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAdd} className="modal-form">
              <div className="form-group">
                <label className="input-label">Category</label>
                <select className="input-field" value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value, subCategory: e.target.value === 'Food' ? 'Gujarati' : 'Drinks' })}>
                  <option value="Food">Food</option>
                  <option value="Drink">Drink</option>
                </select>
              </div>
              <div className="form-group">
                <label className="input-label">Sub-Category</label>
                <select className="input-field" value={form.subCategory}
                  onChange={e => setForm({ ...form, subCategory: e.target.value })}>
                  {(form.category === 'Food' ? FOOD_SUBCATEGORIES : DRINK_SUBCATEGORIES).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="input-label">Item Name</label>
                <input className="input-field" required placeholder="e.g. Dal Baati Churma"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="input-label">Price (₹)</label>
                <input className="input-field" type="number" required min="1" placeholder="150"
                  value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Add Item'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
