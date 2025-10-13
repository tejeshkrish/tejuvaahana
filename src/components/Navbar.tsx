
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolledDown = prevScrollPos < currentScrollPos;
      const isScrolledUp = prevScrollPos > currentScrollPos;
      const isAtTop = currentScrollPos < 50;
      
      // Show navbar when at top, scrolling up, or at initial load
      setVisible(isAtTop || isScrolledUp);
      setPrevScrollPos(currentScrollPos);
      setScrolled(currentScrollPos > 50);
      
      // Determine active section
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', isSection: true },
    { id: 'about', label: 'About', isSection: true },
    { id: 'experience', label: 'Experience', isSection: true },
    { id: 'skills', label: 'Skills', isSection: true },
    { id: 'education', label: 'Education', isSection: true },
    { id: 'contact', label: 'Contact', isSection: true },
    { id: 'travel-blogs', label: 'Travel', isSection: false, path: '/travel-blogs' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isSection) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(item.id), 100);
      } else {
        scrollToSection(item.id);
      }
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
      scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      visible ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="section-container flex justify-between items-center">
        <a href="#home" className="text-xl md:text-2xl font-normal transition-transform hover:scale-105">
          Tejesh K
        </a>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    'nav-link relative overflow-hidden',
                    (item.isSection && activeSection === item.id) || (!item.isSection && location.pathname === item.path)
                      ? 'active text-primary font-medium' 
                      : ''
                  )}
                >
                  {item.label}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300",
                    (item.isSection && activeSection === item.id) || (!item.isSection && location.pathname === item.path)
                      ? "scale-x-100" 
                      : "scale-x-0 origin-left"
                  )}></span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2 rounded-md hover:bg-secondary/60 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[385px]">
            <nav className="mt-12">
              <ul className="space-y-6">
                {navItems.map((item) => (
                  <li key={item.id} className="border-b border-border/50 pb-2">
                    <button
                      onClick={() => {
                        handleNavClick(item);
                        document.querySelector('[data-state="open"]')?.dispatchEvent(
                          new MouseEvent('click', { bubbles: true })
                        );
                      }}
                      className={cn(
                        'text-xl hover:text-primary transition-colors w-full text-left py-2',
                        (item.isSection && activeSection === item.id) || (!item.isSection && location.pathname === item.path)
                          ? 'text-primary font-medium' 
                          : ''
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
