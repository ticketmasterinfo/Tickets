import React, { useState } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Heart, 
  MapPin, 
  Navigation, 
  Bell, 
  User, 
  ShieldCheck, 
  CreditCard, 
  HelpCircle, 
  ChevronRight, 
  Download, 
  LogOut, 
  Sparkles, 
  Play, 
  Globe 
} from 'lucide-react';

interface MobileAccountViewProps {
  currentUser: { name: string; email: string } | null;
  onOpenSignIn: () => void;
  onSignOut: () => void;
  onOpenInstallModal: () => void;
  onRelaunchSplash: () => void;
  onSwitchToDesktop: () => void;
  favoritesCount: number;
  onNavigateToFavorites: () => void;
  currentCity: string;
  onOpenCitySelector: () => void;
}

export const MobileAccountView: React.FC<MobileAccountViewProps> = ({
  currentUser,
  onOpenSignIn,
  onSignOut,
  onOpenInstallModal,
  onRelaunchSplash,
  onSwitchToDesktop,
  favoritesCount,
  onNavigateToFavorites,
  currentCity,
  onOpenCitySelector
}) => {
  // Permission toggles matching IMG_6274
  const [locationContentEnabled, setLocationContentEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Active sub-modals / state
  const [activeNotice, setActiveNotice] = useState<string | null>(null);

  return (
    <div className="w-full pb-28 bg-[#121212] text-white select-none">
      {/* Top Welcome Header matching IMG_6274 */}
      <div className="pt-6 px-4 pb-4 text-center">
        <p className="text-sm text-white/80 font-medium">Welcome to</p>
        <h1 className="text-3xl font-black italic tracking-tighter text-white mt-0.5">
          ticketmaster
        </h1>

        {currentUser ? (
          <div className="mt-4 p-4 rounded-2xl bg-[#1c1e24] border border-white/10 text-left flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-600 font-black text-white flex items-center justify-center text-base shadow">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{currentUser.name}</p>
                <p className="text-xs text-white/60">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="text-xs text-white/50 hover:text-red-400 p-2"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenSignIn}
            className="w-full mt-4 py-3.5 px-4 rounded-full bg-[#024ddf] hover:bg-[#0056e0] active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Download Phone Application Banner */}
      <div className="px-4 py-2">
        <div 
          onClick={onOpenInstallModal}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950 via-[#181a20] to-blue-950 border border-blue-500/30 flex items-center justify-between cursor-pointer hover:border-blue-400 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Download Phone App</p>
              <p className="text-[11px] text-white/60">Install for iOS (iPhone) & Android</p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
            Install <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 1. Section: Personalization matching IMG_6274 */}
      <div className="mt-4 px-4">
        <h3 className="text-xs font-bold text-white/90 mb-2 px-1">
          Personalization
        </h3>
        <div className="bg-[#1c1e24] rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
          {/* My Inbox */}
          <button 
            onClick={() => setActiveNotice('Inbox: You have 2 presale invitations from Taylor Swift & Eagles.')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white">My Inbox</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </button>

          {/* Favorites */}
          <button 
            onClick={onNavigateToFavorites}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white">Favorites</span>
            </div>
            <div className="flex items-center gap-2">
              {favoritesCount > 0 && (
                <span className="text-xs text-blue-400 font-semibold">{favoritesCount} artists</span>
              )}
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </button>

          {/* Location */}
          <button 
            onClick={onOpenCitySelector}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white">Location</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/50">{currentCity}</span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </button>
        </div>
      </div>

      {/* 2. Section: Permissions matching IMG_6274 */}
      <div className="mt-5 px-4">
        <h3 className="text-xs font-bold text-white/90 mb-2 px-1">
          Permissions
        </h3>
        <div className="bg-[#1c1e24] rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
          {/* Location Content Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white">Location Content</span>
            </div>
            <button
              onClick={() => setLocationContentEnabled(!locationContentEnabled)}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                locationContentEnabled ? 'bg-blue-600' : 'bg-[#333742]'
              }`}
              aria-label="Toggle Location Content"
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                locationContentEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white">Notifications</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                notificationsEnabled ? 'bg-blue-600' : 'bg-[#333742]'
              }`}
              aria-label="Toggle Notifications"
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Section: Account matching IMG_6274 */}
      <div className="mt-5 px-4">
        <h3 className="text-xs font-bold text-white/90 mb-2 px-1">
          Account
        </h3>
        <div className="bg-[#1c1e24] rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
          {/* Edit Details */}
          <button 
            onClick={() => setActiveNotice('Profile details: Ticketmaster Account verified for ticketmastersincinfo@gmail.com.')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white">Edit Details</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </button>

          {/* Security */}
          <button 
            onClick={() => setActiveNotice('Security: SafeTix™ rotating barcode protection & 2-Factor Authentication are ACTIVE.')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white">Security</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </button>

          {/* Saved Payment Methods */}
          <button 
            onClick={() => setActiveNotice('Payment Methods: Apple Pay & Visa ending in 4242 are configured.')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white">Saved Payment Methods</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </button>
        </div>
      </div>

      {/* 4. Section: Help & Guidance matching IMG_6274 */}
      <div className="mt-5 px-4">
        <h3 className="text-xs font-bold text-white/90 mb-2 px-1">
          Help & Guidance
        </h3>
        <div className="bg-[#1c1e24] rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
          {/* Need Help? */}
          <button 
            onClick={() => setActiveNotice('Help Center: Visit help.ticketmaster.com or 24/7 fan support line.')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white">Need Help?</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </button>

          {/* Preview Loading Splash Screen (IMG_6272) */}
          <button 
            onClick={onRelaunchSplash}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition text-blue-400"
          >
            <div className="flex items-center gap-3">
              <Play className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold">Preview App Loading Splash</span>
            </div>
            <span className="text-[11px] bg-blue-900/50 px-2 py-0.5 rounded text-blue-300">
              IMG_6272
            </span>
          </button>

          {/* Switch to Desktop Web Portal */}
          <button 
            onClick={onSwitchToDesktop}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition text-white/70 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">Switch to Desktop Portal View</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </button>
        </div>
      </div>

      {/* Active notification toast */}
      {activeNotice && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-blue-600 text-white p-3.5 rounded-xl shadow-2xl flex items-center justify-between text-xs animate-in fade-in slide-in-from-bottom-2">
          <span>{activeNotice}</span>
          <button onClick={() => setActiveNotice(null)} className="font-bold underline ml-2">
            Dismiss
          </button>
        </div>
      )}

      {/* App Version Info */}
      <div className="mt-8 text-center text-xs text-white/40">
        <p>Ticketmaster Mobile v2026.10.4</p>
        <p className="mt-0.5">Verified SafeTix™ Mobile Application</p>
      </div>
    </div>
  );
};
