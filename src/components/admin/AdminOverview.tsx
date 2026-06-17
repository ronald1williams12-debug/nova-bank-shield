import { useBankStore } from '@/store/useBankStore';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Activity
} from 'lucide-react';
import { GlassCard } from '../shared/GlassCard';
import { motion } from 'framer-motion';

const AdminOverview = () => {
  const users = useBankStore((state) => state.users);
  const transactions = useBankStore((state) => state.transactions);

  const totalBalance = users.reduce((acc, u) => acc + u.balance, 0);
  const pendingKYC = users.filter(u => u.kycStatus === 'Pending').length;
  const frozenAccounts = users.filter(u => u.isFrozen).length;
  const recentTransactions = transactions.slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const stats = [
    { label: 'Total Deposits', value: formatCurrency(totalBalance), icon: <DollarSign />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Customers', value: users.length.toString(), icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending KYC', value: pendingKYC.toString(), icon: <ShieldCheck />, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Frozen Accounts', value: frozenAccounts.toString(), icon: <AlertTriangle />, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy text-gold">System Overview</h1>
        <p className="text-navy/60">Global banking statistics and system health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="border-navy/5 bg-white p-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-[10px] text-navy/40 uppercase tracking-widest font-bold mb-1">{stat.label}</p>
              <h2 className="text-2xl font-bold text-navy">{stat.value}</h2>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="bg-white border-navy/5 p-8 h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-navy flex items-center gap-2">
                <Activity className="text-gold" size={20} />
                Transaction Volume (24h)
              </h3>
              <div className="flex gap-2">
                {['H', 'D', 'W', 'M'].map(p => (
                  <button key={p} className={`px-2 py-0.5 rounded text-[10px] font-bold ${p === 'D' ? 'bg-navy text-white' : 'bg-navy/5 text-navy/40'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[60, 40, 80, 50, 90, 70, 45, 85, 55, 100, 65, 75].map((h, i) => (
                <div key={i} className="flex-1 bg-navy/5 rounded-t-lg relative group">
                  <div 
                    className="absolute bottom-0 inset-x-0 bg-gold/30 rounded-t-lg transition-all group-hover:bg-gold" 
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard className="bg-white border-navy/5 p-8">
            <h3 className="font-bold text-navy mb-6">Recent Alerts</h3>
            <div className="space-y-6">
              {[
                { title: 'Large Withdrawal', desc: '₦5,000,000 withdrawal by User #421', time: '2 mins ago', type: 'warning' },
                { title: 'Multiple Login Failures', desc: '3 failed attempts from IP 192.168.1.1', time: '15 mins ago', type: 'error' },
                { title: 'KYC Document Upload', desc: 'New ID submitted by Jane Doe', time: '1 hour ago', type: 'info' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-1.5 h-full rounded-full shrink-0 ${
                    alert.type === 'error' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-gold' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm font-bold text-navy leading-none mb-1">{alert.title}</p>
                    <p className="text-xs text-navy/50 mb-1">{alert.desc}</p>
                    <p className="text-[10px] text-navy/30 font-bold uppercase">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
