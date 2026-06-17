import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBankStore } from '@/store/useBankStore';
import { PiggyBank, Plus, Target, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { GlassCard } from '../shared/GlassCard';
import { Progress } from '../ui/progress';

const SavingsGoals = () => {
  const [goals, setGoals] = useState([
    { name: 'New Home', target: 50000000, saved: 12500000, category: 'Property' },
    { name: 'Family Vacation', target: 2000000, saved: 1800000, category: 'Travel' },
    { name: 'Emergency Fund', target: 1000000, saved: 450000, category: 'Security' },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Savings Goals</h1>
          <p className="text-navy/60">Track your progress towards your financial milestones.</p>
        </div>
        <Button className="bg-navy text-white hover:bg-navy/90 h-12 px-6 rounded-xl">
          <Plus className="mr-2" size={20} />
          Create New Goal
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {goals.map((goal, index) => {
          const progress = (goal.saved / goal.target) * 100;
          return (
            <motion.div
              key={goal.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full border-navy/5 bg-white group hover:border-gold/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                    <Target size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-navy/40 px-2 py-1 bg-navy/5 rounded">
                    {goal.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-gold transition-colors">
                  {goal.name}
                </h3>
                <p className="text-sm text-navy/40 mb-6">
                  Target: <span className="text-navy font-bold">{formatCurrency(goal.target)}</span>
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-navy/60">{Math.round(progress)}% Complete</span>
                    <span className="text-navy">{formatCurrency(goal.saved)}</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-navy/5" />
                </div>

                <Button variant="outline" className="w-full h-11 border-navy/10 text-navy hover:bg-navy hover:text-white transition-all">
                  Manage Fund
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </GlassCard>
            </motion.div>
          );
        })}

        <button className="border-2 border-dashed border-navy/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-navy/40 hover:text-gold hover:border-gold/30 transition-all bg-transparent group">
          <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
            <Plus size={32} />
          </div>
          <span className="font-bold">Add Savings Target</span>
        </button>
      </div>

      <div className="mt-12 p-8 bg-navy rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-gold" />
              <span className="text-gold font-bold uppercase tracking-widest text-xs">Recommended</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Auto-Save Feature</h2>
            <p className="text-white/60 text-sm">
              Enable round-ups and recurring transfers to hit your goals 3x faster without thinking about it.
            </p>
          </div>
          <Button className="bg-gold text-navy hover:bg-gold/90 h-12 px-8 font-bold">
            Enable Auto-Save
          </Button>
        </div>
        <PiggyBank className="absolute bottom-[-40px] right-[-20px] w-64 h-64 text-white/5 -rotate-12" />
      </div>
    </div>
  );
};

export default SavingsGoals;
