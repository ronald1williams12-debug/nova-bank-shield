import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ChevronRight, ShieldCheck, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent rounded-bl-[100px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-navy/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold tracking-wider uppercase mb-6">
              <ShieldCheck size={14} />
              Securing Your Future Globally
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy leading-[1.1] mb-6">
              Banking <span className="text-gold italic">Beyond</span> Boundaries
            </h1>
            <p className="text-lg md:text-xl text-navy/70 mb-10 max-w-xl mx-auto md:mx-0">
              Experience a world-class digital banking platform designed for the modern international traveler and business professional. Secure, seamless, and sophisticated.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-navy text-white hover:bg-navy/90 text-md px-8 h-14 rounded-full group">
                  Open an Account
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-navy/20 text-navy hover:bg-navy/5 text-md px-8 h-14 rounded-full">
                  Internet Banking
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center md:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2">
                <Globe size={20} className="text-navy" />
                <span className="text-sm font-semibold text-navy uppercase tracking-widest">Global Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-navy" />
                <span className="text-sm font-semibold text-navy uppercase tracking-widest">Instant Pay</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-navy/10">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/b4f9a3ba-75bf-44bc-aa29-d13b3bad70fb/hero-bank-building-7cb35154-1781660280051.webp" 
                alt="NovaTrust Bank Headquarters" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Glassmorphism overlays */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 md:-right-12 z-20 glassmorphism p-6 rounded-2xl max-w-[200px] hidden sm:block"
            >
              <p className="text-navy/60 text-xs font-bold uppercase mb-1">Live Portfolio</p>
              <p className="text-navy text-xl font-bold italic text-gold">₦2.4B+</p>
              <div className="w-full h-1 bg-navy/10 rounded-full mt-2 overflow-hidden">
                <div className="w-2/3 h-full bg-gold" />
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-6 md:-left-12 z-20 glassmorphism p-6 rounded-2xl max-w-[220px] hidden sm:block"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-navy font-bold text-sm leading-none">Secure Login</p>
                  <p className="text-navy/50 text-[10px]">Verified Transaction</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
