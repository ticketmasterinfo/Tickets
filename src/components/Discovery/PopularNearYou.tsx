import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PopularPerformerItem {
  name: string;
  genre: string;
  imageUrl: string;
  fallbackImage: string;
}

export const POPULAR_CONCERTS: PopularPerformerItem[] = [
  {
    name: 'Oasis',
    genre: 'Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/f3b/4e5c700e-50bb-4b8c-9673-9e4f9f2bef3b_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Eagles',
    genre: 'Pop',
    imageUrl: 'https://s1.ticketm.net/dam/a/531/e32ef1da-b869-442c-9357-428baa6f0531_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'JAŸ-Z',
    genre: 'Urban',
    imageUrl: 'https://s1.ticketm.net/dam/a/4ec/1e6d3beb-bfd6-4d63-a460-63cb6125f4ec_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Zach Bryan',
    genre: 'Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/850/f400c343-3cd9-4de6-9963-041005084850_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Metallica',
    genre: 'Heavy Metal',
    imageUrl: 'https://s1.ticketm.net/dam/a/6bf/4d98a9bf-2443-4152-8137-143cfa25a6bf_1853051_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Lady A',
    genre: 'Country',
    imageUrl: 'https://s1.ticketm.net/dam/a/8e0/15e0d087-63ae-4e60-af6e-8f5bce1df8e0_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Harry Styles',
    genre: 'Pop Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'The Spinners',
    genre: 'R&B',
    imageUrl: 'https://s1.ticketm.net/dam/a/db5/bb0c5c84-2a51-4c64-8f4a-6371d39f1db5_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Rod Wave',
    genre: 'Hip-Hop/Rap',
    imageUrl: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Dave Matthews Band',
    genre: 'Alternative Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/2da/c2fd9e5f-8dbd-49d4-b762-bf4efee282da_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=640&q=80'
  }
];

export const POPULAR_SPORTS: PopularPerformerItem[] = [
  {
    name: 'Brooklyn Nets',
    genre: 'NBA',
    imageUrl: 'https://s1.ticketm.net/dam/a/593/de5707a0-fc3b-4ad8-bdfc-4f880b488593_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Phoenix Suns',
    genre: 'NBA',
    imageUrl: 'https://s1.ticketm.net/dam/a/c62/0636ff21-e369-4b8c-bee4-214ea0a81c62_1339761_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Golden State Warriors',
    genre: 'NBA',
    imageUrl: 'https://s1.ticketm.net/dam/a/c26/f3bc3686-a6c2-4324-a6cb-18ab2441ac26_1339991_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Atlanta Hawks',
    genre: 'NBA',
    imageUrl: 'https://s1.ticketm.net/dam/a/ae2/5beb62d8-2c29-4c5c-aa7d-c7513e229ae2_1340121_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Miami Heat',
    genre: 'NBA',
    imageUrl: 'https://s1.ticketm.net/dam/a/599/f9331497-7667-4f9d-9d26-d144cb25a599_1339911_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Charlotte Hornets',
    genre: 'NBA',
    imageUrl: 'https://s1.ticketm.net/dam/a/f48/2869041d-ebac-48fb-bf4f-54e797fa4f48_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Orlando Magic',
    genre: 'NBA',
    imageUrl: 'https://s1.ticketm.net/dam/a/f63/ea7f23c1-c9b2-4f85-9f98-535efd9d0f63_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'San Antonio Spurs',
    genre: 'NBA',
    imageUrl: 'https://s1.ticketm.net/dam/a/455/612b13a2-822a-4cda-9920-098692170455_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Las Vegas Raiders',
    genre: 'NFL',
    imageUrl: 'https://s1.ticketm.net/dam/a/608/ad100b89-b729-4822-8165-5b626c21a608_1325251_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'FORMULA 1 HEINEKEN LAS VEGAS GRAND PRIX',
    genre: 'Motorsports/Racing',
    imageUrl: 'https://s1.ticketm.net/dam/a/2ec/8acf8dc4-31ec-4416-a738-a79e9a0b22ec_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=640&q=80'
  }
];

export const POPULAR_ARTS: PopularPerformerItem[] = [
  {
    name: 'Long Beach Symphony Pops',
    genre: 'Symphonic',
    imageUrl: 'https://s1.ticketm.net/dam/a/faa/8f1da435-0ffe-48c7-96b4-6c935dfb4faa_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Hamilton (Touring)',
    genre: 'Musical',
    imageUrl: 'https://s1.ticketm.net/dam/a/d7a/6ffed4d3-61d3-44c3-8e63-cc776582fd7a_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Hamilton (NY)',
    genre: 'Musical',
    imageUrl: 'https://s1.ticketm.net/dam/a/00f/b9aebee0-d1cb-4a5c-8e0e-0ca03fd4d00f_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Disney On Ice presents Find Your Hero',
    genre: 'Ice Shows',
    imageUrl: 'https://s1.ticketm.net/dam/a/d43/8a728326-0f79-42d0-bd75-8af0a7dd6d43_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Giggly Squad Podcast Live',
    genre: 'Comedy',
    imageUrl: 'https://s1.ticketm.net/dam/a/44d/39734d5a-9a35-4b6c-b492-0026e295044d_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Dave Chappelle',
    genre: 'Comedy',
    imageUrl: 'https://s1.ticketm.net/dam/a/e69/931eff58-62a7-4240-adb3-cf67a084ee69_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'John Mulaney',
    genre: 'Comedy',
    imageUrl: 'https://s1.ticketm.net/dam/a/b30/ccd9ebe2-c301-4487-bbe4-5bd6be744b30_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'The Wizard of Oz at Sphere',
    genre: 'Spectacular',
    imageUrl: 'https://s1.ticketm.net/dam/a/411/3f944dde-1402-4026-9e41-80c1b5d25411_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Franco Escamilla',
    genre: 'Comedy',
    imageUrl: 'https://s1.ticketm.net/dam/a/888/c17d98b9-4505-4332-8ec0-475dd6f41888_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Matt Rife',
    genre: 'Comedy',
    imageUrl: 'https://s1.ticketm.net/dam/a/238/b3bb5076-6b92-45d8-b5a5-e5e700a50238_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=640&q=80'
  }
];

