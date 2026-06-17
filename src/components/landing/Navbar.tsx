import { Link } from 'react-router-dom';
import { Logo } from '../shared/Logo';
import { Button } from '../ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Personal', href: '#' },
    { name: 'Business', href: '#' },
    { name: 'Investment', href: '#' },
    { name: 'Loans', href: '#' },
    { name: 'Support', href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-navy/5">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-navy/70 hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-navy">Login</Button>
          </Link>
          <Link to="/login">
            <Button className="bg-navy text-white hover:bg-navy/90">Open Account</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-navy" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-navy/5 py-4 px-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-navy font-medium py-2">
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t border-navy/5">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full">Login</Button>
            </Link>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-navy">Open Account</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
