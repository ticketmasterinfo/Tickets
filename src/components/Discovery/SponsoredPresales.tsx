import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

export interface PresaleOfferItem {
  id: string;
  artist: string;
  venue: string;
  city: string;
  state: string;
  eventDate: string;
  presaleDate: string;
  sponsorName: string;
  imageUrl: string;
  fallbackImage: string;
}

export const SPONSORED_PRESALES_DATA: PresaleOfferItem[] = [
  {
    id: 'interpol-tour',
    artist: 'Interpol - North America Tour 2027',
    venue: 'The Met Presented by Highmark',
    city: 'Philadelphia',
    state: 'PA',
    eventDate: 'Fri • Mar 26 • 8:00 PM',
    presaleDate: 'Wed • Oct 28 • 10:00 AM',
    sponsorName: 'citi',
    imageUrl: 'https://s1.ticketm.net/dam/a/8e9/0abb8d34-41fa-46e8-936e-03b5db3818e9_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=720&q=80'
  },
  {
    id: 'chvrches-live',
    artist: 'CHVRCHES: LIVE 2027',
    venue: 'Hollywood Palladium',
    city: 'Hollywood',
    state: 'CA',
    eventDate: 'Sun • Mar 14 • 7:00 PM',
    presaleDate: 'Tue • Oct 27 • 10:00 AM',
    sponsorName: 'citi',
    imageUrl: 'https://s1.ticketm.net/dam/a/c8e/0b4a619b-3da4-4618-8a83-b1c33139ec8e_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=720&q=80'
  },
  {
    id: '2hollis-tour',
    artist: '2hollis: The Pirouette Tour',
    venue: 'Aragon Ballroom',
    city: 'Chicago',
    state: 'IL',
    eventDate: 'Tue • Feb 09 • 8:00 PM',
    presaleDate: 'Tue • Oct 27 • 10:00 AM',
    sponsorName: 'citi',
    imageUrl: 'https://s1.ticketm.net/dam/a/621/8a06caf3-b1e7-4c48-9b33-bdb0c32ad621_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=720&q=80'
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
      className="my-6 w-full"
    >
      {/* Header with location selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Sponsored Presales and Offers
          </h2>
        </div>

        <div 
          className="inline-flex items-center space-x-1.5 text-xs text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg cursor-pointer transition-colors shadow-xs"
          onClick={onOpenCitySelector}
        >
          <MapPin className="w-3.5 h-3.5 text-[#024ddf]" />
          <span>Near <strong className="text-gray-900">Select your location</strong></span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>
      </div>

      {/* 3 Presale Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SPONSORED_PRESALES_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectEvent(item.artist)}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Image Container with Presale Badge */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.artist}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.fallbackImage;
                  }}
                />
                <span className="absolute top-2 left-2 text-[10px] font-black uppercase tracking-wider bg-[#024ddf] text-white px-2 py-0.5 rounded shadow-sm">
                  Presale
                </span>
              </div>

              {/* Card Meta */}
              <div className="p-4 space-y-1">
                <div className="text-xs font-bold text-gray-500">
                  {item.eventDate}
                </div>
                <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-[#024ddf] transition-colors leading-tight line-clamp-1">
                  {item.artist}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {item.city}, {item.state} &bull; {item.venue}
                </p>
              </div>
            </div>

            {/* Sponsor Bottom Strip */}
            <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] text-blue-900">
                <span className="text-base font-black italic tracking-tighter text-[#002d72]">citi</span>
              </div>
              <div className="text-[11px] font-semibold text-gray-600">
                {item.presaleDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
