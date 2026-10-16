import React, { useEffect, useState } from 'react';

interface MobileSplashScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

export const MobileSplashScreen: React.FC<MobileSplashScreenProps> = ({ 
  onComplete, 
  durationMs = 1500 
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, durationMs - 400);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [durationMs, onComplete]);

  return (
    <div 
      onClick={() => onComplete()}
      className={`fixed inset-0 z-[100] w-full h-full min-h-screen min-h-dvh flex flex-col items-center justify-center bg-[#121212] select-none cursor-pointer transition-opacity duration-400 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Ticketmaster loading screen"
    >
      {/* Center Ticketmaster Classic Wordmark Logo */}
      <div className="flex flex-col items-center justify-center px-6">
        <div className="animate-[scaleUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white font-sans drop-shadow-md select-none">
            ticketmaster
          </h1>
        </div>
      </div>
    </div>
  );
};
