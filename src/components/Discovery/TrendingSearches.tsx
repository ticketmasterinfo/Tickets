import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface TrendingSearchItem {
  name: string;
  genre: string;
  imageUrl: string;
  fallbackImage: string;
}

export const TRENDING_SEARCHES_DATA: TrendingSearchItem[] = [
  {
    name: 'Harry Styles',
    genre: 'Pop',
    imageUrl: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Rod Wave',
    genre: 'Hip-Hop/Rap',
    imageUrl: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Dave Chappelle',
    genre: 'Comedy',
    imageUrl: 'https://s1.ticketm.net/dam/a/e69/931eff58-62a7-4240-adb3-cf67a084ee69_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'RUSH',
    genre: 'Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/6bd/c02199ad-8d22-4668-8973-f400d85826bd_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Monster Jam',
    genre: 'Motorsports/Racing',
    imageUrl: 'https://s1.ticketm.net/dam/a/648/bee96ceb-7d32-4b5d-bb15-6a8615501648_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Trans-Siberian Orchestra',
    genre: 'Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/e8b/b5409ed1-4af0-44a7-bccd-83fef3b0ae8b_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Andrea Bocelli',
    genre: 'Classical',
    imageUrl: 'https://s1.ticketm.net/dam/a/ccc/9450d9ad-b5a8-45a0-9359-7ee4993f0ccc_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Malcolm Todd',
    genre: 'Alternative',
    imageUrl: 'https://s1.ticketm.net/dam/a/237/2144a2e6-e59d-4ed1-8ae7-ea630b1f4237_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Gorillaz',
    genre: 'Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/88b/ce224ebd-7acf-4b04-8f04-0038dddc988b_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Phoebe Bridgers',
    genre: 'Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/8bf/03985c53-fb10-4d38-ab4f-662df14e78bf_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=640&q=80'
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#121212] tracking-tight">
            Trending Searches
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Most in-demand artists and upcoming attractions this week
          </p>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Previous Items"
            className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Next items"
            className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors shadow-xs"
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
        {TRENDING_SEARCHES_DATA.map((item, index) => (
          <div 
            key={item.name}
            onClick={() => onSelectPerformer(item.name)}
            className="shrink-0 w-[170px] sm:w-[210px] md:w-[230px] snap-start group cursor-pointer"
          >
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-gray-200 shadow-xs border border-gray-200">
              <img 
                src={item.imageUrl} 
                alt={item.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = item.fallbackImage;
                }}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="pt-2 px-0.5">
              <span className="inline-block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                {item.genre}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#024ddf] transition-colors truncate">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
