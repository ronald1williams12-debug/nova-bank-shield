import { Link } from 'react-router-dom';
import { Logo } from '../shared/Logo';
import { Globe, Mail, Phone, MapPin, Share2, MessageSquare, Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Logo className="brightness-0 invert" />
            <p className="text-white/60 max-w-xs">
              NovaTrust Bank is a leading international financial institution providing world-class digital banking services to customers across the globe.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                <Share2 size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                <Shield size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-6">Banking Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Savings Accounts</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Current Accounts</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Fixed Deposits</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Business Banking</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Investment Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-6">Legal & Policy</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Security Information</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Anti-Fraud Awareness</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold mt-1 shrink-0" size={18} />
                <span className="text-white/60">123 Wall Street, New York, NY, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold shrink-0" size={18} />
                <span className="text-white/60">+1 (862) 450-8972</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold shrink-0" size={18} />
                <span className="text-white/60">support@novatrust.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm">
            © {currentYear} NovaTrust Bank PLC. All Rights Reserved. Licensed by the Federal Deposit Insurance Corporation (FDIC).
          </p>
          <div className="flex gap-6">
            <Link to="/admin/login" className="text-white/20 hover:text-white transition-colors text-xs uppercase tracking-widest">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
