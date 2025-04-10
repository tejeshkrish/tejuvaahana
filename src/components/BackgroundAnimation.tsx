
import { useEffect, useState } from 'react';

const CHARACTERS = [
  { name: 'Harry Potter', position: 'top-10 left-[10%]', delay: '0s', duration: '15s' },
  { name: 'Jon Snow', position: 'top-20 left-[30%]', delay: '2s', duration: '18s' },
  { name: 'Daenerys Targaryen', position: 'bottom-10 left-[20%]', delay: '1s', duration: '20s' },
  { name: 'Walter White', position: 'top-[30%] right-[15%]', delay: '3s', duration: '17s' },
  { name: 'Stranger Things', position: 'bottom-[20%] right-[25%]', delay: '0.5s', duration: '19s' },
  { name: 'Eleven', position: 'top-[40%] left-[5%]', delay: '2.5s', duration: '16s' },
  { name: 'The Witcher', position: 'bottom-[30%] left-[40%]', delay: '1.5s', duration: '21s' },
  { name: 'Sherlock Holmes', position: 'top-[15%] right-[35%]', delay: '3.5s', duration: '14s' },
  { name: 'Arya Stark', position: 'bottom-[15%] right-[10%]', delay: '2.8s', duration: '16s' },
  { name: 'Doctor Who', position: 'top-[25%] left-[25%]', delay: '1.8s', duration: '18s' },
  { name: 'The Office', position: 'bottom-[25%] left-[15%]', delay: '3.2s', duration: '15s' },
  { name: 'Breaking Bad', position: 'top-[35%] right-[5%]', delay: '0.2s', duration: '19s' },
];

interface BackgroundAnimationProps {
  isActive: boolean;
}

const BackgroundAnimation = ({ isActive }: BackgroundAnimationProps) => {
  const [fade, setFade] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      // Reset fade state when animation becomes active
      setFade(false);
      
      // After 8 seconds, start fading out the animation
      const timer = setTimeout(() => {
        setFade(true);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive]);
  
  if (!isActive) return null;
  
  return (
    <div className={`fixed inset-0 z-0 overflow-hidden ${fade ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 opacity-90"></div>
      
      {CHARACTERS.map((character, index) => (
        <div 
          key={index}
          className={`absolute ${character.position} text-white text-xl md:text-2xl font-garamond opacity-0 animate-text-focus-in`}
          style={{ 
            animationDelay: character.delay,
            animationDuration: character.duration,
            animationFillMode: 'forwards',
            animation: `text-focus-in ${character.duration} ease-out forwards, floating 3s ease-in-out infinite, move-across 20s linear infinite`
          }}
        >
          {character.name}
        </div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
