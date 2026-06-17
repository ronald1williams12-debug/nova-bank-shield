import { useBankStore } from '@/store/useBankStore';
import { 
  FileText, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Activity,
  User,
  ShieldAlert,
  Download
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { format } from 'date-fns';

const AuditLogs = () => {
  const transactions = useBankStore((state) => state.transactions).slice(0, 100);
  const users = useBankStore((state) => state.users);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'System';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy text-gold">System Audit Logs</h1>
          <p className="text-navy/60">Live feed of all transactions and administrative actions.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-11 border-navy/10 text-navy">
            <Download size={18} className="mr-2" />
            Export CSV
          </Button>
          <Button className="h-11 bg-navy text-white font-bold">
            Live Feed: ON
          </Button>
        </div>
      </div>

      <div className="bg-white border border-navy/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-navy/5 flex flex-wrap gap-4 items-center">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40 w-4 h-4" />
            <Input placeholder="Search logs by user, account, or reference..." className="pl-10 h-10 border-navy/10" />
          </div>
          <div className="flex gap-2">
            {['All Activities', 'Transfers', 'KYC', 'Admin Adjustments'].map((f) => (
              <button key={f} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${f === 'All Activities' ? 'bg-gold/10 text-gold' : 'text-navy/40 hover:bg-navy/5'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-navy/[0.01] text-[10px] uppercase tracking-widest font-bold text-navy/40 border-b border-navy/5">
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action/Category</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4 text-right">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5 text-xs">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-navy/[0.005] transition-colors">
                  <td className="px-6 py-4 text-navy/40 font-mono">
                    {format(new Date(tx.date), 'yyyy-MM-dd HH:mm:ss')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy/60">
                        {getUserName(tx.userId).split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-navy">{getUserName(tx.userId)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      tx.category === 'Adjustment' ? 'bg-purple-100 text-purple-700' : 
                      tx.category === 'Transfer' ? 'bg-blue-100 text-blue-700' : 'bg-navy/5 text-navy/60'
                    }`}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-navy/60">
                    {tx.description}
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${
                    tx.type === 'Credit' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {tx.type === 'Credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
