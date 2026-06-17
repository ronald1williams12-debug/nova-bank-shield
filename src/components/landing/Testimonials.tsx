import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Oluwaseun Adeyemi',
    role: 'Tech Entrepreneur',
    text: 'NovaTrust has completely changed how I manage my international business finances. The interface is premium and the transfers are lightning fast.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Seun'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Venture Capitalist',
    text: 'A truly world-class banking experience. Their investment tools provide the depth and clarity I need for my portfolio.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    name: 'Chinedu Okoro',
    role: 'Corporate Director',
    text: 'Security is my top priority, and NovaTrust delivers. The multi-factor authentication and fraud alerts give me peace of mind.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chinedu'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4">Client Feedback</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-navy">Trusted by Industry Leaders</h3>
          </div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold text-gold" />
            ))}
            <span className="ml-2 font-bold text-navy text-lg">4.9/5 Rating</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-navy/[0.03] border border-navy/5 relative"
            >
              <Quote className="absolute top-6 right-8 text-gold/20 w-12 h-12" />
              <p className="text-navy/80 text-lg italic mb-8 relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-gold/20" />
                <div>
                  <h4 className="font-bold text-navy">{t.name}</h4>
                  <p className="text-navy/50 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
