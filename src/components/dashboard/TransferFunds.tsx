import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBankStore } from '@/store/useBankStore';
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Printer, 
  ArrowLeft,
  Banknote,
  Send,
  Building
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

const TransferFunds = () => {
  const currentUser = useBankStore((state) => state.currentUser);
  const addTransaction = useBankStore((state) => state.addTransaction);
  const users = useBankStore((state) => state.users);

  const [step, setStep] = useState(1);
  const [transferType, setTransferType] = useState<'Internal' | 'External' | 'Scheduled'>('Internal');
  const [formData, setFormData] = useState({
    recipientAccount: '',
    recipientName: '',
    amount: '',
    description: '',
    bankName: 'NovaTrust Bank',
  });

  if (!currentUser) return null;

  const handleRecipientBlur = () => {
    if (transferType === 'Internal' && formData.recipientAccount.length === 10) {
      const recipient = users.find(u => u.accountNumber === formData.recipientAccount);
      if (recipient) {
        setFormData(prev => ({ ...prev, recipientName: `${recipient.firstName} ${recipient.lastName}` }));
        toast.success('Recipient details verified');
      } else {
        toast.error('NovaTrust account not found');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(formData.amount);
    
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Invalid amount');
      return;
    }

    if (amountNum > currentUser.balance) {
      toast.error('Insufficient balance');
      return;
    }

    setStep(2);
  };

  const confirmTransfer = () => {
    const amountNum = parseFloat(formData.amount);
    
    // Debit User
    addTransaction({
      userId: currentUser.id,
      type: 'Debit',
      amount: amountNum,
      description: `Transfer to ${formData.recipientName} (${formData.recipientAccount})`,
      category: 'Transfer',
      recipientName: formData.recipientName,
      recipientAccount: formData.recipientAccount,
      bankName: formData.bankName
    });

    // If internal, credit recipient
    if (transferType === 'Internal') {
      const recipient = users.find(u => u.accountNumber === formData.recipientAccount);
      if (recipient) {
        addTransaction({
          userId: recipient.id,
          type: 'Credit',
          amount: amountNum,
          description: `Transfer from ${currentUser.firstName} ${currentUser.lastName}`,
          category: 'Transfer',
        });
      }
    }

    setStep(3);
    toast.success('Transfer successful!');
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      recipientAccount: '',
      recipientName: '',
      amount: '',
      description: '',
      bankName: 'NovaTrust Bank',
    });
  };

  const formatCurrency = (amount: number | string) => {
    const val = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(val);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Funds Transfer</h1>
        <p className="text-navy/60">Move money between your accounts or to other banks.</p>
      </div>

      {/* Tabs */}
      {step === 1 && (
        <div className="flex bg-navy/5 p-1 rounded-xl mb-8">
          {(['Internal', 'External', 'Scheduled'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTransferType(type)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${
                transferType === type ? 'bg-white text-navy shadow-sm' : 'text-navy/40 hover:text-navy/60'
              }`}
            >
              {type === 'Internal' ? 'To NovaTrust' : type === 'External' ? 'Other Banks' : 'Scheduled'}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl p-8 border border-navy/5 shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Recipient Account Number</Label>
                  <div className="relative">
                    <Input
                      placeholder="1234567890"
                      className="h-12 border-navy/10 focus:ring-gold/50"
                      value={formData.recipientAccount}
                      onChange={(e) => setFormData(prev => ({ ...prev, recipientAccount: e.target.value }))}
                      onBlur={handleRecipientBlur}
                      maxLength={10}
                      required
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/20 w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Recipient Name</Label>
                  <Input
                    placeholder="Auto-filled for NovaTrust accounts"
                    className="h-12 border-navy/10 bg-navy/[0.02]"
                    value={formData.recipientName}
                    readOnly={transferType === 'Internal'}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {transferType === 'External' && (
                <div className="space-y-2">
                  <Label>Select Bank</Label>
                  <select 
                    className="w-full h-12 rounded-lg border border-navy/10 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50"
                    value={formData.bankName}
                    onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                  >
                    <option>Access Bank</option>
                    <option>Zenith Bank</option>
                    <option>GTBank</option>
                    <option>UBA</option>
                    <option>First Bank</option>
                    <option>Stanbic IBTC</option>
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Amount (₦)</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-navy/40">₦</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="h-14 border-navy/10 pl-10 text-xl font-bold focus:ring-gold/50"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    required
                  />
                </div>
                <p className="text-[10px] text-navy/40 flex justify-between">
                  <span>Balance: {formatCurrency(currentUser.balance)}</span>
                  <span>Daily Limit: ₦5,000,000.00</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label>Transaction Description (Optional)</Label>
                <Input
                  placeholder="e.g. Rent Payment"
                  className="h-12 border-navy/10 focus:ring-gold/50"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <Button type="submit" className="w-full h-14 bg-navy text-white hover:bg-navy/90 text-lg font-bold rounded-xl">
                Review Transfer
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl p-8 border border-navy/5 shadow-sm text-center"
          >
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-gold w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-2">Review Transaction</h2>
            <p className="text-navy/60 mb-8 text-sm">Please verify the recipient details before confirming the transfer.</p>

            <div className="bg-navy/[0.02] rounded-2xl p-6 space-y-4 text-left mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-navy/5">
                <span className="text-navy/40 text-sm">Recipient</span>
                <span className="text-navy font-bold">{formData.recipientName}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-navy/5">
                <span className="text-navy/40 text-sm">Bank</span>
                <span className="text-navy font-bold">{formData.bankName}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-navy/5">
                <span className="text-navy/40 text-sm">Account Number</span>
                <span className="text-navy font-bold font-mono">{formData.recipientAccount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-navy/40 text-sm">Transfer Amount</span>
                <span className="text-gold text-xl font-black">{formatCurrency(formData.amount)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-12 border-navy/10 text-navy" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Go Back
              </Button>
              <Button className="flex-1 h-12 bg-navy text-white hover:bg-navy/90" onClick={confirmTransfer}>
                Confirm & Send
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 border border-navy/5 shadow-2xl text-center relative overflow-hidden"
          >
            {/* Confetti decoration */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-gold via-navy to-gold" />
            
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
              <CheckCircle2 className="text-white w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-navy mb-2">Transfer Successful!</h2>
            <p className="text-navy/60 mb-10">Your funds have been sent successfully to {formData.recipientName}.</p>

            <div className="max-w-sm mx-auto bg-white border border-dashed border-navy/20 rounded-2xl p-6 mb-10">
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gold rounded flex items-center justify-center text-[10px] text-navy font-bold">N</div>
                  <span className="font-bold text-navy tracking-tight text-sm">NovaTrust Bank Official Receipt</span>
                </div>
              </div>
              <div className="space-y-3 text-left text-xs">
                <div className="flex justify-between">
                  <span className="text-navy/40 uppercase tracking-widest">Amount</span>
                  <span className="text-navy font-bold">{formatCurrency(formData.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/40 uppercase tracking-widest">Date</span>
                  <span className="text-navy font-bold">{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/40 uppercase tracking-widest">Reference</span>
                  <span className="text-navy font-bold font-mono">NTB-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="pt-3 mt-3 border-t border-navy/5">
                  <div className="flex justify-between mb-1">
                    <span className="text-navy/40 uppercase tracking-widest">Recipient</span>
                    <span className="text-navy font-bold">{formData.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy/40 uppercase tracking-widest">Bank</span>
                    <span className="text-navy font-bold">{formData.bankName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1 h-12 border-navy/10 text-navy" onClick={() => window.print()}>
                <Printer className="mr-2 w-4 h-4" />
                Print Receipt
              </Button>
              <Button variant="outline" className="flex-1 h-12 border-navy/10 text-navy">
                <Download className="mr-2 w-4 h-4" />
                Download PDF
              </Button>
              <Button className="flex-1 h-12 bg-navy text-white hover:bg-navy/90" onClick={resetForm}>
                Make Another
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransferFunds;
