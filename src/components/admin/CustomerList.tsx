import { useState } from 'react';
import { useBankStore } from '@/store/useBankStore';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ShieldCheck, 
  Ban, 
  ArrowUpRight, 
  ArrowDownLeft,
  Eye,
  CreditCard,
  Plus
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner';

const CustomerList = () => {
  const users = useBankStore((state) => state.users).filter(u => u.role === 'User');
  const toggleFreeze = useBankStore((state) => state.toggleFreeze);
  const adjustBalance = useBankStore((state) => state.adjustBalance);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.accountNumber.includes(searchTerm);
    
    if (filter === 'All') return matchesSearch;
    if (filter === 'Frozen') return matchesSearch && u.isFrozen;
    if (filter === 'Approved KYC') return matchesSearch && u.kycStatus === 'Approved';
    if (filter === 'Pending KYC') return matchesSearch && u.kycStatus === 'Pending';
    return matchesSearch;
  });

  const handleAdjustBalance = (userId: string) => {
    const amount = prompt('Enter amount to add/subtract (e.g. 5000 or -5000):');
    if (amount) {
      const val = parseFloat(amount);
      if (!isNaN(val)) {
        adjustBalance(userId, val);
      } else {
        toast.error('Invalid amount');
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy text-gold">Customer Management</h1>
          <p className="text-navy/60">Manage user accounts, balances, and system access.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40 w-4 h-4" />
            <Input 
              placeholder="Search customers..." 
              className="pl-10 h-11 border-navy/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-11 border-navy/10">
            <Filter size={18} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="bg-white border border-navy/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-navy/[0.01] text-[10px] uppercase tracking-widest font-bold text-navy/40 border-b border-navy/5">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Account Details</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Balance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5 text-sm">
              {filteredUsers.slice(0, 50).map((user) => (
                <tr key={user.id} className="hover:bg-navy/[0.005] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-navy/5">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-navy">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-navy/40">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs text-navy">{user.accountNumber}</p>
                    <p className="text-[10px] text-navy/40 font-bold uppercase">{user.accountType}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col gap-1 items-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        user.kycStatus === 'Approved' ? 'bg-green-100 text-green-700' : 
                        user.kycStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        KYC: {user.kycStatus}
                      </span>
                      {user.isFrozen && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black text-white">
                          Frozen
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-bold text-navy">{formatCurrency(user.balance)}</p>
                    <p className="text-[10px] text-navy/40">Last seen: {new Date(user.lastLogin).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-white border-navy/10">
                        <DropdownMenuItem onClick={() => handleAdjustBalance(user.id)} className="gap-2">
                          <Plus size={14} className="text-green-600" /> Adjust Balance
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleFreeze(user.id)} className="gap-2">
                          <Ban size={14} className="text-red-500" /> {user.isFrozen ? 'Unfreeze' : 'Freeze'} Account
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Eye size={14} className="text-navy/60" /> View History
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <CreditCard size={14} className="text-navy/60" /> Manage Cards
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="py-20 text-center text-navy/40">
              No customers match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
