import { ShieldCheck, Lock, Award, Briefcase, Globe } from 'lucide-react';

const partners = [
  'VISA', 'Mastercard', 'SWIFT', 'Central Bank', 'Forbes Finance'
];

const TrustBadges = () => {
  return (
    <section className="py-16 border-t border-navy/5 bg-navy/[0.01]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          {partners.map((partner) => (
            <span key={partner} className="text-xl md:text-2xl font-black text-navy tracking-tighter">
              {partner}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center mb-4">
              <ShieldCheck className="text-gold w-6 h-6" />
            </div>
            <h5 className="font-bold text-navy text-sm uppercase tracking-wider mb-2">NDIC Insured</h5>
            <p className="text-navy/50 text-xs">Your deposits are protected and secured up to ₦500,000 per account.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center mb-4">
              <Lock className="text-gold w-6 h-6" />
            </div>
            <h5 className="font-bold text-navy text-sm uppercase tracking-wider mb-2">256-bit Encryption</h5>
            <p className="text-navy/50 text-xs">Banking-grade security protocols for every transaction you make.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center mb-4">
              <Award className="text-gold w-6 h-6" />
            </div>
            <h5 className="font-bold text-navy text-sm uppercase tracking-wider mb-2">Multi-Award Winning</h5>
            <p className="text-navy/50 text-xs">Recognized globally for innovation in digital finance and security.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center mb-4">
              <Globe className="text-gold w-6 h-6" />
            </div>
            <h5 className="font-bold text-navy text-sm uppercase tracking-wider mb-2">Global Operations</h5>
            <p className="text-navy/50 text-xs">Seamlessly banking in over 45 countries with multi-currency support.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
