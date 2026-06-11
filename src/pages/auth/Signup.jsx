import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hotel, User, Lock, Briefcase, Mail, MapPin, Flag, Building } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, user } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Owner');
  const [error, setError] = useState('');

  // Hotel Details state for Owner
  const [hotelName, setHotelName] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');
  const [country, setCountry] = useState('');
  const [state, setHotelState] = useState('');
  const [district, setDistrict] = useState('');

  // Hotel Selection state for Manager/Staff
  const [hotelList, setHotelList] = useState([]);
  const [selectedHotelIndex, setSelectedHotelIndex] = useState('');

  // Fetch hotels for dropdown
  React.useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/hotels');
        const data = await res.json();
        if (res.ok) setHotelList(data);
      } catch (err) {
        console.error('Failed to fetch hotels');
      }
    };
    fetchHotels();
  }, []);

  // Auto redirect if already logged in
  React.useEffect(() => {
    if (user) {
      if (user.role === 'Owner') navigate('/owner');
      else if (user.role === 'Manager') navigate('/manager');
      else navigate('/staff');
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      let finalHotelDetails = undefined;
      if (role === 'Owner') {
        finalHotelDetails = { name: hotelName, location: hotelLocation, country, state, district };
      } else if (selectedHotelIndex !== '') {
        finalHotelDetails = hotelList[selectedHotelIndex];
      }
      
      await signup(fullName, email, password, role, finalHotelDetails);
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="login-container">
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      <div className="login-card glass-panel animate-fade-in">
        <div className="login-header">
          <div className="logo-container">
            <Hotel size={40} className="logo-icon" />
          </div>
          <h2>Create Account</h2>
          <p>Sign up for a new account</p>
        </div>

        {error && <div className="error-message" style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</div>}

        <form onSubmit={handleSignup} className="login-form">
          <div className="form-group">
            <label className="input-label">Full Name</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input 
                type="text" 
                className="input-field with-icon" 
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Email Address</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input 
                type="email" 
                className="input-field with-icon" 
                placeholder="admin@hotel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input 
                type="password" 
                className="input-field with-icon" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Role</label>
            <div className="input-wrapper">
              <Briefcase size={20} className="input-icon" />
              <select 
                className="input-field with-icon custom-select" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Owner">Owner</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
          </div>

          {role === 'Owner' ? (
            <div className="hotel-details-section animate-fade-in" style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                <Building size={18} style={{ color: '#3b82f6' }} /> Hotel Details
              </h3>
              
              <div className="form-group">
                <label className="input-label">Hotel Name</label>
                <div className="input-wrapper">
                  <Hotel size={20} className="input-icon" />
                  <input type="text" className="input-field with-icon" value={hotelName} onChange={(e) => setHotelName(e.target.value)} placeholder="Grand Plaza Hotel" required />
                </div>
              </div>
              
              <div className="form-group">
                <label className="input-label">Location / Address</label>
                <div className="input-wrapper">
                  <MapPin size={20} className="input-icon" />
                  <input type="text" className="input-field with-icon" value={hotelLocation} onChange={(e) => setHotelLocation(e.target.value)} placeholder="123 Main Street, Downtown" required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label className="input-label">Country</label>
                  <div className="input-wrapper">
                    <Flag size={20} className="input-icon" />
                    <input type="text" className="input-field with-icon" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="USA" required />
                  </div>
                </div>
                
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label className="input-label">State</label>
                  <input type="text" className="input-field" style={{ paddingLeft: '1rem' }} value={state} onChange={(e) => setHotelState(e.target.value)} placeholder="California" required />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label className="input-label">District / City</label>
                <input type="text" className="input-field" style={{ paddingLeft: '1rem' }} value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Los Angeles" required />
              </div>
            </div>
          ) : (
            <div className="hotel-details-section animate-fade-in" style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                <Building size={18} style={{ color: '#3b82f6' }} /> Select Your Assigned Hotel
              </h3>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label className="input-label">Available Hotels</label>
                <div className="input-wrapper">
                  <Hotel size={20} className="input-icon" />
                  <select 
                    className="input-field with-icon custom-select" 
                    value={selectedHotelIndex}
                    onChange={(e) => setSelectedHotelIndex(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select a Hotel...</option>
                    {hotelList.map((hotel, index) => (
                      <option key={index} value={index}>{hotel.name} - {hotel.district}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary login-btn">
            Sign Up
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#64748b' }}>
            Already signed up? <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
