import { motion } from 'framer-motion';
import { useBankStore } from '@/store/useBankStore';
import { 
  TrendingUp, 
  PieChart, 
  LineChart, 
  ArrowUpRight, 
  Globe, 
  BarChart3,
  Search,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { GlassCard } from '../shared/GlassCard';

const Investments = () => {
  const portfolio = [
    { name: 'Global Tech ETF', value: 12400000, profit: 12.5, type: 'Stocks' },
    { name: 'Fixed Deposit (A)', value: 5000000, profit: 8.2, type: 'Bond' },
    { name: 'Real Estate REITS', value: 8500000, profit: -2.1, type: 'Property' },
    { name: 'Nova Crypto Index', value: 2100000, profit: 45.8, type: 'Digital' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const totalValue = portfolio.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Investment Portfolio</h1>
          <p className="text-navy/60">Manage and track your global wealth across asset classes.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 border-navy/10 text-navy">
            Market News
          </Button>
          <Button className="bg-navy text-white hover:bg-navy/90 h-12 px-6 font-bold">
            Explore Plans
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="bg-white border-navy/5 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-navy">Portfolio Value</h3>
              <div className="flex gap-2">
                {['1D', '1W', '1M', '1Y', 'ALL'].map((p) => (
                  <button key={p} className={`px-3 py-1 rounded-full text-[10px] font-bold ${p === '1Y' ? 'bg-gold text-navy' : 'text-navy/40 hover:bg-navy/5'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
              <div>
                <p className="text-4xl md:text-5xl font-black text-navy">{formatCurrency(totalValue)}</p>
                <div className="flex items-center gap-2 mt-2 text-green-600 font-bold">
                  <TrendingUp size={18} />
                  <span>+₦2,450,000 (14.2%)</span>
                  <span className="text-navy/20 font-normal">this year</span>
                </div>
              </div>
              <div className="flex-grow h-24 bg-navy/[0.02] rounded-xl flex items-end justify-between px-6 py-2 overflow-hidden relative">
                {[40, 60, 45, 70, 55, 80, 65, 90, 75, 100, 85].map((h, i) => (
                  <div key={i} className="w-4 bg-gold/20 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Market Value', val: formatCurrency(totalValue), icon: <Globe size={16} /> },
                { label: 'Total Profit', val: '+₦4.8M', icon: <TrendingUp size={16} /> },
                { label: 'Active Plans', val: '4', icon: <PieChart size={16} /> },
                { label: 'Risk Level', val: 'Moderate', icon: <ShieldCheck size={16} /> },
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-navy/[0.02] rounded-2xl border border-navy/5">
                  <div className="text-gold mb-2">{stat.icon}</div>
                  <p className="text-[10px] text-navy/40 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-sm font-bold text-navy">{stat.val}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="bg-white border border-navy/5 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-navy/5 flex items-center justify-between">
              <h3 className="font-bold text-navy">Asset Distribution</h3>
              <Button variant="ghost" size="sm" className="text-gold">View Details</Button>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-navy/40 font-bold border-b border-navy/5">
                    <th className="pb-4">Asset Name</th>
                    <th className="pb-4">Value</th>
                    <th className="pb-4">Change</th>
                    <th className="pb-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  {portfolio.map((asset) => (
                    <tr key={asset.name} className="group hover:bg-navy/[0.01] transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            asset.type === 'Stocks' ? 'bg-blue-100 text-blue-600' : 
                            asset.type === 'Digital' ? 'bg-purple-100 text-purple-600' : 'bg-gold/10 text-gold'
                          }`}>
                            <BarChart3 size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-navy">{asset.name}</p>
                            <p className="text-[10px] text-navy/40 uppercase">{asset.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-bold text-navy text-sm">{formatCurrency(asset.value)}</td>
                      <td className={`py-4 text-sm font-bold ${asset.profit > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {asset.profit > 0 ? '+' : ''}{asset.profit}%
                      </td>
                      <td className="py-4">
                        <button className="p-2 text-navy/20 hover:text-gold transition-colors">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-navy rounded-3xl p-8 text-white relative overflow-hidden">
            <h3 className="text-xl font-bold mb-4 relative z-10">High-Yield Fixed Deposit</h3>
            <p className="text-white/60 text-sm mb-8 relative z-10">
              Lock your funds for 12 months and earn up to 14.5% annual interest.
            </p>
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="px-4 py-2 bg-white/10 rounded-xl text-center">
                <p className="text-[10px] text-white/40 uppercase">Interest</p>
                <p className="text-xl font-bold text-gold">14.5%</p>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-xl text-center">
                <p className="text-[10px] text-white/40 uppercase">Term</p>
                <p className="text-xl font-bold text-gold">1 Year</p>
              </div>
            </div>
            <Button className="w-full bg-gold text-navy hover:bg-gold/90 font-bold h-12 relative z-10">
              Invest Now
            </Button>
            <TrendingUp className="absolute bottom-[-20px] right-[-20px] w-48 h-48 text-white/5 -rotate-12" />
          </div>

          <div className="bg-white border border-navy/5 rounded-3xl p-8 shadow-sm">
            <h3 className="font-bold text-navy mb-6">Investment Calculator</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs text-navy/60 font-medium">I want to invest</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-navy/40">₦</span>
                  <input type="text" defaultValue="1,000,000" className="w-full h-12 bg-navy/5 border-none rounded-xl pl-10 pr-4 font-bold text-navy" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-navy/60 font-medium">For a period of</p>
                <div className="flex gap-2">
                  {['6 Mo', '1 Yr', '2 Yr', '5 Yr'].map((t) => (
                    <button key={t} className={`flex-1 h-10 rounded-lg text-xs font-bold transition-all ${t === '1 Yr' ? 'bg-navy text-white' : 'bg-navy/5 text-navy/60 hover:bg-navy/10'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-navy/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-navy/60">Expected Return</span>
                  <span className="text-lg font-bold text-green-600">+₦145,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-navy/60">Final Value</span>
                  <span className="text-xl font-black text-navy">₦1,145,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;
