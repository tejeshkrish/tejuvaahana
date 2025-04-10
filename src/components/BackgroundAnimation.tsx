
import { useEffect, useState } from 'react';

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
      <div className="absolute inset-0 bg-white opacity-90"></div>
    </div>
  );
};

export default BackgroundAnimation;
