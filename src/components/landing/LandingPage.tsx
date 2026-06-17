import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Stats from './Stats';
import Testimonials from './Testimonials';
import TrustBadges from './TrustBadges';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Testimonials />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
