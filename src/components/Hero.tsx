
import { ArrowDown } from 'lucide-react';

const Hero = () => {
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
        <div className="space-y-6 animate-fade-in">
          <h1 className="font-garamond font-normal">
            Tejesh Krishnammagari
          </h1>
          <p className="text-xl md:text-2xl font-garamond text-muted-foreground">
            Software Application Development Engineer
            <br />
            Full Stack Development
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get In Touch
            </a>
            <a 
              href="#experience" 
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary hover:bg-primary/5 transition-colors"
            >
              View Experience
            </a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="/lovable-uploads/02fbb8f6-1abc-4070-9228-1a4ac756417b.png" 
                alt="Tejesh Krishnammagari" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white px-6 py-2 shadow-md">
              <p className="text-sm text-muted-foreground">Intel Corporation</p>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to About section"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <ArrowDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
