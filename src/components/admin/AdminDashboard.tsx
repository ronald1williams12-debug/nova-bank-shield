import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useBankStore } from '@/store/useBankStore';
import { 
  Users, 
  ShieldCheck, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Search,
  Bell,
  Lock,
  ArrowDownCircle,
  ArrowUpCircle,
  FileText
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import CustomerList from './CustomerList';
import KYCManager from './KYCManager';
import AdminOverview from './AdminOverview';
import AuditLogs from './AuditLogs';

const AdminDashboard = () => {
  const currentUser = useBankStore((state) => state.currentUser);
  const logout = useBankStore((state) => state.logout);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!currentUser || currentUser.role !== 'Admin') return null;

  const navItems = [
    { icon: <BarChart3 size={20} />, label: 'Overview', path: '/admin' },
    { icon: <Users size={20} />, label: 'Customers', path: '/admin/customers' },
    { icon: <ShieldCheck size={20} />, label: 'KYC Reviews', path: '/admin/kyc' },
    { icon: <FileText size={20} />, label: 'Audit Logs', path: '/admin/audit' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-navy/[0.02] flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-navy text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gold rounded flex items-center justify-center text-navy font-bold">N</div>
              <span className="text-xl font-bold tracking-tight text-gold">Admin<span className="text-white">Panel</span></span>
            </Link>
          </div>

          <nav className="flex-grow px-4 space-y-2 mt-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/');
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive ? 'bg-gold text-navy font-bold shadow-lg shadow-gold/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            >
              <LogOut size={20} />
              <span>Staff Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-navy/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-navy" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="text-sm font-bold text-navy bg-navy/5 px-4 py-1 rounded-full border border-navy/5">
              Staff Portal • Session Active
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-navy/5">
              <div className="text-right">
                <p className="text-xs font-bold text-navy leading-none mb-1">System Status</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-green-600 font-black uppercase">All Systems Nominal</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-navy leading-none mb-1">Admin User</p>
                <p className="text-[10px] text-navy/40 uppercase tracking-wider font-bold">System Superuser</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-navy/10">
                <AvatarFallback className="bg-navy text-white text-xs">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/kyc" element={<KYCManager />} />
            <Route path="/audit" element={<AuditLogs />} />
          </Routes>
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
