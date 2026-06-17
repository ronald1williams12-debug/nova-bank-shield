import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBankStore } from '@/store/useBankStore';
import { GlassCard } from '../shared/GlassCard';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Plus, 
  Search, 
  Download,
  Filter,
  History
} from 'lucide-react';
import { Button } from '../ui/button';
import { Transaction } from '@/lib/mock-data-generator';
import { format } from 'date-fns';
import { toast } from 'sonner';

const DashboardHome = () => {
  const currentUser = useBankStore((state) => state.currentUser);
  const transactions = useBankStore((state) => state.transactions)
    .filter(t => t.userId === currentUser?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  if (!currentUser) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info('Security Alert: New login detected from New York, NY. If this wasn\'t you, please contact support.', {
        duration: 6000,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome & Account Summary */}
      <div className="flex flex-col md:flex-row gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-grow"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-navy">Welcome back, {currentUser.firstName}! 👋</h1>
            <p className="text-navy/60">Here's what's happening with your accounts today.</p>
          </div>

          <GlassCard className="bg-navy text-white border-none p-8 relative overflow-hidden h-full min-h-[220px]">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <p className="text-white/60 text-sm font-medium uppercase tracking-[0.2em] mb-2">Available Balance</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                  {formatCurrency(currentUser.balance)}
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {currentUser.accountType} Account • {currentUser.accountNumber}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button className="bg-gold text-navy hover:bg-gold/90 font-bold px-6">
                  <Plus className="mr-2" size={18} />
                  Add Money
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6">
                  <Download className="mr-2" size={18} />
                  Statement
                </Button>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/2" />
            <CreditCard className="absolute bottom-[-20px] right-[-20px] w-64 h-64 text-white/5 -rotate-12" />
          </GlassCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full md:w-80 space-y-4"
        >
          <div className="bg-white border border-navy/5 rounded-2xl p-6 h-full flex flex-col justify-between">
            <h3 className="font-bold text-navy mb-4 flex items-center justify-between">
              Quick Actions
              <History size={16} className="text-navy/40" />
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Transfer', icon: <Plus />, color: 'bg-gold/10 text-gold' },
                { label: 'Bills', icon: <History />, color: 'bg-blue-500/10 text-blue-500' },
                { label: 'Mobile', icon: <Plus />, color: 'bg-green-500/10 text-green-500' },
                { label: 'Investment', icon: <Plus />, color: 'bg-purple-500/10 text-purple-500' },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-navy/5 transition-all border border-transparent hover:border-navy/5 group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-navy/70">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-navy/5 rounded-3xl overflow-hidden shadow-sm"
      >
        <div className="p-6 border-b border-navy/5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-navy">Recent Transactions</h3>
            <p className="text-sm text-navy/40">Your last 10 activities across all accounts.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-navy/60 border-navy/10">
              <Filter size={14} className="mr-2" />
              Filter
            </Button>
            <Button variant="ghost" size="sm" className="text-gold font-bold">
              View All
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-navy/[0.01] text-[10px] uppercase tracking-widest font-bold text-navy/40 border-b border-navy/5">
                <th className="px-6 py-4">Transaction Details</th>
                <th className="px-6 py-4 text-center">Type</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-navy/[0.01] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        tx.type === 'Credit' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                      }`}>
                        {tx.type === 'Credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-navy group-hover:text-gold transition-colors">{tx.description}</p>
                        <p className="text-xs text-navy/40">{format(new Date(tx.date), 'MMM dd, yyyy • hh:mm a')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-medium text-navy/60">{tx.category}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${
                    tx.type === 'Credit' ? 'text-green-600' : 'text-navy'
                  }`}>
                    {tx.type === 'Credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-navy/40">
                    No transactions found in this account.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
