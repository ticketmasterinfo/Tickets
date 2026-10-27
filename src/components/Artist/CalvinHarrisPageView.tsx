import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Ticket, ExternalLink, Calendar, MapPin, Share2 } from 'lucide-react';
import { TicketmasterLogo } from '../Common/TicketmasterLogo';
import { EventItem } from '../../types';

interface CalvinHarrisPageViewProps {
  onBack: () => void;
  onOpenBooking: (event: EventItem) => void;
}

export const CalvinHarrisPageView: React.FC<CalvinHarrisPageViewProps> = ({
  onBack,
  onOpenBooking
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Default Calvin Harris Event for Instant Interactive Seating
  const defaultCalvinEvent: EventItem = {
    identity: {
      event_title: 'Calvin Harris - North America Tour',
      event_id: 'TM-CALVIN-HARRIS-2027',
      event_url: 'https://www.ticketmaster.com/calvin-harris-tickets/artist/1149552',
      category: 'Concerts',
      subcategory: 'Dance/Electronic',
      subgenre: 'Pop / EDM',
      main_performer: 'Calvin Harris',
      lineup: ['Calvin Harris'],
      supporting_acts: [],
      image_url: '/assets/aistudio/IMG_6648_6f59728a.jpeg',
      banner_url: '/assets/aistudio/IMG_6648_6f59728a.jpeg',
      is_featured: true,
      is_selling_fast: true
    },
    date_time: {
      exact_date: '2027-04-06',
      day_of_week: 'Tuesday',
      start_time: '20:00:00',
      end_time: '23:30:00',
      time_zone: 'EST',
      doors_time: '19:00:00',
      full_date_display: 'Tuesday, Apr 6, 2027 • 8:00 PM'
    },
    location: {
      venue_name: 'Barclays Center',
      venue_url: 'https://www.ticketmaster.com/venue/barclays',
      city: 'Brooklyn',
      state: 'NY',
      country: 'United States',
      full_address: '620 Atlantic Ave, Brooklyn, NY 11217',
      parking_info: 'Official venue parking available.',
      accessibility_info: 'ADA seating on all concourse levels.',
      capacity: 19000
    },
    pricing: {
      currency: 'USD',
      min_price: 69.50,
      max_price: 450.00
    },
    description: {
      full_description: 'Calvin Harris North America Tour 2027 live at Barclays Center. Verified SafeTix entry.',
      special_notices: 'Mobile barcode tickets only. Screenshots will not be accepted.',
      age_restrictions: 'All ages welcome.',
      entry_requirements: 'Mobile SafeTix entry only.'
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle escape key to go back
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <div className="fixed inset-0 z-50 bg-[#121212] flex flex-col overflow-hidden animate-fadeIn">
      {/* Sticky Top Bar */}
      <header className="h-14 sm:h-16 bg-[#121212] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-lg z-20">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white bg-white/10 hover:bg-white/20 active:bg-white/30 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer border border-white/15"
            aria-label="Back to Ticketmaster Home"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>

          <div className="h-5 w-px bg-white/20 hidden sm:block" />

          <div className="flex items-center space-x-2.5">
            <TicketmasterLogo className="h-4 sm:h-5 text-white" />
            <span className="text-white font-black text-sm sm:text-base tracking-tight truncate max-w-[200px] sm:max-w-none">
              Calvin Harris
            </span>
            <span className="hidden md:inline-block bg-[#024ddf] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
              Official Tour Page
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.origin + '/assets/aistudio/1149552_b569f5bd.html');
              }
            }}
            title="Share page"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenBooking(defaultCalvinEvent)}
            className="flex items-center space-x-1.5 sm:space-x-2 bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md hover:shadow-blue-500/20"
          >
            <Ticket className="w-4 h-4" />
            <span>Select Tickets</span>
          </button>
        </div>
      </header>

      {/* Embedded 1149552_b569f5bd.html Frame */}
      <div className="flex-1 w-full h-full relative bg-white">
        <iframe
          ref={iframeRef}
          src="/assets/aistudio/1149552_b569f5bd.html"
          title="Calvin Harris Tickets, 2026-2027 Concert Tour Dates | Ticketmaster"
          className="w-full h-full border-0 absolute inset-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
};
