import React, { useState } from 'react';
import { ShieldAlert, Globe, ArrowRight, RefreshCw, X, CheckCircle2 } from 'lucide-react';
import { PAUSED_ACTIVITY_LOCALES, LocalePausedContent } from '../../data/pausedActivityData';
import { TicketmasterLogo } from '../Common/TicketmasterLogo';

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
            <TicketmasterLogo className="h-5 w-auto" color="#ffffff" />
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
