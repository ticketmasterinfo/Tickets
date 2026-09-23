import React from 'react';
import { ArrowUp } from 'lucide-react';
import { TicketmasterLogo } from '../Common/TicketmasterLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer aria-label="Ticketmaster Footer Navigation" className="bg-[#121212] text-gray-300 text-xs border-t border-gray-800 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Top Branding, Social, Apps & Disclaimers */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-gray-800">
          
          {/* Col Left: Logo, Connect & Apps */}
          <div className="md:col-span-4 space-y-6">
            {/* Ticketmaster Official White Wordmark SVG */}
            <div className="flex items-center space-x-2">
              <TicketmasterLogo className="h-6 w-auto" color="#ffffff" />
            </div>

            {/* Let's connect */}
            <div>
              <h4 className="text-sm font-bold text-white mb-2.5">Let&apos;s connect</h4>
              <div className="flex items-center space-x-3 text-gray-400">
                <a href="https://facebook.com/Ticketmaster" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#222] hover:bg-[#024ddf] hover:text-white flex items-center justify-center transition-colors">
                  <span className="font-bold text-xs">fb</span>
                </a>
                <a href="https://twitter.com/ticketmaster" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#222] hover:bg-[#024ddf] hover:text-white flex items-center justify-center transition-colors">
                  <span className="font-bold text-xs">X</span>
                </a>
                <a href="https://blog.ticketmaster.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#222] hover:bg-[#024ddf] hover:text-white flex items-center justify-center transition-colors">
                  <span className="font-bold text-xs">blog</span>
                </a>
                <a href="https://youtube.com/Ticketmaster" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#222] hover:bg-[#024ddf] hover:text-white flex items-center justify-center transition-colors">
                  <span className="font-bold text-xs">yt</span>
                </a>
                <a href="https://instagram.com/ticketmaster" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#222] hover:bg-[#024ddf] hover:text-white flex items-center justify-center transition-colors">
                  <span className="font-bold text-xs">ig</span>
                </a>
              </div>
            </div>

            {/* Download Our Apps */}
            <div>
              <h4 className="text-sm font-bold text-white mb-2.5">Download Our Apps</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-gray-700 px-3 py-1.5 rounded-lg flex items-center space-x-2 cursor-pointer transition-colors">
                  <span className="text-lg text-white"></span>
                  <div>
                    <span className="text-[9px] text-gray-400 block leading-none">Download on the</span>
                    <span className="text-xs font-bold text-white">App Store</span>
                  </div>
                </div>

                <div className="bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-gray-700 px-3 py-1.5 rounded-lg flex items-center space-x-2 cursor-pointer transition-colors">
                  <span className="text-sm text-green-400 font-bold">▶</span>
                  <div>
                    <span className="text-[9px] text-gray-400 block leading-none">Get it on</span>
                    <span className="text-xs font-bold text-white">Google Play</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-500">
              By continuing past this page, you agree to our{' '}
              <a href="#terms" className="text-gray-400 underline hover:text-white">terms of use</a>.
            </p>
          </div>

          {/* Col Right: 4 link categories (Helpful Links, Our Network, About Us, Friends & Partners) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            
            {/* 1. Helpful Links */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                Helpful Links
              </h4>
              <ul className="space-y-1.5 text-xs list-none p-0 m-0">
                <li><a href="#help" className="hover:text-white transition-colors">Help/FAQ</a></li>
                <li><a href="#sell" className="hover:text-white transition-colors">Sell</a></li>
                <li><a href="#account" className="hover:text-white transition-colors">My Account</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#giftcards" className="hover:text-white transition-colors">Gift Cards</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Do Not Sell My Info</a></li>
                <li><a href="#getstarted" className="hover:text-white transition-colors">Get Started</a></li>
              </ul>
            </div>

            {/* 2. Our Network */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                Our Network
              </h4>
              <ul className="space-y-1.5 text-xs list-none p-0 m-0">
                <li><a href="#livenation" className="hover:text-white transition-colors">Live Nation</a></li>
                <li><a href="#hob" className="hover:text-white transition-colors">House of Blues</a></li>
                <li><a href="#frontgate" className="hover:text-white transition-colors">Front Gate Tickets</a></li>
                <li><a href="#ticketweb" className="hover:text-white transition-colors">TicketWeb</a></li>
                <li><a href="#universe" className="hover:text-white transition-colors">universe</a></li>
                <li><a href="#nfl" className="hover:text-white transition-colors">NFL</a></li>
                <li><a href="#nba" className="hover:text-white transition-colors">NBA</a></li>
                <li><a href="#nhl" className="hover:text-white transition-colors">NHL</a></li>
              </ul>
            </div>

            {/* 3. About Us */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                About Us
              </h4>
              <ul className="space-y-1.5 text-xs list-none p-0 m-0">
                <li><a href="#blog" className="hover:text-white transition-colors">Ticketmaster Blog</a></li>
                <li><a href="#truths" className="hover:text-white transition-colors">Ticketing Truths</a></li>
                <li><a href="#adchoices" className="hover:text-white transition-colors">Ad Choices</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#ticketyour" className="hover:text-white transition-colors">Ticket Your Event</a></li>
                <li><a href="#innovation" className="hover:text-white transition-colors">Innovation</a></li>
              </ul>
            </div>

            {/* 4. Friends & Partners */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                Friends & Partners
              </h4>
              <ul className="space-y-1.5 text-xs list-none p-0 m-0">
                <li><a href="#paypal" className="hover:text-white transition-colors">PayPal</a></li>
                <li><a href="#allianz" className="hover:text-white transition-colors">Allianz</a></li>
                <li><a href="#aws" className="hover:text-white transition-colors">AWS</a></li>
                <li><a href="#affiliates" className="hover:text-white transition-colors">Affiliates</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Legal Policies, Cookie Preferences, and Copyright */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 list-none p-0 m-0">
            <li><a href="#policies" className="hover:text-gray-300">Our Policies</a></li>
            <li><a href="#privacy" className="hover:text-gray-300">Privacy Policy</a></li>
            <li><a href="#cookies" className="hover:text-gray-300">Cookie Policy</a></li>
            <li>
              <button 
                onClick={() => alert('OneTrust Cookie & Privacy Center: All functional, performance and advertising preferences up to date.')}
                className="hover:text-gray-300 underline cursor-pointer"
              >
                Manage my cookies and ad choices
              </button>
            </li>
          </ul>

          <div className="flex items-center space-x-3">
            <p>&copy; 1999&ndash;2026 Ticketmaster. All rights reserved.</p>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-md bg-[#1f1f1f] hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
