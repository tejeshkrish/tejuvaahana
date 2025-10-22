import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundAnimation from './BackgroundAnimation';
import profilePicture from '@/assets/profile-picture.jpeg';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setIsLoaded(true);

    // Set a timeout to hide the pulse effect after 3 seconds
    const pulseTimer = setTimeout(() => {
      setShowPulse(false);
    }, 3000);

    // Set a timeout to hide the background animation after 10 seconds
    const animationTimer = setTimeout(() => {
      setShowAnimation(false);
    }, 10000);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(animationTimer);
    };
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
      <BackgroundAnimation isActive={showAnimation} />

      <div className="section-container grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div
          className={`space-y-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="font-garamond font-normal relative overflow-hidden pb-2">
            <span className="block">Tejesh Krishnammagari</span>
          </h1>
          <p
            className={`text-lg md:text-xl font-garamond text-muted-foreground transition-all duration-1000 delay-300 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="animate-text-focus-in inline-block">
              IP Enablement Engineer | Part-time Storyteller at Intel
            </span>
          </p>
          <div
            className={`flex flex-col sm:flex-row sm:flex-wrap gap-4 pt-4 transition-all duration-1000 delay-500 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:translate-y-[-3px] rounded-md animate-bounce-in"
              style={{ animationDelay: '0.7s' }}
            >
              Get In Touch
            </a>
            <Link
              to="/resume-builder"
              className="inline-flex items-center justify-center px-6 py-3 border border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] rounded-md animate-bounce-in"
              style={{ animationDelay: '0.9s' }}
            >
              Create Resume
            </Link>
          </div>
        </div>
        <div
          className={`flex justify-center md:justify-end transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-transparent opacity-50 ${
                showPulse
                  ? 'animate-pulse'
                  : 'opacity-0 transition-opacity duration-500'
              }`}
            ></div>
            <div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl transition-transform duration-500 hover:scale-105 animate-bounce-in"
              style={{ animationDelay: '1.2s' }}
            >
              <img
                src={profilePicture}
                alt="Tejesh Krishnammagari"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors animate-bounce z-10"
        aria-label="Scroll to About section"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <ArrowDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
