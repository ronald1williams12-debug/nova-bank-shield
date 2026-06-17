import { Shield, TrendingUp } from 'lucide-react';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        <Shield className="w-10 h-10 text-gold fill-gold/10" />
        <TrendingUp className="absolute w-5 h-5 text-navy top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold tracking-tight text-navy">
          Nova<span className="text-gold">Trust</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-navy/60">
          Bank
        </span>
      </div>
    </div>
  );
};
