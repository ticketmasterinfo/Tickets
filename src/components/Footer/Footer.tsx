import React from 'react';
import { ShieldCheck, Smartphone, Globe, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#121212] text-gray-400 text-xs border-t border-gray-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-gray-800 text-gray-300">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/50">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="type-blanc font-bold text-white text-sm">100% Buyer Guarantee</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Every ticket is authentic, verified by primary venue box offices, and backed for valid event entry.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 text-purple-400 flex items-center justify-center shrink-0 border border-purple-800/50">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="type-blanc font-bold text-white text-sm">Ticketmaster SafeTix™</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Dynamic digital encrypted barcodes with anti-fraud encryption delivered instantly to your phone.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 text-[#ffb932] flex items-center justify-center shrink-0 border border-amber-800/50">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="type-blanc font-bold text-white text-sm">Official Primary Box Office</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Direct partnerships with premier stadiums, arenas, amphitheaters, and Broadway theaters worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column Navigation Hierarchy */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <h5 className="type-snowdon text-white font-bold tracking-wider">
              Explore Live Events
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#concerts" className="hover:text-white transition-colors">Concert Tours & Festivals</a></li>
              <li><a href="#sports" className="hover:text-white transition-colors">NBA, NFL, NHL & MLB Tickets</a></li>
              <li><a href="#theater" className="hover:text-white transition-colors">Broadway Shows & Musicals</a></li>
              <li><a href="#comedy" className="hover:text-white transition-colors">Comedy Tour Showcases</a></li>
              <li><a href="#family" className="hover:text-white transition-colors">Disney On Ice & Family Events</a></li>
              <li><a href="#vip" className="hover:text-white transition-colors">VIP Lounge & Backstage Passes</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h5 className="type-snowdon text-white font-bold tracking-wider">
              Customer Support & Help
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#help" className="hover:text-white transition-colors">Help Center & FAQs</a></li>
              <li><a href="#safetix" className="hover:text-white transition-colors">How SafeTix Mobile Entry Works</a></li>
              <li><a href="#refunds" className="hover:text-white transition-colors">Refund & Exchange Policies</a></li>
              <li><a href="#accessibility" className="hover:text-white transition-colors">ADA Accessible Seating Info</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Fan Support</a></li>
              <li><a href="#giftcards" className="hover:text-white transition-colors">Ticketmaster Gift Cards</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h5 className="type-snowdon text-white font-bold tracking-wider">
              Sell & Partner Services
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#sell" className="hover:text-white transition-colors">Sell Tickets on TM Resale</a></li>
              <li><a href="#promoters" className="hover:text-white transition-colors">Event Promoters & Box Offices</a></li>
              <li><a href="#affiliates" className="hover:text-white transition-colors">Affiliate Partner Program</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers & Job Openings</a></li>
              <li><a href="#press" className="hover:text-white transition-colors">Press & Media Releases</a></li>
            </ul>
          </div>

          {/* Col 4: Mobile App Download & Live Nation Mark */}
          <div className="space-y-4">
            <h5 className="type-snowdon text-white font-bold tracking-wider">
              Download TM Mobile App
            </h5>
            <p className="text-xs text-gray-400">
              Access your digital SafeTix passes offline, get presale notifications, and transfer tickets seamlessly.
            </p>
            <div className="space-y-2">
              <div className="bg-[#1f1f1f] border border-gray-700 rounded-lg p-2.5 flex items-center space-x-3 cursor-pointer hover:border-gray-500 transition-colors">
                <span className="text-xl"></span>
                <div>
                  <span className="text-[10px] text-gray-400 block leading-none">Download on the</span>
                  <span className="text-xs font-bold text-white">Apple App Store</span>
                </div>
              </div>
              <div className="bg-[#1f1f1f] border border-gray-700 rounded-lg p-2.5 flex items-center space-x-3 cursor-pointer hover:border-gray-500 transition-colors">
                <span className="text-xl">▶</span>
                <div>
                  <span className="text-[10px] text-gray-400 block leading-none">Get it on</span>
                  <span className="text-xs font-bold text-white">Google Play Store</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal, Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-black italic uppercase tracking-tighter text-white">
              ticket<span className="text-[#ffb932]">master</span>
            </span>
            <span className="text-gray-600">|</span>
            <span>A Live Nation Entertainment Company</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href="#privacy" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-300">Purchase Policy</a>
            <a href="#cookies" className="hover:text-gray-300">Manage Cookies</a>
            <a href="#accessibility" className="hover:text-gray-300">Accessibility Statement</a>
            <a href="#ad-choices" className="hover:text-gray-300">Ad Choices</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-gray-400 hover:text-white bg-[#1f1f1f] px-3 py-1.5 rounded-lg border border-gray-800 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-center text-[10px] text-gray-600">
          &copy; 1999&ndash;2026 Ticketmaster. All rights reserved. Reproduction in whole or in part without permission is prohibited.
        </div>

      </div>
    </footer>
  );
};
