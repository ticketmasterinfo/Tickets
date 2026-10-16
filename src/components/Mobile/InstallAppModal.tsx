import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Share2, 
  PlusSquare, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  WifiOff, 
  Apple, 
  ExternalLink 
} from 'lucide-react';
import { usePWAInstall } from '../../utils/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [activePlatform, setActivePlatform] = useState<'ios' | 'android'>(isIOS ? 'ios' : 'android');
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1800);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#181a20] border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#121212]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#024ddf] to-[#1e70ff] flex items-center justify-center shadow-lg shadow-blue-500/20 p-2">
              <span className="text-xl font-black italic tracking-tighter text-white">t</span>
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Ticketmaster App</h3>
              <p className="text-xs text-white/60">Official Mobile Application</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex p-2 bg-[#121212]/80 border-b border-white/5">
          <button
            onClick={() => setActivePlatform('ios')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs transition ${
              activePlatform === 'ios'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>iPhone / iOS</span>
          </button>
          <button
            onClick={() => setActivePlatform('android')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs transition ${
              activePlatform === 'android'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android / Chrome</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {installSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 mx-auto flex items-center justify-center border border-green-500/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-lg font-bold">App Installed Successfully!</h4>
              <p className="text-xs text-white/60 max-w-xs mx-auto">
                Ticketmaster is now installed on your device. Open it from your home screen for turnstile entry.
              </p>
            </div>
          ) : activePlatform === 'ios' ? (
            /* iOS Installation Guide */
            <div className="space-y-4">
              <div className="bg-[#121212] p-4 rounded-2xl border border-white/5 space-y-3">
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  3 Easy Steps for Apple iOS (Safari)
                </p>
                <div className="space-y-3 text-xs text-white/90">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-semibold">Tap the Share icon</p>
                      <p className="text-white/60">At the bottom of your Safari browser bar (the box with an arrow pointing up <Share2 className="w-3.5 h-3.5 inline mx-1 text-blue-400" />).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-semibold">Select "Add to Home Screen"</p>
                      <p className="text-white/60">Scroll down the share menu options and tap <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-blue-400" /> <strong>Add to Home Screen</strong>.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-semibold">Tap "Add" in top-right</p>
                      <p className="text-white/60">The Ticketmaster app icon will appear immediately on your iPhone home screen!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* iOS Live Visual Preview */}
              <div className="bg-gradient-to-b from-white/5 to-white/0 p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center p-1 shrink-0">
                  <span className="font-extrabold italic text-white text-xs">tm</span>
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-bold text-white">Full-Screen Native Experience</p>
                  <p className="text-white/50 text-[11px]">Hides Safari browser tabs, full battery status bar, and enables instant Apple Wallet passes.</p>
                </div>
              </div>
            </div>
          ) : (
            /* Android Installation Guide */
            <div className="space-y-4">
              {isInstallable ? (
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-600/10 border border-blue-500/30 p-4 rounded-2xl space-y-3">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    Instant 1-Tap Installation
                  </p>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Tap below to download and add Ticketmaster directly to your Android apps drawer and home screen.
                  </p>
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download & Install Now
                  </button>
                </div>
              ) : (
                <div className="bg-[#121212] p-4 rounded-2xl border border-white/5 space-y-3">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    Android / Chrome Installation
                  </p>
                  <div className="space-y-3 text-xs text-white/90">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-semibold">Tap browser menu (⋮)</p>
                        <p className="text-white/60">Located at the top right of your Chrome or Samsung Internet browser.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-semibold">Tap "Install app" or "Add to Home screen"</p>
                        <p className="text-white/60">Chrome will download the verified WebAPK package in seconds.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Offline SafeTix Feature Note */}
              <div className="bg-gradient-to-b from-white/5 to-white/0 p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <WifiOff className="w-5 h-5" />
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-bold text-white">Offline Turnstile Access</p>
                  <p className="text-white/50 text-[11px]">Installed passes scan at venue gates even when arena cell networks are congested or offline.</p>
                </div>
              </div>
            </div>
          )}

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10 text-[11px] text-white/70">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Fast 1-Second Load</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span>SafeTix™ Barcode</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              <span>iOS & Android Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>No App Store Delay</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#121212] border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-white/50">Ticketmaster Mobile v2026.10</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