export const POPULAR_FAMILY: PopularPerformerItem[] = [
  {
    name: 'Disney On Ice presents Find Your Hero',
    genre: 'Ice Shows',
    imageUrl: 'https://s1.ticketm.net/dam/a/d43/8a728326-0f79-42d0-bd75-8af0a7dd6d43_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Coachella Valley Music and Arts Festival',
    genre: 'Alternative Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/057/3dc88133-61df-47f6-9665-f3a83a4dd057_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'PBR: Unleash the Beast',
    genre: 'Bullriding',
    imageUrl: 'https://s1.ticketm.net/dam/a/b04/3b084064-27f7-42f3-ade1-1964f41fab04_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Westminster Kennel Club Dog Show',
    genre: 'Other',
    imageUrl: 'https://s1.ticketm.net/dam/a/fe3/376c1774-f232-4aea-a6fc-7e389a4d8fe3_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'The Hondo Rodeo Fest',
    genre: 'Rodeo',
    imageUrl: 'https://s1.ticketm.net/dam/a/c11/66d1c452-63a9-4833-8181-3d6173fedc11_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Disney On Ice presents Magic in the Stars',
    genre: 'Ice Shows',
    imageUrl: 'https://s1.ticketm.net/dam/a/654/b07e2979-e523-483b-a209-ba7c1c04a654_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Harlem Globetrotters',
    genre: 'Other',
    imageUrl: 'https://s1.ticketm.net/dam/a/0ba/19c51120-81c3-4dd5-895e-d79e286e40ba_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Disney On Ice presents Spotlight Magic!',
    genre: 'Ice Shows',
    imageUrl: 'https://s1.ticketm.net/dam/a/2c5/afcac6d1-4de4-4bb1-9cc9-e460577b72c5_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Ringling Bros. and Barnum & Bailey',
    genre: 'Circus',
    imageUrl: 'https://s1.ticketm.net/dam/a/de7/abc62c6e-d466-44bf-a399-ec30e3875de7_RETINA_PORTRAIT_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80'
  }
];

export interface PopularNearYouItem extends PopularPerformerItem {
  categoryTab: 'concerts' | 'sports' | 'arts' | 'family';
}

export const POPULAR_NEAR_YOU_DATA: PopularNearYouItem[] = [
  ...POPULAR_CONCERTS.map(c => ({ ...c, categoryTab: 'concerts' as const })),
  ...POPULAR_SPORTS.map(s => ({ ...s, categoryTab: 'sports' as const })),
  ...POPULAR_ARTS.map(a => ({ ...a, categoryTab: 'arts' as const })),
  ...POPULAR_FAMILY.map(f => ({ ...f, categoryTab: 'family' as const })),
];

interface PopularNearYouProps {
  onSelectCategory: (category: string) => void;
  onSelectPerformer: (name: string) => void;
}

export const PopularNearYou: React.FC<PopularNearYouProps> = ({
  onSelectCategory,
  onSelectPerformer
}) => {
  const [activeTab, setActiveTab] = React.useState<'Concerts' | 'Sports' | 'Arts' | 'Family'>('Concerts');
  const scrollRef = useRef<HTMLDivElement>(null);

  const getActiveList = () => {
    switch (activeTab) {
      case 'Concerts': return POPULAR_CONCERTS;
      case 'Sports': return POPULAR_SPORTS;
      case 'Arts': return POPULAR_ARTS;
      case 'Family': return POPULAR_FAMILY;
    }
  };

  const getCategoryTitle = () => {
    switch (activeTab) {
      case 'Concerts': return 'Concerts';
      case 'Sports': return 'Sports';
      case 'Arts': return 'Arts, Theater & Comedy';
      case 'Family': return 'Family';
    }
  };

  const getTargetCategoryKey = () => {
    switch (activeTab) {
      case 'Concerts': return 'Concerts';
      case 'Sports': return 'Sports';
      case 'Arts': return 'Arts & Theater';
      case 'Family': return 'Family';
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section data-testid="popularTickets" aria-label="Popular Near You" className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Popular Near You
        </h2>
      </div>

      {/* Category Pills Header with See All & Arrows */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-gray-100">
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
          {(['Concerts', 'Sports', 'Arts', 'Family'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#024ddf] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab === 'Arts' ? 'Arts & Theater' : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <button
            onClick={() => onSelectCategory(getTargetCategoryKey())}
            className="text-xs sm:text-sm font-bold text-[#024ddf] hover:underline cursor-pointer"
          >
            See All {getCategoryTitle()}
          </button>

          <div className="flex items-center space-x-1.5">
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
      </div>

      {/* Carousel of 10 items */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
      >
        {getActiveList().map(item => (
          <div
            key={item.name}
            onClick={() => onSelectPerformer(item.name)}
            className="min-w-[170px] sm:min-w-[210px] md:min-w-[230px] shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = item.fallbackImage;
                }}
              />
            </div>
            <div className="p-3">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                {item.genre}
              </span>
              <h4 className="text-sm font-extrabold text-gray-900 group-hover:text-[#024ddf] transition-colors truncate mt-0.5">
                {item.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
