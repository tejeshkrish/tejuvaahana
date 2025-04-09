
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative">
      <div className="section-container grid md:grid-cols-2 gap-12 items-center">
        <div className={`space-y-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="font-garamond font-normal relative overflow-hidden pb-2 animate-tracking-in-expand">
            <span className="block">Tejesh Krishnammagari</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left transform transition-transform duration-1000 scale-x-100"></span>
          </h1>
          <p className={`text-xl md:text-2xl font-garamond text-muted-foreground transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="animate-text-focus-in inline-block">Software Application Development Engineer</span>
            <br />
            <span className="animate-text-focus-in inline-block" style={{ animationDelay: '0.4s' }}>Full Stack Development</span>
          </p>
          <div className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:translate-y-[-3px] rounded-md animate-bounce-in"
              style={{ animationDelay: '0.7s' }}
            >
              Get In Touch
            </a>
            <a 
              href="#experience" 
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary hover:bg-primary/5 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] rounded-md animate-bounce-in"
              style={{ animationDelay: '0.9s' }}
            >
              View Experience
            </a>
          </div>
        </div>
        <div className={`flex justify-center md:justify-end transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-transparent animate-rotate-center opacity-70"></div>
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl transition-transform duration-500 hover:scale-105 animate-bounce-in" style={{ animationDelay: '1.2s' }}>
              <img 
                src="/lovable-uploads/02fbb8f6-1abc-4070-9228-1a4ac756417b.png" 
                alt="Tejesh Krishnammagari" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-30 scale-110"></div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        aria-label="Scroll to About section"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <ArrowDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
