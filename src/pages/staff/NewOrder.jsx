import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X, ChefHat, Coffee, Trash2, CheckCircle, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_BASE, authHeader } from '../../utils/api';
import './NewOrder.css';

const FOOD_SUBS = ['Gujarati', 'Punjabi', 'Chinese', 'South Indian'];
const DRINK_SUBS = ['Drinks'];

const NewOrder = () => {
  const { user } = useAuth();

  // Step 1: customer info
  const [step, setStep] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [mobileError, setMobileError] = useState('');

  // Menu
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Food');
  const [activeSub, setActiveSub] = useState('Gujarati');

  // Cart
  const [cart, setCart] = useState([]);
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(null);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (step === 2 && user?.token) {
      setMenuLoading(true);
      fetch(`${API_BASE}/api/menu`, { headers: authHeader(user.token) })
        .then(r => r.json())
        .then(d => setMenuItems(Array.isArray(d) ? d : []))
        .catch(() => setMenuItems([]))
        .finally(() => setMenuLoading(false));
    }
  }, [step, user]);

  const validateStep1 = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(customerMobile)) { setMobileError('Enter a valid 10-digit mobile number'); return; }
    setMobileError('');
    setStep(2);
  };

  const filteredItems = menuItems.filter(i => i.category === activeTab && i.subCategory === activeSub);

  const getQty = (id) => cart.find(c => c.menuItemId === id)?.qty || 0;

  const updateCart = (item, delta) => {
    setCart(prev => {
      const existing = prev.find(c => c.menuItemId === item._id);
      if (!existing && delta > 0) {
        return [...prev, { menuItemId: item._id, name: item.name, subCategory: item.subCategory, price: item.price, qty: 1 }];
      }
      if (existing) {
        const newQty = existing.qty + delta;
        if (newQty <= 0) return prev.filter(c => c.menuItemId !== item._id);
        return prev.map(c => c.menuItemId === item._id ? { ...c, qty: newQty } : c);
      }
      return prev;
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.menuItemId !== id));

  const totalAmount = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const placeOrder = async () => {
    if (cart.length === 0) { setApiError('Add at least one item to the order.'); return; }
    setPlacing(true);
    setApiError('');
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: authHeader(user.token),
        body: JSON.stringify({ tableNumber, customerName, customerMobile, items: cart })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess(data);
      setStep(3);
    } catch (err) { setApiError(err.message); }
    finally { setPlacing(false); }
  };

  const resetAll = () => {
    setStep(1); setCustomerName(''); setCustomerMobile(''); setTableNumber('');
    setCart([]); setSuccess(null); setApiError(''); setActiveSub('Gujarati'); setActiveTab('Food');
  };

  const resetForSameCustomer = () => {
    setCart([]);
    setSuccess(null);
    setApiError('');
    setStep(2);
  };

  const subcats = activeTab === 'Food' ? FOOD_SUBS : DRINK_SUBS;

  // ── STEP 3: Success ──────────────────────────────────────────────────────────
  if (step === 3 && success) return (
    <div className="page-container animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: 480, width: '100%' }}>
        <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 1.5rem' }} />
        <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Order Placed!</h2>
        <p style={{ color: '#94a3b8', marginBottom: '0.25rem' }}>Table {success.tableNumber} · {success.customerName}</p>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>₹{success.totalAmount.toLocaleString()} total · {success.items.length} item(s)</p>
        <button className="btn-primary" style={{ width: '100%', marginBottom: '0.75rem' }} onClick={resetForSameCustomer}>
          + Add More Items for {success.customerName}
        </button>
        <button className="btn-secondary" style={{ width: '100%' }} onClick={resetAll}>
          Finish & New Customer
        </button>
      </div>
    </div>
  );

  return (
    <div className="page-container animate-fade-in" style={{ padding: '2rem' }}>
      {/* ── STEP 1: Customer Info ── */}
      {step === 1 && (
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ChefHat size={28} className="text-accent" /> New Order
            </h2>
            <p className="page-subtitle">Enter customer details to begin the order.</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <form onSubmit={validateStep1}>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="input-label">Customer Mobile Number *</label>
                <input className="input-field" type="tel" required maxLength={10}
                  placeholder="e.g. 9876543210"
                  value={customerMobile} onChange={e => setCustomerMobile(e.target.value.replace(/\D/, ''))} />
                {mobileError && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{mobileError}</p>}
              </div>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="input-label">Customer Name *</label>
                <input className="input-field" required placeholder="e.g. Rahul Shah"
                  value={customerName} onChange={e => setCustomerName(e.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="input-label">Table Number *</label>
                <input className="input-field" required placeholder="e.g. T-5"
                  value={tableNumber} onChange={e => setTableNumber(e.target.value)} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Continue to Menu →</button>
            </form>
          </div>
        </div>
      )}

      {/* ── STEP 2: Menu + Cart ── */}
      {step === 2 && (
        <div className="order-layout">
          {/* LEFT: Menu */}
          <div className="order-menu-panel">
            <div style={{ marginBottom: '1rem' }}>
              <h2 className="page-title" style={{ fontSize: '1.3rem' }}>
                Table {tableNumber} · {customerName}
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 400, marginLeft: '0.75rem' }}>{customerMobile}</span>
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="menu-tabs" style={{ marginBottom: '0.6rem' }}>
              {['Food', 'Drink'].map(tab => (
                <button key={tab} className={`menu-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => { setActiveTab(tab); setActiveSub(tab === 'Food' ? 'Gujarati' : 'Drinks'); }}>
                  {tab === 'Food' ? <UtensilsCrossed size={15} /> : <Coffee size={15} />} {tab}
                </button>
              ))}
            </div>

            {/* Sub-Category Tabs */}
            <div className="sub-tabs" style={{ marginBottom: '1rem' }}>
              {subcats.map(s => (
                <button key={s} className={`sub-tab ${activeSub === s ? 'active' : ''}`} onClick={() => setActiveSub(s)}>{s}</button>
              ))}
            </div>

            {/* Menu Items Grid */}
            {menuLoading ? (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>Loading menu...</div>
            ) : (
              <div className="menu-items-grid">
                {filteredItems.length === 0 ? (
                  <p style={{ color: '#64748b', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>
                    No items in this category. Ask your owner to add them.
                  </p>
                ) : filteredItems.map(item => {
                  const qty = getQty(item._id);
                  return (
                    <div key={item._id} className={`menu-item-card glass-panel ${!item.available ? 'unavailable' : ''}`}>
                      <div className="menu-item-info">
                        <p className="menu-item-name">{item.name}</p>
                        <p className="menu-item-price">₹{item.price}</p>
                      </div>
                      {!item.available ? (
                        <span className="not-avail-badge">Not Available</span>
                      ) : (
                        <div className="qty-controls">
                          <button className="qty-btn minus" onClick={() => updateCart(item, -1)} disabled={qty === 0}>
                            <Minus size={14} />
                          </button>
                          <span className="qty-num">{qty}</span>
                          <button className="qty-btn plus" onClick={() => updateCart(item, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Cart */}
          <div className="order-cart-panel glass-panel">
            <div className="cart-header">
              <ShoppingCart size={20} />
              <h3>Order Summary</h3>
              <span className="cart-count">{cart.length} item(s)</span>
            </div>

            {cart.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>
                No items added yet. Select from the menu.
              </p>
            ) : (
              <div className="cart-items">
                {cart.map(c => (
                  <div key={c.menuItemId} className="cart-row">
                    <div style={{ flex: 1 }}>
                      <p className="cart-item-name">{c.name}</p>
                      <p className="cart-item-sub">₹{c.price} × {c.qty}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="cart-item-total">₹{(c.price * c.qty).toLocaleString()}</span>
                      <button className="remove-cart-btn" onClick={() => removeFromCart(c.menuItemId)}>
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="cart-footer">
              <div className="cart-total-row">
                <span>Grand Total</span>
                <span className="cart-grand-total">₹{totalAmount.toLocaleString()}</span>
              </div>

              {apiError && <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: '0.5rem 0' }}>{apiError}</p>}

              <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}
                onClick={placeOrder} disabled={placing || cart.length === 0}>
                {placing ? 'Placing...' : '✓ Place Order'}
              </button>
              <button className="btn-secondary"
                style={{ width: '100%', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                onClick={resetAll}>
                <Trash2 size={15} /> Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrder;
