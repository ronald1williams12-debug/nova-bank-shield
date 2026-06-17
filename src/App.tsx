import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useBankStore } from './store/useBankStore';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/auth/LoginPage';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

function App() {
  const initializeData = useBankStore((state) => state.initializeData);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gold/30 selection:text-navy">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage role="User" />} />
          <Route path="/admin/login" element={<LoginPage role="Admin" />} />

          {/* Customer Routes */}
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute role="User">
                <UserDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute role="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" richColors closeButton />
      </div>
    </Router>
  );
}

export default App;
