import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBankStore } from '@/store/useBankStore';
import { 
  CreditCard as CardIcon, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Copy, 
  TrendingUp, 
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { Button } from '../ui/button';
import { GlassCard } from '../shared/GlassCard';
import { toast } from 'sonner';

const VirtualCard = () => {
  const currentUser = useBankStore((state) => state.currentUser);
  const [showDetails, setShowDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  if (!currentUser) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const cardNumber = "5412 8800 1234 5678";
  const expiry = "12/28";
  const cvv = "432";

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Virtual Debit Card</h1>
        <p className="text-navy/60">Generate and manage secure cards for online shopping.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Card Display */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, rotateY: 20 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            className="perspective-1000"
          >
            <div className={`
              relative w-full aspect-[1.58/1] rounded-[2rem] p-8 text-white overflow-hidden shadow-2xl transition-all duration-500
              ${isFrozen ? 'grayscale brightness-50' : 'bg-gradient-to-br from-navy via-navy/90 to-blue-900'}
            `}>
              {/* Card texture pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gold rounded flex items-center justify-center text-navy font-bold">N</div>
                    <span className="font-bold tracking-tight text-lg">NovaTrust</span>
                  </div>
                  <Smartphone className="opacity-40" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-4">
                    <p className="text-xl md:text-3xl font-mono tracking-[0.2em]">
                      {showDetails ? cardNumber : "•••• •••• •••• 5678"}
                    </p>
                    <button onClick={() => copyToClipboard(cardNumber, 'Card number')} className="p-1 hover:bg-white/10 rounded">
                      <Copy size={16} className="opacity-40" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Card Holder</p>
                    <p className="font-bold tracking-wider">{currentUser.firstName} {currentUser.lastName}</p>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Expiry</p>
                      <p className="font-bold">{expiry}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">CVV</p>
                      <p className="font-bold">{showDetails ? cvv : "•••"}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex gap-[-8px]">
                      <div className="w-8 h-8 rounded-full bg-red-500/80" />
                      <div className="w-8 h-8 rounded-full bg-gold/80 -ml-4" />
                    </div>
                    <span className="text-[8px] font-black italic">mastercard</span>
                  </div>
                </div>
              </div>

              {/* Chip */}
              <div className="absolute top-24 left-8 w-12 h-10 bg-gradient-to-br from-gold via-gold-muted to-gold rounded-md overflow-hidden">
                <div className="absolute inset-0 border-[1px] border-navy/20" />
                <div className="w-full h-[1px] bg-navy/20 absolute top-1/2" />
                <div className="w-[1px] h-full bg-navy/20 absolute left-1/2" />
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 h-14 border-navy/10 text-navy font-bold"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
            <Button 
              variant={isFrozen ? 'default' : 'outline'} 
              className={`flex-1 h-14 font-bold ${isFrozen ? 'bg-navy text-white' : 'border-red-100 text-red-500 hover:bg-red-50'}`}
              onClick={() => {
                setIsFrozen(!isFrozen);
                toast.info(`Card ${!isFrozen ? 'Frozen' : 'Unfrozen'}`);
              }}
            >
              {isFrozen ? <Unlock className="mr-2" /> : <Lock className="mr-2" />}
              {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
            </Button>
          </div>
        </div>

        {/* Analytics & Limits */}
        <div className="space-y-6">
          <GlassCard className="border-navy/5 bg-white shadow-sm">
            <h3 className="font-bold text-navy mb-6 flex items-center gap-2">
              <TrendingUp className="text-gold" />
              Spending Analytics
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-navy/60 font-medium">Monthly Limit</span>
                  <span className="text-navy font-bold">₦250,000 / ₦1,000,000</span>
                </div>
                <div className="h-2 bg-navy/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gold w-1/4 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-navy/[0.02] rounded-xl">
                  <p className="text-[10px] text-navy/40 uppercase tracking-widest mb-1">Online Shopping</p>
                  <p className="text-lg font-bold text-navy">₦185,400</p>
                </div>
                <div className="p-4 bg-navy/[0.02] rounded-xl">
                  <p className="text-[10px] text-navy/40 uppercase tracking-widest mb-1">Subscriptions</p>
                  <p className="text-lg font-bold text-navy">₦64,600</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="bg-white border border-navy/5 rounded-2xl p-6">
            <h3 className="font-bold text-navy mb-4">Security Settings</h3>
            <div className="space-y-4">
              {[
                { label: 'Online Transactions', desc: 'Enable card for web payments', active: true },
                { label: 'International Spend', desc: 'Enable card for global merchants', active: false },
                { label: 'ATM Withdrawals', desc: 'Enable card for ATM use', active: true },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-bold text-navy">{setting.label}</p>
                    <p className="text-[10px] text-navy/40">{setting.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer relative ${setting.active ? 'bg-gold' : 'bg-navy/10'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${setting.active ? 'left-7' : 'left-1'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCard;
