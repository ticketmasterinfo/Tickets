import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Ticket, Sparkles } from 'lucide-react';

export interface TrendingSearchItem {
  name: string;
  genre: string;
  imageUrl: string;
  fallbackImage: string;
  datesCount?: number;
  badge?: string;
}

export const TRENDING_SEARCHES_DATA: TrendingSearchItem[] = [
  {
    name: 'Harry Styles',
    genre: 'Pop / Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80',
    datesCount: 5,
    badge: 'WORLD TOUR'
  },
  {
    name: 'Rod Wave',
    genre: 'Hip-Hop/Rap',
    imageUrl: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=640&q=80',
    datesCount: 6,
    badge: 'ARENA TOUR'
  },
  {
    name: 'Dave Chappelle',
    genre: 'Comedy',
    imageUrl: 'https://s1.ticketm.net/dam/a/e69/931eff58-62a7-4240-adb3-cf67a084ee69_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=640&q=80',
    datesCount: 4,
    badge: 'LIVE STAND-UP'
  },
  {
    name: 'RUSH',
    genre: 'Classic Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/6bd/c02199ad-8d22-4668-8973-f400d85826bd_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=640&q=80',
    datesCount: 6,
    badge: '50TH ANNIVERSARY'
  },
  {
    name: 'Monster Jam',
    genre: 'Motorsports',
    imageUrl: 'https://s1.ticketm.net/dam/a/648/bee96ceb-7d32-4b5d-bb15-6a8615501648_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=640&q=80',
    datesCount: 8,
    badge: 'STADIUM SPECTACLE'
  },
  {
    name: 'Trans-Siberian Orchestra',
    genre: 'Holiday Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/e8b/b5409ed1-4af0-44a7-bccd-83fef3b0ae8b_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=640&q=80',
    datesCount: 12,
    badge: 'WINTER TOUR'
  },
  {
    name: 'Andrea Bocelli',
    genre: 'Classical Vocal',
    imageUrl: 'https://s1.ticketm.net/dam/a/ccc/9450d9ad-b5a8-45a0-9359-7ee4993f0ccc_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=640&q=80',
    datesCount: 6,
    badge: 'EXCLUSIVE CONCERTS'
  },
  {
    name: 'Malcolm Todd',
    genre: 'Alternative / Indie',
    imageUrl: 'https://s1.ticketm.net/dam/a/237/2144a2e6-e59d-4ed1-8ae7-ea630b1f4237_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=640&q=80',
    datesCount: 5,
    badge: 'THE SWEET BOY TOUR'
  },
  {
    name: 'Gorillaz',
    genre: 'Alternative Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/88b/ce224ebd-7acf-4b04-8f04-0038dddc988b_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=640&q=80',
    datesCount: 6,
    badge: 'LIVE SPECTACLE'
  },
  {
    name: 'Phoebe Bridgers',
    genre: 'Indie Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/8bf/03985c53-fb10-4d38-ab4f-662df14e78bf_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=640&q=80',
    datesCount: 6,
    badge: 'SPECIAL DATES'
  }
];

interface TrendingSearchesProps {
  onSelectPerformer: (name: string) => void;
}

export const TrendingSearches: React.FC<TrendingSearchesProps> = ({ onSelectPerformer }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      data-testid="trending-search-carousel" 
      className="my-8 w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-3">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="bg-[#024ddf]/10 text-[#024ddf] border border-[#024ddf]/20 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
              Verified Performer Hub
            </span>
            <span className="text-[11px] font-semibold text-[#00875a] flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00875a] mr-1.5 animate-pulse"></span>
              All Tour Dates Live
            </span>
          </div>
          <h2 className="type-everest text-[#121212] font-black tracking-tight">
            Trending Searches
          </h2>
          <p className="type-etna text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Most in-demand artists and upcoming attractions this week. Click any artist to explore their full tour page, complete date schedule, and verified tickets.
          </p>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Previous Items"
            className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors shadow-xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Next items"
            className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors shadow-xs cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Snap Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TRENDING_SEARCHES_DATA.map((item) => (
          <div 
            key={item.name}
            onClick={() => onSelectPerformer(item.name)}
            className="shrink-0 w-[170px] sm:w-[210px] md:w-[230px] snap-start group cursor-pointer bg-white rounded-xl p-2 border border-gray-200 hover:border-[#024ddf] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-gray-200 shadow-xs border border-gray-100">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = item.fallbackImage;
                }}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {item.badge && (
                <span className="absolute top-2 left-2 bg-[#121212]/85 backdrop-blur-xs text-[#ffb932] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
                  {item.badge}
                </span>
              )}
              <span className="absolute bottom-2 left-2 bg-[#024ddf]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center space-x-1">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{item.datesCount || 6} Tour Dates</span>
              </span>
            </div>

            <div className="pt-2 px-1 space-y-1">
              <span className="type-snowdon text-gray-500 block truncate">
                {item.genre}
              </span>
              <h3 className="type-blanc font-bold text-gray-900 group-hover:text-[#024ddf] transition-colors truncate">
                {item.name}
              </h3>
              <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-[#024ddf]">
                <span>View Tour & Tickets</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
