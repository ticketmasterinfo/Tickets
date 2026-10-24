import React, { useState, useEffect } from 'react';
import { subscribeToNotifications } from '../../utils/notification';
import { CheckCircle2, X, Info } from 'lucide-react';
import { TicketmasterLogo } from './TicketmasterLogo';

export const NotificationToast: React.FC = () => {
  const [toast, setToast] = useState<{ message: string; title: string } | null>(null);

  useEffect(() => {
    return subscribeToNotifications((message, title) => {
      setToast({ message, title: title || 'Ticketmaster' });
      const timer = setTimeout(() => {
        setToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    });
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-auto px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="pointer-events-auto bg-[#1a1a1e] text-white border border-white/20 rounded-2xl shadow-2xl p-4 flex items-start gap-3 backdrop-blur-md">
        <div className="w-8 h-8 rounded-full bg-[#026cdf]/20 border border-[#026cdf]/40 flex items-center justify-center text-[#026cdf] shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              {toast.title}
            </span>
            <button
              onClick={() => setToast(null)}
              className="text-white/50 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1 leading-relaxed">
            {toast.message}
          </p>
        </div>
      </div>
    </div>
  );
};
