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
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#121212] select-none cursor-pointer transition-opacity duration-400 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Ticketmaster loading screen"
    >
      {/* Native iOS Top Status Bar simulation */}
      <div className="w-full pt-3 px-7 flex items-center justify-between text-white/90 text-sm font-semibold tracking-tight">
        <span>10:54</span>
        <div className="flex items-center gap-1.5">
          {/* Signal bars */}
          <div className="flex items-end gap-[2px] h-3">
            <span className="w-[3px] h-1.5 bg-white rounded-[0.5px]"></span>
            <span className="w-[3px] h-2 bg-white rounded-[0.5px]"></span>
            <span className="w-[3px] h-2.5 bg-white rounded-[0.5px]"></span>
            <span className="w-[3px] h-3 bg-white rounded-[0.5px]"></span>
          </div>
          <span className="text-[11px] font-bold tracking-wider ml-0.5">LTE</span>
          {/* Battery pill */}
          <div className="flex items-center ml-1">
            <div className="w-6 h-3 border border-white/80 rounded-[4px] p-[1.5px] flex items-center">
              <div className="w-[35%] h-full bg-white rounded-[1.5px]"></div>
            </div>
            <div className="w-[2px] h-1 bg-white/80 rounded-r-sm"></div>
            <span className="text-[10px] ml-1 font-bold">35</span>
          </div>
        </div>
      </div>

      {/* Center Ticketmaster Classic Wordmark Logo matching IMG_6272 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="animate-[scaleUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white font-sans drop-shadow-md select-none">
            ticketmaster
          </h1>
        </div>
      </div>

      {/* Bottom iOS Home Indicator Bar */}
      <div className="w-full pb-3 flex flex-col items-center justify-center">
        <div className="w-36 h-1 bg-white/40 rounded-full mb-1"></div>
      </div>
    </div>
  );
};
