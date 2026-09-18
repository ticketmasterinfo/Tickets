import React from 'react';
import { MapPin, ChevronDown, Ticket, Sparkles } from 'lucide-react';

export interface PresaleOfferItem {
  id: string;
  artist: string;
  venue: string;
  city: string;
  state: string;
  eventDate: string;
  eventTime: string;
  presaleDate: string;
  presaleTime: string;
  sponsorName: string;
  imageUrl: string;
  fallbackImage: string;
  link: string;
}

export const SPONSORED_PRESALES_DATA: PresaleOfferItem[] = [
  {
    id: 'metallica-m72',
    artist: 'Metallica M72 World Tour',
    venue: 'Lucas Oil Stadium',
    city: 'Indianapolis',
    state: 'IN',
    eventDate: 'Sat, Jun 05, 2027',
    eventTime: '6:00 PM',
    presaleDate: 'Tue, Sep 22, 2026',
    presaleTime: '10:00 AM',
    sponsorName: 'citi',
    imageUrl: 'https://s1.ticketm.net/dam/a/6bf/4d98a9bf-2443-4152-8137-143cfa25a6bf_1853051_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=720&q=80',
    link: '#concerts'
  },
  {
    id: 'alan-walker',
    artist: 'Alan Walker - Walkerworld Tour',
    venue: 'Aragon Ballroom',
    city: 'Chicago',
    state: 'IL',
    eventDate: 'Fri, Feb 26, 2027',
    eventTime: '6:00 PM',
    presaleDate: 'Tue, Sep 15, 2026',
    presaleTime: '10:00 AM',
    sponsorName: 'citi',
    imageUrl: 'https://s1.ticketm.net/dam/a/0f3/1a6bf720-a01b-4cb5-9225-e4f07b5bb0f3_1684911_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=720&q=80',
    link: '#concerts'
  },
  {
    id: 'rhiannon-giddens',
    artist: 'Rhiannon Giddens Live in Concert',
    venue: 'The Wiltern',
    city: 'Los Angeles',
    state: 'CA',
    eventDate: 'Sat, Feb 13, 2027',
    eventTime: '7:00 PM',
    presaleDate: 'Tue, Sep 15, 2026',
    presaleTime: '10:00 AM',
    sponsorName: 'citi',
    imageUrl: 'https://s1.ticketm.net/dam/a/3a5/55aa9e8e-e22d-4d25-868b-d692810473a5_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=720&q=80',
    link: '#concerts'
  }
];

interface SponsoredPresalesProps {
  onSelectEvent: (artist: string) => void;
  onOpenCitySelector?: () => void;
}

export const SponsoredPresales: React.FC<SponsoredPresalesProps> = ({ 
  onSelectEvent,
  onOpenCitySelector
}) => {
  return (
    <section 
      id="sponsorship-presales"
      data-testid="sponsorship-presales" 
      className="my-8 w-full bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-xs"
    >
      {/* Header with location selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-gray-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#121212] tracking-tight">
            Sponsored Presales and Offers
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Cardmember access, early unlock codes, and official partner presale windows
          </p>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
          onClick={onOpenCitySelector}
        >
          <MapPin className="w-3.5 h-3.5 text-[#024ddf]" />
          <span>Near <strong className="text-gray-900">All of United States</strong></span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>
      </div>

      {/* Grid of Presale Offer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SPONSORED_PRESALES_DATA.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelectEvent(item.artist)}
            className="group bg-[#fcfcfc] rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Image & Presale Badge */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
                <img 
                  src={item.imageUrl} 
                  alt={item.artist}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.fallbackImage;
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-[#00875a] text-white text-[11px] font-black uppercase px-2 py-0.5 rounded shadow">
                    Presale
                  </span>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-4 space-y-1">
                <span className="text-xs font-semibold text-gray-500 block">
                  {item.eventDate} &bull; {item.eventTime}
                </span>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#024ddf] transition-colors line-clamp-1">
                  {item.artist}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {item.city}, {item.state} &bull; {item.venue}
                </p>
              </div>
            </div>

            {/* Sponsor Bottom Bar */}
            <div className="p-3.5 bg-gray-50 border-t border-gray-200/80 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Citi stylized blue badge */}
                <div className="bg-[#002d72] text-white px-2 py-0.5 rounded font-black text-xs tracking-tighter italic shadow-xs">
                  citi
                </div>
                <div className="text-[11px] text-gray-600">
                  <span className="font-bold text-gray-900 block leading-tight">Citi Cardmember Presale</span>
                  <span>{item.presaleDate} &bull; {item.presaleTime}</span>
                </div>
              </div>

              <span className="text-xs font-bold text-[#024ddf] group-hover:underline flex items-center shrink-0">
                Unlock
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
