import { Navigate } from 'react-router-dom';
import { useBankStore } from '@/store/useBankStore';

export const ProtectedRoute = ({ 
  children, 
  role 
}: { 
  children: React.ReactNode; 
  role: 'User' | 'Admin';
}) => {
  const currentUser = useBankStore((state) => state.currentUser);

  if (!currentUser) {
    return <Navigate to={role === 'Admin' ? '/admin/login' : '/login'} replace />;
  }

  if (currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
