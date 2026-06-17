import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBankStore } from '@/store/useBankStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Logo } from '../shared/Logo';
import { GlassCard } from '../shared/GlassCard';
import { ShieldCheck, Mail, Lock, ArrowLeft, Info, Fingerprint } from 'lucide-react';

interface LoginPageProps {
  role: 'User' | 'Admin';
}

const LoginPage = ({ role }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useBankStore((state) => state.login);
  const users = useBankStore((state) => state.users);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      login(email);
      const user = useBankStore.getState().currentUser;
      if (user) {
        navigate(role === 'Admin' ? '/admin' : '/dashboard');
      }
      setLoading(false);
    }, 1000);
  };

  const demoEmail = role === 'Admin' ? 'admin@novatrust.com' : users[1]?.email || 'demo@user.com';

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-8">
            <Logo className="brightness-0 invert scale-125" />
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">
            {role === 'Admin' ? 'Staff Portal Login' : 'Internet Banking Login'}
          </h1>
          <p className="text-white/60 text-sm">
            Please enter your credentials to access your account securely.
          </p>
        </div>

        <GlassCard className="border-white/10 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:ring-gold/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white/80">Password</Label>
                <a href="#" className="text-xs text-gold hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:ring-gold/50"
                  required
                  defaultValue="password"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gold text-navy hover:bg-gold/90 h-12 font-bold text-lg transition-transform active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-navy px-2 text-white/40">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline"
              className="w-full h-12 border-white/10 text-white hover:bg-white/5 hover:text-gold transition-all md:hidden"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  login(demoEmail);
                  const user = useBankStore.getState().currentUser;
                  if (user) {
                    navigate(role === 'Admin' ? '/admin' : '/dashboard');
                  }
                  setLoading(false);
                }, 1000);
              }}
              disabled={loading}
            >
              <Fingerprint className="mr-2" size={20} />
              Biometric Login
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <div className="bg-white/5 rounded-lg p-3 inline-flex items-center gap-2 text-xs text-white/60 mb-4">
              <Info size={14} className="text-gold" />
              <span>Demo Email: <strong>{demoEmail}</strong></span>
              <button 
                onClick={() => setEmail(demoEmail)}
                className="text-gold hover:underline font-bold ml-1"
              >
                Use
              </button>
            </div>
            
            <p className="text-white/40 text-xs flex items-center justify-center gap-2">
              <ShieldCheck size={14} />
              Secured by 256-bit SSL encryption
            </p>
          </div>
        </GlassCard>

        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 text-white/40 hover:text-white transition-colors mt-8 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default LoginPage;
