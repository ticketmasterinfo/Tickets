import React from 'react';
import { Smartphone, Download, Monitor, Play, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../../utils/usePWAInstall';

interface MobileAppHeaderBannerProps {
  viewMode: 'mobile' | 'desktop';
  onToggleViewMode: (mode: 'mobile' | 'desktop') => void;
  onOpenInstallModal: () => void;
  onRelaunchSplash: () => void;
}

export const MobileAppHeaderBanner: React.FC<MobileAppHeaderBannerProps> = ({
  viewMode,
  onToggleViewMode,
  onOpenInstallModal,
  onRelaunchSplash
}) => {
  const { isInstalled, isIOS, isAndroid } = usePWAInstall();

  return (
    <aside 
      aria-label="Download and preview options"
      className="bg-[#0f1115] border-b border-[#232730] px-3 sm:px-6 py-2 text-white text-xs select-none shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: App Identity & Download Status */}
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-lg bg-blue-600 flex items-center justify-center font-black italic text-xs text-white">
            t
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-white/90">
            <span>Ticketmaster Mobile Phone App</span>
            <span className="hidden sm:inline-block text-[10px] bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">
              iOS & Android
            </span>
            {isInstalled && (
              <span className="flex items-center gap-1 text-[10px] bg-green-950 text-green-400 px-1.5 py-0.5 rounded border border-green-500/30 font-bold">
                <CheckCircle2 className="w-3 h-3" /> Installed
              </span>
            )}
          </div>
        </div>

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Re-play Splash Screen */}
          <button
            onClick={onRelaunchSplash}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition font-medium text-[11px]"
            title="Preview how the app opens"
          >
            <Play className="w-3 h-3 text-blue-400" />
            <span className="hidden md:inline">Open Splash Load</span>
            <span className="md:hidden">Splash</span>
          </button>

          {/* Toggle Mobile Phone vs Desktop Layout */}
          <div className="bg-[#1c1f26] rounded-lg p-0.5 border border-white/10 flex items-center">
            <button
              onClick={() => onToggleViewMode('mobile')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[11px] transition ${
                viewMode === 'mobile'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile Phone</span>
            </button>
            <button
              onClick={() => onToggleViewMode('desktop')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-[11px] transition ${
                viewMode === 'desktop'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
          </div>

          {/* Download Phone Application Button */}
          <button
            onClick={onOpenInstallModal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#024ddf] hover:bg-[#0056e0] active:scale-95 text-white font-bold text-[11px] shadow transition"
          >
            <Download className="w-3 h-3" />
            <span>Install Phone App</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
