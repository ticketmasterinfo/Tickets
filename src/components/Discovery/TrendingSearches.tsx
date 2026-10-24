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
    name: 'Calvin Harris',
    genre: 'Pop',
    imageUrl: '/assets/aistudio/IMG_6648_6f59728a.jpeg',
    fallbackImage: '/assets/aistudio/IMG_6648_6f59728a.jpeg'
  },
  {
    name: 'Olivia Rodrigo',
    genre: 'Pop',
    imageUrl: 'https://s1.ticketm.net/dam/a/4e1/ca96dd03-8def-46ae-b6d3-9441e992c4e1_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Metallica',
    genre: 'Metal',
    imageUrl: 'https://s1.ticketm.net/dam/a/6bf/4d98a9bf-2443-4152-8137-143cfa25a6bf_1853051_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Cleo Sol',
    genre: 'R&B',
    imageUrl: 'https://s1.ticketm.net/dam/a/82f/b6f0776e-6170-49be-9bc5-b7a35101582f_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Don Omar',
    genre: 'Hip-Hop/Rap',
    imageUrl: 'https://s1.ticketm.net/dam/a/176/29d3d08d-14df-40be-a440-7cbb72a81176_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Zach Bryan',
    genre: 'Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/850/f400c343-3cd9-4de6-9963-041005084850_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Rod Wave',
    genre: 'Hip-Hop/Rap',
    imageUrl: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'The Wizard of Oz at Sphere',
    genre: 'Spectacular',
    imageUrl: 'https://s1.ticketm.net/dam/a/411/3f944dde-1402-4026-9e41-80c1b5d25411_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Saba',
    genre: 'Hip-Hop/Rap',
    imageUrl: 'https://s1.ticketm.net/dam/a/406/a6ea184d-c130-4667-bf93-78fb9ca06406_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'SIENNA SPIRO',
    genre: 'Pop',
    imageUrl: 'https://s1.ticketm.net/dam/a/b07/09e0979d-7b3d-4cd4-badf-67d6ced79b07_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=640&q=80'
  }
];

interface TrendingSearchesProps {
  onSelectPerformer: (name: string) => void;
}

export const TrendingSearches: React.FC<TrendingSearchesProps> = ({ onSelectPerformer }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section data-testid="trending-search-carousel" aria-label="Trending Searches" className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Trending Searches
        </h2>

        {/* Carousel controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-xs transition-colors cursor-pointer"
            aria-label="Previous Items"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-xs transition-colors cursor-pointer"
            aria-label="Next items"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
        role="region"
        aria-label="Trending attractions"
      >
        {TRENDING_SEARCHES_DATA.map((item, index) => (
          <div
            key={item.name}
            onClick={() => onSelectPerformer(item.name)}
            className="min-w-[170px] sm:min-w-[210px] md:min-w-[230px] shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            {/* 16:9 Image Container */}
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.name}
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = item.fallbackImage;
                }}
              />
              <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold flex items-center justify-center">
                {index + 1}
              </span>
            </div>

            {/* Meta */}
            <div className="p-3">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                {item.genre}
              </span>
              <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-[#024ddf] transition-colors truncate mt-0.5">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
