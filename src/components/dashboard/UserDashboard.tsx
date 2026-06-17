import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useBankStore } from '@/store/useBankStore';
import { 
  LayoutDashboard, 
  Send, 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  ShieldCheck, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Search,
  User as UserIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import DashboardHome from './DashboardHome';
import TransferFunds from './TransferFunds';
import VirtualCard from './VirtualCard';
import SavingsGoals from './SavingsGoals';
import Investments from './Investments';
import KYCVerification from './KYCVerification';

const UserDashboard = () => {
  const currentUser = useBankStore((state) => state.currentUser);
  const logout = useBankStore((state) => state.logout);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
    { icon: <Send size={20} />, label: 'Transfers', path: '/dashboard/transfers' },
    { icon: <CreditCard size={20} />, label: 'Virtual Card', path: '/dashboard/card' },
    { icon: <PiggyBank size={20} />, label: 'Savings', path: '/dashboard/savings' },
    { icon: <TrendingUp size={20} />, label: 'Investments', path: '/dashboard/investments' },
    { icon: <ShieldCheck size={20} />, label: 'KYC Status', path: '/dashboard/kyc' },
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
              <span className="text-xl font-bold tracking-tight">NovaTrust</span>
            </Link>
          </div>

          <nav className="flex-grow px-4 space-y-2 mt-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard/');
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive ? 'bg-gold text-navy font-bold shadow-lg shadow-gold/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}
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
              className="flex items-center gap-3 w-full px-4 py-3 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
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
            <div className="hidden md:flex items-center gap-2 bg-navy/5 rounded-full px-4 py-2 w-64">
              <Search size={16} className="text-navy/40" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-navy/60 hover:text-gold transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-navy/10 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-navy leading-none mb-1">{currentUser.firstName} {currentUser.lastName}</p>
                <p className="text-[10px] text-navy/40 uppercase tracking-wider font-bold">{currentUser.accountType}</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-gold/20">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="bg-navy text-white text-xs">
                  {currentUser.firstName[0]}{currentUser.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/transfers" element={<TransferFunds />} />
            <Route path="/card" element={<VirtualCard />} />
            <Route path="/savings" element={<SavingsGoals />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/kyc" element={<KYCVerification />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default UserDashboard;
