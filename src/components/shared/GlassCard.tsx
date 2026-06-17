import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glassmorphism rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:bg-white/15",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
