import { useBankStore } from '@/store/useBankStore';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Eye, 
  FileText, 
  User, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { GlassCard } from '../shared/GlassCard';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

const KYCManager = () => {
  const users = useBankStore((state) => state.users).filter(u => u.kycStatus === 'Pending');
  const approveKYC = useBankStore((state) => state.approveKYC);
  const rejectKYC = useBankStore((state) => state.rejectKYC);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-navy text-gold">KYC Verification Queue</h1>
        <p className="text-navy/60">Review submitted identity documents for manual approval.</p>
      </div>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {users.map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="bg-white border-navy/5 p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="flex items-center gap-4 min-w-[250px]">
                  <Avatar className="h-16 w-16 border-2 border-gold/20">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-navy">{user.firstName} {user.lastName}</h3>
                    <p className="text-xs text-navy/40">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-navy/40 uppercase tracking-widest font-bold">
                      <Calendar size={12} />
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-navy/[0.02] rounded-2xl border border-navy/5 text-center group cursor-pointer hover:bg-gold/5 transition-colors">
                    <FileText className="mx-auto mb-2 text-navy/20 group-hover:text-gold" size={24} />
                    <p className="text-[10px] font-black uppercase text-navy/60">Government ID</p>
                    <p className="text-xs text-navy/40 mt-1 flex items-center justify-center gap-1">
                      <Eye size={10} /> View Document
                    </p>
                  </div>
                  <div className="p-4 bg-navy/[0.02] rounded-2xl border border-navy/5 text-center group cursor-pointer hover:bg-gold/5 transition-colors">
                    <User className="mx-auto mb-2 text-navy/20 group-hover:text-gold" size={24} />
                    <p className="text-[10px] font-black uppercase text-navy/60">Live Selfie</p>
                    <p className="text-xs text-navy/40 mt-1 flex items-center justify-center gap-1">
                      <Eye size={10} /> View Photo
                    </p>
                  </div>
                  <div className="p-4 bg-navy/[0.02] rounded-2xl border border-navy/5 text-center group cursor-pointer hover:bg-gold/5 transition-colors hidden md:block">
                    <ShieldCheck className="mx-auto mb-2 text-navy/20 group-hover:text-gold" size={24} />
                    <p className="text-[10px] font-black uppercase text-navy/60">Address Proof</p>
                    <p className="text-xs text-navy/40 mt-1 flex items-center justify-center gap-1">
                      <Eye size={10} /> View Utility Bill
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 w-full lg:w-auto">
                  <Button 
                    variant="outline" 
                    className="flex-1 lg:flex-none h-14 border-red-100 text-red-500 hover:bg-red-50"
                    onClick={() => rejectKYC(user.id)}
                  >
                    <X className="mr-2" size={18} />
                    Reject
                  </Button>
                  <Button 
                    className="flex-1 lg:flex-none h-14 bg-green-600 text-white hover:bg-green-700 px-8"
                    onClick={() => approveKYC(user.id)}
                  >
                    <Check className="mr-2" size={18} />
                    Approve
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {users.length === 0 && (
          <div className="py-32 text-center bg-white border border-navy/5 rounded-3xl">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-navy">All Clear!</h2>
            <p className="text-navy/40">No pending KYC verifications in the queue.</p>
          </div>
        )}
      </div>

      <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6 flex gap-4">
        <AlertCircle className="text-gold shrink-0" />
        <div className="text-sm">
          <p className="font-bold text-navy mb-1">Compliance Policy Reminder</p>
          <p className="text-navy/70 leading-relaxed">
            As an administrator, you are required to verify the authenticity of all documents against global AML (Anti-Money Laundering) standards. Fraudulent approvals may result in account suspension.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KYCManager;
