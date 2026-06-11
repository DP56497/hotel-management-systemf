import React from 'react';
import { User, Mail, Shield, Hotel, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../owner/Staff.css';

const ManagerDashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="page-container animate-fade-in" style={{ padding: '2rem' }}>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 className="page-title">Manager Dashboard</h2>
          <p className="page-subtitle">Your account and hotel assignment details.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', maxWidth: '900px' }}>
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
    </div>
  );
};

export default ManagerDashboard;
