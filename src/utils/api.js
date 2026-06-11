// Central API configuration
// Set VITE_API_URL in your root .env to override the default
export const API_BASE = import.meta.env.VITE_API_URL || 'https://hotel-management-system-oi2e.onrender.com';

/**
 * Returns auth headers for protected API calls
 * @param {string} token - JWT token from AuthContext
 */
export const authHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});
