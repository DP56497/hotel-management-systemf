import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import OwnerLayout from './layouts/OwnerLayout';
import ManagerLayout from './layouts/ManagerLayout';
import StaffLayout from './layouts/StaffLayout';
import Dashboard from './pages/owner/Dashboard';
import Managers from './pages/owner/Managers';
import Staff from './pages/owner/Staff';
import MenuManagement from './pages/owner/MenuManagement';
import Bills from './pages/shared/Bills';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import NewOrder from './pages/staff/NewOrder';

const RootRedirect = () => {
  const { user } = useAuth();
  if (user) {
    if (user.role === 'Owner') return <Navigate to="/owner" replace />;
    if (user.role === 'Manager') return <Navigate to="/manager" replace />;
    return <Navigate to="/staff" replace />;
  }
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Owner Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Owner']} />}>
            <Route path="/owner" element={<OwnerLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="managers" element={<Managers />} />
              <Route path="staff" element={<Staff />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="bills" element={<Bills />} />
            </Route>
          </Route>

          {/* Manager Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
            <Route path="/manager" element={<ManagerLayout />}>
              <Route index element={<ManagerDashboard />} />
              <Route path="bills" element={<Bills />} />
            </Route>
          </Route>

          {/* Staff Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Staff']} />}>
            <Route path="/staff" element={<StaffLayout />}>
              <Route index element={<StaffDashboard />} />
              <Route path="new-order" element={<NewOrder />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
