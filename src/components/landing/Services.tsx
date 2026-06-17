import { CreditCard, Landmark, LineChart, Briefcase, Shield } from 'lucide-react';
import { GlassCard } from '../shared/GlassCard';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Landmark className="w-8 h-8 text-gold" />,
    title: 'Personal Banking',
    description: 'High-yield savings and current accounts tailored for your daily financial needs.',
    features: ['Instant Transfers', 'Zero Monthly Fees', 'Global Access'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b4f9a3ba-75bf-44bc-aa29-d13b3bad70fb/hero-bank-interior-2d02fd46-1781660279563.webp'
  },
  {
    icon: <Briefcase className="w-8 h-8 text-gold" />,
    title: 'Business Accounts',
    description: 'Scalable solutions for startups and large enterprises to manage global operations.',
    features: ['Bulk Payments', 'Merchant Services', 'Business Loans'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b4f9a3ba-75bf-44bc-aa29-d13b3bad70fb/business-banking-eb97508b-1781660280653.webp'
  },
  {
    icon: <LineChart className="w-8 h-8 text-gold" />,
    title: 'Wealth & Investment',
    description: 'Expert-managed portfolios and diverse investment plans for wealth creation.',
    features: ['Portfolio Tracking', 'Profit Analytics', 'Fixed Deposits'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b4f9a3ba-75bf-44bc-aa29-d13b3bad70fb/mobile-banking-lifestyle-54455b3c-1781660280087.webp'
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-navy/[0.02]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4">Our Services</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-navy mb-6">Banking Solutions Crafted for Excellence</h3>
          <p className="text-navy/60 text-lg">
            From everyday spending to complex international trade, NovaTrust provides the tools you need to excel in the global financial landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full border-navy/5 flex flex-col group">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-navy flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-bold text-navy mb-3">{service.title}</h4>
                <p className="text-navy/70 mb-6 flex-grow">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-navy/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto overflow-hidden rounded-xl h-48 border border-navy/10 relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
