import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBankStore } from '@/store/useBankStore';
import { 
  ShieldCheck, 
  Upload, 
  User, 
  Camera, 
  FileText, 
  CheckCircle2, 
  Info,
  Clock
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const KYCVerification = () => {
  const currentUser = useBankStore((state) => state.currentUser);
  const updateUser = useBankStore((state) => state.updateUser);
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);

  if (!currentUser) return null;

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      if (step < 3) {
        setStep(step + 1);
        toast.success(`Step ${step} completed`);
      } else {
        updateUser(currentUser.id, { kycStatus: 'Pending' });
        toast.success('KYC documents submitted for review');
      }
    }, 1500);
  };

  const steps = [
    { title: 'Identity Verification', icon: <User />, desc: 'Upload a valid Government Issued ID' },
    { title: 'Liveness Check', icon: <Camera />, desc: 'Take a clear selfie to confirm identity' },
    { title: 'Proof of Address', icon: <FileText />, desc: 'Upload a utility bill or bank statement' },
  ];

  if (currentUser.kycStatus === 'Approved') {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
          <CheckCircle2 className="text-white w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-navy mb-2">Account Verified</h1>
        <p className="text-navy/60 mb-8">Your identity has been successfully verified. You now have full access to all banking features.</p>
        <div className="bg-navy/[0.02] border border-navy/5 rounded-2xl p-6 text-left space-y-4">
          <div className="flex justify-between">
            <span className="text-navy/40 text-sm">Verification Level</span>
            <span className="text-navy font-bold">Tier 3 (Global)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy/40 text-sm">Daily Limit</span>
            <span className="text-navy font-bold">₦50,000,000.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy/40 text-sm">Verified On</span>
            <span className="text-navy font-bold">{new Date(currentUser.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser.kycStatus === 'Pending') {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="text-gold w-12 h-12 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-navy mb-2">Verification Pending</h1>
        <p className="text-navy/60 mb-8">Your documents are currently being reviewed by our compliance team. This typically takes 24-48 hours.</p>
        <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6 flex gap-4 text-left">
          <Info className="text-gold shrink-0" />
          <p className="text-sm text-navy/70 leading-relaxed">
            While your account is in pending status, you can still receive funds but withdrawal limits are capped at ₦50,000 per day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-navy">Identity Verification (KYC)</h1>
        <p className="text-navy/60">Complete your profile to unlock higher limits and international transfers.</p>
      </div>

      <div className="flex gap-4 mb-12">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 space-y-2">
            <div className={`h-1.5 rounded-full ${i + 1 < step ? 'bg-green-500' : i + 1 === step ? 'bg-gold' : 'bg-navy/5'}`} />
            <p className={`text-[10px] font-black uppercase tracking-widest ${i + 1 === step ? 'text-navy' : 'text-navy/20'}`}>
              Step {i + 1}
            </p>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white border border-navy/5 rounded-3xl p-8 lg:p-12 shadow-sm text-center"
        >
          <div className="w-20 h-20 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
            {steps[step-1].icon}
          </div>
          <h2 className="text-2xl font-bold text-navy mb-2">{steps[step-1].title}</h2>
          <p className="text-navy/60 mb-10 max-w-sm mx-auto">{steps[step-1].desc}</p>

          <div className="border-2 border-dashed border-navy/10 rounded-2xl p-12 mb-10 group hover:border-gold/50 transition-colors cursor-pointer bg-navy/[0.01]">
            <Upload className="mx-auto mb-4 text-navy/20 group-hover:text-gold transition-colors" size={40} />
            <p className="text-sm font-bold text-navy mb-1">Click to upload or drag & drop</p>
            <p className="text-xs text-navy/40">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
          </div>

          <div className="flex gap-4 max-w-sm mx-auto">
            {step > 1 && (
              <Button variant="outline" className="flex-1 h-12" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            <Button 
              className="flex-1 h-12 bg-navy text-white hover:bg-navy/90 font-bold" 
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Continue'}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default KYCVerification;
