import { motion } from 'framer-motion';

const stats = [
  { label: 'Active Customers', value: '1M+', suffix: '' },
  { label: 'Total Assets', value: '15', suffix: 'B+' },
  { label: 'Countries Reached', value: '45', suffix: '+' },
  { label: 'Satisfaction Rate', value: '99', suffix: '%' },
];

const Stats = () => {
  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-6xl font-bold text-gold mb-2 tabular-nums">
                {stat.value}
                <span className="text-2xl md:text-4xl text-white/40 ml-1 font-normal italic">{stat.suffix}</span>
              </div>
              <div className="text-sm md:text-base font-medium text-white/60 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
