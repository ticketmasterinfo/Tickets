import React from 'react';
import { Ticket, Sparkles, ChevronRight, Star } from 'lucide-react';
import { EventItem } from '../../types';

interface HeroHighlightsProps {
  onSelectEvent: (event?: EventItem) => void;
  onExploreCategory: (category: string) => void;
}

export const HeroHighlights: React.FC<HeroHighlightsProps> = ({
  onSelectEvent,
  onExploreCategory
}) => {
  const spotlights = [
    {
      id: 'wicked-musical',
      title: 'WICKED The Musical',
      subtitle: 'See the full story live on stage',
      category: 'Broadway',
      imageUrl: 'https://s3.us-east-1.amazonaws.com/prd3318.tmp-digital-assets.prod.us-east-1.tmaws/assets/Wicked-720x405.jpg?fit=cover&optimize=high&auto=webp',
      fallbackImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=720&q=80',
      badge: 'Broadway Phenomenon'
    },
    {
      id: 'vip-guide',
      title: 'Browse Available VIP Packages',
      subtitle: 'Meet & Greets, Special Access and more',
      category: 'VIP Experiences',
      imageUrl: 'https://s3.us-east-1.amazonaws.com/prd3318.tmp-digital-assets.prod.us-east-1.tmaws/assets/VIP-Guide-720x405.jpg?fit=cover&optimize=high&auto=webp',
      fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=720&q=80',
      badge: 'VIP Access'
    },
    {
      id: 'blueys-big-play',
      title: "Bluey's Big Play",
      subtitle: "Children's Theatre Live on Stage",
      category: 'Family',
      imageUrl: 'https://s1.ticketm.net/dam/a/4d4/d963b745-c842-4a74-8678-58e1508774d4_TABLET_LANDSCAPE_LARGE_16_9.jpg?fit=cover&optimize=high&auto=webp',
      fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=720&q=80',
      badge: 'All Ages'
    },
    {
      id: 'disney-worlds-collide',
      title: 'Disney Worlds Collide Concert Tour',
      subtitle: 'The ultimate orchestral Disney journey',
      category: 'Concerts',
      imageUrl: 'https://s1.ticketm.net/dam/a/d49/63d21920-3adb-4160-a213-72eb06965d49_TABLET_LANDSCAPE_LARGE_16_9.jpg?fit=cover&optimize=high&auto=webp',
      fallbackImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=720&q=80',
      badge: 'Touring Live'
    }
  ];

  return (
    <section aria-label="Highlights" className="w-full bg-[#121212] pt-4 pb-6 px-4 md:px-8 border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Promoted Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-black border border-white/10 group mb-4">
          <div 
            data-testid="tmPromotedHero"
            onClick={() => onSelectEvent()}
            className="block cursor-pointer relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex flex-col justify-end p-6 sm:p-8"
          >
            {/* Background artwork */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url("https://s3.us-east-1.amazonaws.com/prd3318.tmp-digital-assets.prod.us-east-1.tmaws/assets/Lawn26_TM_v2.jpg?fit=cover&optimize=high&auto=webp"), url("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80")`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl space-y-2">
              <div className="inline-flex items-center space-x-2 bg-[#ffb932] text-black font-black text-xs uppercase px-3 py-1 rounded tracking-wider shadow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>On Sale Now</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                2 Concert Tickets for $55
              </h1>
              <p className="text-sm sm:text-base text-gray-200 max-w-xl font-medium">
                Live Nation Summer of Live presents lawn passes and reserved 2-packs for over 1,000 summer amphitheater shows.
              </p>
              <div className="pt-2 flex items-center space-x-3">
                <span className="bg-[#024ddf] hover:bg-[#0139a7] text-white font-bold text-sm px-5 py-2.5 rounded-lg inline-flex items-center space-x-2 transition-all shadow-md group-hover:bg-[#0139a7]">
                  <Ticket className="w-4 h-4" />
                  <span>Get Offer Tickets</span>
                </span>
                <span className="text-xs text-gray-300 font-semibold underline underline-offset-4">
                  Terms & participating venues apply
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Promoted Spotlights (4 cards below hero) */}
        <div data-testid="tmPromotedSpotlights" className="w-full">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 list-none p-0 m-0">
            {spotlights.map((spot) => (
              <li key={spot.id} className="w-full">
                <div 
                  onClick={() => onExploreCategory(spot.category)}
                  className="group bg-[#1a1a1a] hover:bg-[#242424] rounded-xl overflow-hidden border border-gray-800/80 transition-all duration-200 cursor-pointer shadow hover:shadow-lg flex flex-col h-full"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
                    <img 
                      src={spot.imageUrl} 
                      alt={spot.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = spot.fallbackImage;
                      }}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-white/10">
                      {spot.badge}
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-blue-400 block truncate">
                        {spot.subtitle}
                      </span>
                      <h2 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1 mt-0.5">
                        {spot.title}
                      </h2>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors">
                      <span className="font-semibold text-[11px]">View Experience</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};
