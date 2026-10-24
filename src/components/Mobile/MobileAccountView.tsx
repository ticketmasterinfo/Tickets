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
  LogOut, 
  X, 
  Check, 
  Lock, 
  Smartphone, 
  ExternalLink,
  PhoneCall,
  MessageSquare,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { showAppNotification } from '../../utils/notification';

interface MobileAccountViewProps {
  currentUser: { name: string; email: string } | null;
  onOpenSignIn: () => void;
  onSignOut: () => void;
  onOpenInstallModal?: () => void;
  onRelaunchSplash?: () => void;
  onSwitchToDesktop?: () => void;
  favoritesCount: number;
  onNavigateToFavorites: () => void;
  currentCity: string;
  onOpenCitySelector: () => void;
  onUpdateUser?: (user: { name: string; email: string }) => void;
  onOpenSyncModal?: () => void;
}

export const MobileAccountView: React.FC<MobileAccountViewProps> = ({
  currentUser,
  onOpenSignIn,
  onSignOut,
  favoritesCount,
  onNavigateToFavorites,
  currentCity,
  onOpenCitySelector,
  onUpdateUser,
  onOpenSyncModal
}) => {
  // Permission toggles matching IMG_6286
  const [locationContentEnabled, setLocationContentEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Active sheets / modals
  const [activeSheet, setActiveSheet] = useState<
    'inbox' | 'edit_details' | 'security' | 'payment_methods' | 'help' | null
  >(null);

  // Edit details form state
  const [editName, setEditName] = useState(currentUser?.name || 'Alex Morgan');
  const [editEmail, setEditEmail] = useState(currentUser?.email || 'ticketmastersincinfo@gmail.com');
  const [editPhone, setEditPhone] = useState('+1 (555) 234-5678');
  const [editPostalCode, setEditPostalCode] = useState('90015');
  const [detailsSavedSuccess, setDetailsSavedSuccess] = useState(false);

  // Security toggles
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  // Save details handler
  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({ name: editName, email: editEmail });
    }
    setDetailsSavedSuccess(true);
    setTimeout(() => {
      setDetailsSavedSuccess(false);
      setActiveSheet(null);
    }, 1200);
  };

  return (
    <div className="w-full min-h-[100dvh] pb-32 bg-[#000000] text-white select-none font-averta">
      {/* 1. Header / Sign-In Section matching IMG_6286 */}
      <div className="pt-7 px-4 pb-3 text-center">
        <p className="text-[13px] font-normal text-white/70 tracking-normal">
          Welcome to
        </p>
        <h1 className="text-[34px] font-black italic tracking-[-0.04em] text-white mt-0.5 leading-none font-averta">
          ticketmaster
        </h1>

        {currentUser ? (
          /* Signed In Profile Card */
          <div className="mt-4 p-4 rounded-2xl bg-[#1c1c1e] text-left flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#026cdf] font-black text-white flex items-center justify-center text-base shadow">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <p className="text-[15px] font-bold text-white leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[12px] text-[#8e8e93] leading-tight mt-0.5">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="text-xs text-[#8e8e93] hover:text-red-400 p-2 cursor-pointer flex items-center gap-1.5 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        ) : (
          /* Signed Out Blue Sign In Button matching IMG_6286 */
          <button
            onClick={onOpenSignIn}
            className="w-full mt-4 h-12 rounded-full bg-[#026cdf] hover:bg-[#0056e0] active:scale-[0.98] text-white font-bold text-[15px] flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer"
          >
            <span>Sign In</span>
            <ArrowRight className="w-[18px] h-[18px] stroke-[2.2]" />
          </button>
        )}
      </div>

      {/* 2. Section: Personalization matching IMG_6286 */}
      <div className="mt-4 px-4">
        <h3 className="text-[13px] font-bold text-white px-1 mb-2 tracking-normal font-averta">
          Personalization
        </h3>
        <div className="bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-[#2c2c2e]/70 shadow-sm">
          {/* My Inbox */}
          <button 
            type="button"
            onClick={() => setActiveSheet('inbox')}
            className="w-full h-[52px] px-4 flex items-center justify-between text-left hover:bg-white/5 active:bg-white/10 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-[20px] h-[20px] text-white" strokeWidth={1.8} />
              <span className="text-[15px] font-normal text-white">My Inbox</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#026cdf]"></span>
              <ChevronRight className="w-4 h-4 text-[#8e8e93]" strokeWidth={2} />
            </div>
          </button>

          {/* Favorites */}
          <button 
            type="button"
            onClick={onNavigateToFavorites}
            className="w-full h-[52px] px-4 flex items-center justify-between text-left hover:bg-white/5 active:bg-white/10 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-[20px] h-[20px] text-white" strokeWidth={1.8} />
              <span className="text-[15px] font-normal text-white">Favorites</span>
            </div>
            <div className="flex items-center gap-2">
              {favoritesCount > 0 && (
                <span className="text-[13px] text-[#8e8e93] font-normal">
                  {favoritesCount}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-[#8e8e93]" strokeWidth={2} />
            </div>
          </button>

          {/* Location */}
          <button 
            type="button"
            onClick={onOpenCitySelector}
            className="w-full h-[52px] px-4 flex items-center justify-between text-left hover:bg-white/5 active:bg-white/10 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-[20px] h-[20px] text-white" strokeWidth={1.8} />
              <span className="text-[15px] font-normal text-white">Location</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-[#8e8e93] font-normal max-w-[160px] truncate">
                {currentCity}
              </span>
              <ChevronRight className="w-4 h-4 text-[#8e8e93]" strokeWidth={2} />
            </div>
          </button>
        </div>
      </div>

      {/* 3. Section: Permissions matching IMG_6286 */}
      <div className="mt-5 px-4">
        <h3 className="text-[13px] font-bold text-white px-1 mb-2 tracking-normal font-averta">
          Permissions
        </h3>
        <div className="bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-[#2c2c2e]/70 shadow-sm">
          {/* Location Content Toggle */}
          <div className="h-[52px] px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Navigation className="w-[20px] h-[20px] text-white" strokeWidth={1.8} />
              <span className="text-[15px] font-normal text-white">Location Content</span>
            </div>
            <button
              type="button"
              onClick={() => setLocationContentEnabled(!locationContentEnabled)}
              className={`w-[51px] h-[31px] rounded-full p-[2px] transition-colors duration-200 ease-in-out cursor-pointer relative ${
                locationContentEnabled ? 'bg-[#026cdf]' : 'bg-[#39393d]'
              }`}
              aria-label="Toggle Location Content"
            >
              <div 
                className={`w-[27px] h-[27px] rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.3)] transform transition-transform duration-200 ease-in-out ${
                  locationContentEnabled ? 'translate-x-[20px]' : 'translate-x-0'
                }`} 
              />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="h-[52px] px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-[20px] h-[20px] text-white" strokeWidth={1.8} />
              <span className="text-[15px] font-normal text-white">Notifications</span>
            </div>
            <button
              type="button"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-[51px] h-[31px] rounded-full p-[2px] transition-colors duration-200 ease-in-out cursor-pointer relative ${
                notificationsEnabled ? 'bg-[#026cdf]' : 'bg-[#39393d]'
              }`}
              aria-label="Toggle Notifications"
            >
              <div 
                className={`w-[27px] h-[27px] rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.3)] transform transition-transform duration-200 ease-in-out ${
                  notificationsEnabled ? 'translate-x-[20px]' : 'translate-x-0'
                }`} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Section: Account matching IMG_6286 */}
      <div className="mt-5 px-4">
        <h3 className="text-[13px] font-bold text-white px-1 mb-2 tracking-normal font-averta">
          Account
        </h3>
        <div className="bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-[#2c2c2e]/70 shadow-sm">
          {/* Edit Details */}
          <button 
            type="button"
            onClick={() => setActiveSheet('edit_details')}
            className="w-full h-[52px] px-4 flex items-center justify-between text-left hover:bg-white/5 active:bg-white/10 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <User className="w-[20px] h-[20px] text-white" strokeWidth={1.8} />
              <span className="text-[15px] font-normal text-white">Edit Details</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8e8e93]" strokeWidth={2} />
          </button>

          {/* Security */}
          <button 
            type="button"
            onClick={() => setActiveSheet('security')}
            className="w-full h-[52px] px-4 flex items-center justify-between text-left hover:bg-white/5 active:bg-white/10 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-[20px] h-[20px] text-white" strokeWidth={1.8} />
              <span className="text-[15px] font-normal text-white">Security</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8e8e93]" strokeWidth={2} />
          </button>

          {/* Saved Payment Methods */}
          <button 
            type="button"
            onClick={() => setActiveSheet('payment_methods')}
            className="w-full h-[52px] px-4 flex items-center justify-between text-left hover:bg-white/5 active:bg-white/10 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-[20px] h-[20px] text-white" strokeWidth={1.8} />
              <span className="text-[15px] font-normal text-white">Saved Payment Methods</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8e8e93]" strokeWidth={2} />
          </button>

          {/* Ticketmaster Event Synchronisation */}
          {onOpenSyncModal && (
            <button 
              type="button"
              onClick={onOpenSyncModal}
              className="w-full h-[52px] px-4 flex items-center justify-between text-left hover:bg-white/5 active:bg-white/10 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <RefreshCw className="w-[20px] h-[20px] text-[#026cdf]" strokeWidth={1.8} />
                <span className="text-[15px] font-normal text-white">Event Sync Manager</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#026cdf] bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800/40">
                  TM Discovery API
                </span>
                <ChevronRight className="w-4 h-4 text-[#8e8e93]" strokeWidth={2} />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* 5. Section: Help & Guidance matching IMG_6286 */}
      <div className="mt-5 px-4">
        <h3 className="text-[13px] font-bold text-white px-1 mb-2 tracking-normal font-averta">
          Help & Guidance
        </h3>
        <div className="bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-[#2c2c2e]/70 shadow-sm">
          {/* Need Help? */}
          <button 
            type="button"
            onClick={() => setActiveSheet('help')}
            className="w-full h-[52px] px-4 flex items-center justify-between text-left hover:bg-white/5 active:bg-white/10 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-[20px] h-[20px] text-white" strokeWidth={1.8} />
              <span className="text-[15px] font-normal text-white">Need Help?</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8e8e93]" strokeWidth={2} />
          </button>
        </div>
      </div>


      {/* ==================== NATIVE iOS MODALS / SHEETS ==================== */}

      {/* MODAL 1: MY INBOX */}
      {activeSheet === 'inbox' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#1c1c1e] rounded-t-3xl sm:rounded-2xl border border-white/10 p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#2c2c2e]">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#026cdf]" />
                <h2 className="text-lg font-bold text-white">My Inbox</h2>
              </div>
              <button 
                onClick={() => setActiveSheet(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-xl bg-[#2c2c2e]/50 border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#026cdf] uppercase tracking-wider">Presale Alert</span>
                  <span className="text-[11px] text-white/50">Today, 9:15 AM</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">Coldplay: Music of the Spheres World Tour</h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Your Verified Fan unique presale code is confirmed for the Rose Bowl show. Sale begins tomorrow at 10:00 AM local time.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#2c2c2e]/40 border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">SafeTix™ Ready</span>
                  <span className="text-[11px] text-white/50">Yesterday</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">Tickets Active in Your SafeTix™ Wallet</h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Your digital dynamic barcode tickets are encrypted and ready for tap & scan entry. Screenshots are automatically rejected at turnstiles.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#2c2c2e]/40 border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Tour Announcement</span>
                  <span className="text-[11px] text-white/50">3 days ago</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">Taylor Swift Added New Stadium Dates</h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Additional dates have been announced near Los Angeles. Check your watchlist preferences to receive instant release notices.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveSheet(null)}
              className="w-full mt-5 py-3 rounded-xl bg-[#026cdf] font-bold text-sm text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT DETAILS */}
      {activeSheet === 'edit_details' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#1c1c1e] rounded-t-3xl sm:rounded-2xl border border-white/10 p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#2c2c2e]">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#026cdf]" />
                <h2 className="text-lg font-bold text-white">Edit Profile Details</h2>
              </div>
              <button 
                onClick={() => setActiveSheet(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDetails} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2c2c2e] border border-white/10 text-sm text-white focus:outline-none focus:border-[#026cdf]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2c2c2e] border border-white/10 text-sm text-white focus:outline-none focus:border-[#026cdf]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">Mobile Phone (for SafeTix SMS & 2FA)</label>
                <input 
                  type="tel" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2c2c2e] border border-white/10 text-sm text-white focus:outline-none focus:border-[#026cdf]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">Postal / ZIP Code</label>
                <input 
                  type="text" 
                  value={editPostalCode}
                  onChange={(e) => setEditPostalCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2c2c2e] border border-white/10 text-sm text-white focus:outline-none focus:border-[#026cdf]"
                />
              </div>

              {detailsSavedSuccess && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveSheet(null)}
                  className="flex-1 py-3 rounded-xl bg-white/10 font-bold text-sm text-white hover:bg-white/15"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#026cdf] hover:bg-[#0056e0] font-bold text-sm text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: SECURITY */}
      {activeSheet === 'security' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#1c1c1e] rounded-t-3xl sm:rounded-2xl border border-white/10 p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#2c2c2e]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Security & SafeTix™</h2>
              </div>
              <button 
                onClick={() => setActiveSheet(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* SafeTix Rotating Barcode Badge */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    SafeTix™ Dynamic Encryption
                    <span className="text-[10px] bg-blue-600/80 text-white px-1.5 py-0.5 rounded font-bold">ACTIVE</span>
                  </h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Tickets rotate every 15 seconds to prevent fraudulent copies and scalping. Screenshots or printouts will not be accepted.
                  </p>
                </div>
              </div>

              {/* Security Toggles */}
              <div className="bg-[#2c2c2e]/60 rounded-xl divide-y divide-[#39393d] overflow-hidden">
                <div className="p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-[#8e8e93]">Require SMS verification code on login</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`w-11 h-6 rounded-full p-[2px] transition-colors ${twoFactorEnabled ? 'bg-[#026cdf]' : 'bg-[#39393d]'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Face ID / Biometric Sign-In</p>
                    <p className="text-xs text-[#8e8e93]">Fast login using device biometrics</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                    className={`w-11 h-6 rounded-full p-[2px] transition-colors ${biometricsEnabled ? 'bg-[#026cdf]' : 'bg-[#39393d]'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${biometricsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              {/* Active Device */}
              <div className="p-3.5 rounded-xl bg-[#2c2c2e]/40 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-xs font-bold text-white">Current Authorized Device</p>
                    <p className="text-[11px] text-[#8e8e93]">Apple iPhone 16 Pro • Active Now</p>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Secure
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveSheet(null)}
              className="w-full mt-5 py-3 rounded-xl bg-[#026cdf] font-bold text-sm text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: SAVED PAYMENT METHODS */}
      {activeSheet === 'payment_methods' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#1c1c1e] rounded-t-3xl sm:rounded-2xl border border-white/10 p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#2c2c2e]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#026cdf]" />
                <h2 className="text-lg font-bold text-white">Saved Payment Methods</h2>
              </div>
              <button 
                onClick={() => setActiveSheet(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {/* Apple Pay */}
              <div className="p-3.5 rounded-xl bg-[#2c2c2e]/50 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-white text-black font-black flex items-center justify-center text-xs tracking-tighter">
                    Pay
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Apple Pay</p>
                    <p className="text-xs text-[#8e8e93]">Default Express Checkout</p>
                  </div>
                </div>
                <span className="text-[11px] bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-500/30">
                  Default
                </span>
              </div>

              {/* Visa */}
              <div className="p-3.5 rounded-xl bg-[#2c2c2e]/50 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-[#1a1f71] text-white font-bold italic flex items-center justify-center text-[11px]">
                    VISA
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                    <p className="text-xs text-[#8e8e93]">Expires 08/28</p>
                  </div>
                </div>
                <span className="text-xs text-white/50">Verified</span>
              </div>

              {/* PayPal */}
              <div className="p-3.5 rounded-xl bg-[#2c2c2e]/50 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-[#003087] text-white font-bold flex items-center justify-center text-xs">
                    PP
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">PayPal Connected</p>
                    <p className="text-xs text-[#8e8e93]">ticketmastersincinfo@gmail.com</p>
                  </div>
                </div>
                <span className="text-xs text-white/50">Active</span>
              </div>

              {/* Add payment method */}
              <button 
                onClick={() => showAppNotification('Card tokenization is active for secure checkout.', 'Payment Methods')}
                className="w-full py-3 rounded-xl border border-dashed border-white/20 text-sm font-semibold text-white/80 hover:text-white hover:border-white/40 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>+ Add New Payment Method</span>
              </button>
            </div>

            <button
              onClick={() => setActiveSheet(null)}
              className="w-full mt-5 py-3 rounded-xl bg-[#026cdf] font-bold text-sm text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* MODAL 5: NEED HELP? */}
      {activeSheet === 'help' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#1c1c1e] rounded-t-3xl sm:rounded-2xl border border-white/10 p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#2c2c2e]">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#026cdf]" />
                <h2 className="text-lg font-bold text-white">Fan Support & Guidance</h2>
              </div>
              <button 
                onClick={() => setActiveSheet(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-xl bg-[#2c2c2e]/60 border border-white/10">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#026cdf]" />
                  Where are my tickets?
                </h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Go to the <strong>My Tickets</strong> tab in the footer. Your tickets and dynamic SafeTix™ barcodes will appear there once ordered.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#2c2c2e]/60 border border-white/10">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  How do I enter the venue?
                </h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Open your ticket pass on this phone and hold it near the venue turnstile scanner or reader. Screenshots cannot be scanned.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#2c2c2e]/60 border border-white/10">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  Can I transfer tickets to a friend?
                </h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Yes, tap Transfer on your ticket card to send tickets directly via email or mobile phone link.
                </p>
              </div>

              {/* 24/7 Fan Support contact button */}
              <div className="pt-2">
                <a
                  href="mailto:support@ticketmaster.com?subject=Ticketmaster%20Fan%20Support%20Inquiry"
                  className="w-full py-3 px-4 rounded-xl bg-[#026cdf] hover:bg-[#0056e0] font-bold text-sm text-white flex items-center justify-center gap-2 transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Contact 24/7 Fan Support</span>
                </a>
              </div>
            </div>

            <button
              onClick={() => setActiveSheet(null)}
              className="w-full mt-4 py-2.5 rounded-xl bg-white/10 font-bold text-xs text-white/80 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
