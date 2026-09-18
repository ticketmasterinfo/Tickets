import React, { useState } from 'react';
import { ShieldAlert, Globe, ArrowRight, RefreshCw, X, CheckCircle2 } from 'lucide-react';
import { PAUSED_ACTIVITY_LOCALES, LocalePausedContent } from '../../data/pausedActivityData';

interface BrowsingPausedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

export const BrowsingPausedModal: React.FC<BrowsingPausedModalProps> = ({
  isOpen,
  onClose,
  onSignIn
}) => {
  const [currentLocale, setCurrentLocale] = useState<string>('en-US');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resolved, setResolved] = useState(false);

  if (!isOpen) return null;

  const content: LocalePausedContent = PAUSED_ACTIVITY_LOCALES[currentLocale] || PAUSED_ACTIVITY_LOCALES['en-US'];

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setResolved(true);
      setTimeout(() => {
        setResolved(false);
        onClose();
      }, 1200);
    }, 1000);
  };

  const handleSignInClick = () => {
    onClose();
    onSignIn();
  };

  return (
    <div 
      id="browsing-paused-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paused-dialog-title"
    >
      <div 
        id="browsing-paused-card"
        className="bg-white rounded-lg shadow-2xl max-w-xl w-full border border-gray-200 overflow-hidden"
      >
        {/* Top Branding & Locale Bar */}
        <div className="bg-[#121212] px-6 py-3.5 flex items-center justify-between text-white border-b border-gray-800">
          <div className="flex items-center space-x-2.5">
            <svg className="h-5 w-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 24" fill="#fff">
              <path d="M41.57 6.27c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a8.98 8.98 0 0 1-3.75.86c-2.04 0-3.23-.71-3.39-2.62l-.02-.34v-.1a6.46 6.46 0 0 1 .52-2.41c.61-1.55 1.48-2.62 3.36-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83H39.1a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm-5.4.28h-4.15l-4.44 4.41h-.05L29.65 1h-3.19l-3.78 17.7h3.11l1.38-6.44h.05l3.16 6.45h3.6l-3.7-6.62 5.88-5.54zm15.16 8.8a5 5 0 0 1 .15-1.18l1.16-5.3h2.86l.5-2.32h-2.86l.79-3.61-3.42 1.1-.55 2.5h-2.3l-.51 2.32h2.3l-.9 4.11c-.2.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.69 3.2.54 0 1.16-.18 1.7-.3l.56-2.45a4.28 4.28 0 0 1-1.55.28c-.72 0-1.22-.44-1.22-1.18zm-47.14 0c0-.47.07-.9.14-1.18l1.16-5.3h2.86l.5-2.32H5.99l.79-3.61-3.43 1.1-.54 2.5H.5L0 8.87h2.3l-.9 4.11c-.21.97-.4 1.89-.4 2.83C1 18.14 2.52 19 4.69 19c.54 0 1.16-.18 1.7-.3l.56-2.45a4.27 4.27 0 0 1-1.55.28c-.71 0-1.22-.44-1.22-1.18zm12.48-1.98c0-2.29 1.42-4.65 3.97-4.65.88 0 1.7.21 2.33.62l.78-2.6a11.4 11.4 0 0 0-3.19-.47c-4.4 0-7.22 3.23-7.22 7.48 0 3.14 2.04 5.24 5.2 5.24 1.05 0 2.1-.1 3.07-.57l.36-2.5c-.83.4-1.81.61-2.6.61-2.18 0-2.7-1.58-2.7-3.16zM14.5 1.31h-3.19l-.67 3.02h3.2l.66-3.02zm-4.36 5.24L7.54 18.7h3.19l2.61-12.16h-3.19zm72.06-.27c-1.43 0-2.81.26-4.17.73l-.45 2.53a9.48 9.48 0 0 1 4.02-.95c1.12 0 2.45.35 2.45 1.58 0 .36 0 .71-.1 1.04h-1.11c-3 0-7.52.3-7.52 4.32 0 2.24 1.57 3.47 3.78 3.47 1.76 0 2.86-.78 3.95-2.15h.05l-.33 1.87h2.68c.29-2.3 1.5-7.06 1.5-8.7 0-2.85-2.3-3.74-4.75-3.74zM80 16.68c-.82 0-1.62-.42-1.62-1.27 0-2.05 2.56-2.31 4.1-2.31h1.13c-.5 1.96-1.24 3.58-3.61 3.58zM71.6 6.27c-1.72 0-3.5.73-4.31 2.31h-.05c-.17-1.47-1.67-2.31-3.12-2.31-1.5 0-2.9.66-3.75 1.9h-.05l.29-1.62h-2.98l-.26 1.35-2.23 10.8h3.18l1.26-5.78c.4-1.63 1-4.2 3.16-4.2.82 0 1.5.57 1.5 1.46 0 .74-.23 1.87-.4 2.6l-1.28 5.93h3.18L67 12.92c.4-1.65.95-4.2 3.17-4.2.8 0 1.5.57 1.5 1.46 0 .74-.24 1.87-.4 2.6l-1.3 5.93h3.2l1.27-5.81c.27-1 .55-2.22.55-3.3a3.4 3.4 0 0 0-3.4-3.33zm41.24 0c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a9 9 0 0 1-3.75.86c-2.04 0-3.23-.71-3.38-2.62-.01-.12-.03-.22-.03-.34v-.1c.02-.84.2-1.66.53-2.41.6-1.55 1.47-2.62 3.35-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83h-4.36a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm10.18 2.57h-.05l.43-2.3h-3.05l-.28 1.64-2.19 10.53h3.19l1.14-5.46c.4-1.96 1.5-3.96 3.76-3.96.4 0 .85.07 1.2.19l.68-3.1a4.9 4.9 0 0 0-1.22-.11c-1.47 0-3.04 1.25-3.61 2.57zm-20.87 6.51c0-.47.07-.9.14-1.18l1.17-5.3h2.85l.5-2.32h-2.85l.78-3.61-3.42 1.1-.55 2.5h-2.3l-.5 2.32h2.3l-.9 4.11c-.22.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.68 3.2.55 0 1.17-.18 1.71-.3l.55-2.45c-.4.17-.98.28-1.55.28-.71 0-1.21-.44-1.21-1.18zm-13.31-5.21c0 3.04 4.13 3.23 4.13 5.2 0 .98-1.12 1.33-2.19 1.33a6.01 6.01 0 0 1-3.04-.94l-.7 2.53a8.8 8.8 0 0 0 3.74.73c2.74 0 5.52-.95 5.52-4.1 0-2.98-4.14-3.55-4.14-5.08 0-.97 1.19-1.23 2.14-1.23.9 0 1.79.26 2.13.44l.69-2.38a13.27 13.27 0 0 0-2.98-.37c-2.53 0-5.3 1.01-5.3 3.87zm43.23-3.86A2.74 2.74 0 0 0 129.33 9c0 1.5 1.23 2.72 2.74 2.72A2.73 2.73 0 0 0 134.81 9c0-1.5-1.23-2.72-2.74-2.72zm.01 5.04A2.23 2.23 0 0 1 129.86 9c0-1.3.95-2.31 2.22-2.31 1.26 0 2.21 1.01 2.21 2.31s-.95 2.32-2.2 2.32zm1.28-3.02c0-.6-.36-.9-1.1-.9h-1.23v3.2h.52V9.17h.44l.9 1.41h.55l-.91-1.4c.5 0 .83-.38.83-.89zm-1.81.48V7.8h.62c.34 0 .66.1.66.47 0 .41-.26.5-.66.5h-.62z"></path>
            </svg>
            <span className="text-xs text-gray-400 font-mono tracking-tight">Security Check</span>
          </div>

          {/* Locale Selector */}
          <div className="flex items-center space-x-2">
            <Globe className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={currentLocale}
              onChange={(e) => setCurrentLocale(e.target.value)}
              className="bg-[#1f1f1f] text-white text-xs border border-gray-700 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              aria-label="Select Language"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="en-IE">English (IE)</option>
              <option value="fr-FR">Français (FR)</option>
              <option value="fr-CA">Français (CA)</option>
              <option value="fr-CH">Français (CH)</option>
              <option value="it-IT">Italiano (IT)</option>
              <option value="it-CH">Italiano (CH)</option>
              <option value="es-ES">Español (ES)</option>
              <option value="es-MX">Español (MX)</option>
            </select>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 ml-1 rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Header with Shield */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 id="paused-dialog-title" className="text-2xl font-bold text-[#121212] tracking-tight leading-tight">
                {content.messageBlock.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                {content.actionBlock.title}
              </p>
            </div>
          </div>

          {/* Action Information Box */}
          <div className="bg-[#f6f6f6] rounded-md border border-gray-200 p-5 space-y-3">
            {content.actionBlock.info.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-sm font-bold text-[#121212] uppercase tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {section.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#024ddf] mt-2 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Success message when verified */}
          {resolved && (
            <div className="flex items-center space-x-2 text-green-700 bg-green-50 p-3 rounded-md border border-green-200 text-sm font-semibold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Session verified successfully. Resuming activity...</span>
            </div>
          )}

          {/* Incident Footprint */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-gray-500 border-t border-gray-100 font-mono">
            <span>Reference ID: TM-NET-SEC-92041</span>
            <span>IP Location: Verified Carrier Node</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              onClick={handleVerify}
              disabled={isVerifying || resolved}
              className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-800 text-sm font-semibold rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 focus:outline-none"
            >
              <RefreshCw className={`w-4 h-4 ${isVerifying ? 'animate-spin text-[#024ddf]' : ''}`} />
              <span>{isVerifying ? 'Verifying Session...' : 'Verify Session'}</span>
            </button>

            <button
              onClick={handleSignInClick}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white text-sm font-semibold rounded-md transition-all shadow-sm flex items-center justify-center space-x-2 focus:outline-none"
            >
              <span>Sign In to Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
