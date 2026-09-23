import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar } from 'lucide-react';

export interface PopularPerformerItem {
  name: string;
  genre: string;
  imageUrl: string;
  fallbackImage: string;
}

export const POPULAR_CONCERTS: PopularPerformerItem[] = [
  {
    name: 'Eagles',
    genre: 'Pop / Classic Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/531/e32ef1da-b869-442c-9357-428baa6f0531_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'JAŸ-Z',
    genre: 'Urban / Hip-Hop',
    imageUrl: 'https://s1.ticketm.net/dam/a/4ec/1e6d3beb-bfd6-4d63-a460-63cb6125f4ec_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Metallica',
    genre: 'Heavy Metal',
    imageUrl: 'https://s1.ticketm.net/dam/a/6bf/4d98a9bf-2443-4152-8137-143cfa25a6bf_1853051_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Lady A',
    genre: 'Country',
    imageUrl: 'https://s1.ticketm.net/dam/a/8e0/15e0d087-63ae-4e60-af6e-8f5bce1df8e0_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Usher & Chris Brown',
    genre: 'R&B / Pop',
    imageUrl: 'https://s1.ticketm.net/dam/a/67a/76f9a65d-a143-45df-b4c1-0a175847a67a_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'The Spinners',
    genre: 'R&B / Soul',
    imageUrl: 'https://s1.ticketm.net/dam/a/db5/bb0c5c84-2a51-4c64-8f4a-6371d39f1db5_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Commodores',
    genre: 'R&B / Funk',
    imageUrl: 'https://s1.ticketm.net/dam/a/785/51aca37f-e3d1-42cb-92d6-b4bcee3d8785_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Harry Styles',
    genre: 'Pop Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Zach Bryan',
    genre: 'Rock / Country',
    imageUrl: 'https://s1.ticketm.net/dam/a/d53/b1e86f30-38b9-460a-9674-828320d8ed53_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Dave Matthews Band',
    genre: 'Alternative Rock',
    imageUrl: 'https://s1.ticketm.net/dam/a/2da/c2fd9e5f-8dbd-49d4-b762-bf4efee282da_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=640&q=80'
  }
];

export const POPULAR_SPORTS: PopularPerformerItem[] = [
  {
    name: 'Brooklyn Nets',
    genre: 'NBA Basketball',
    imageUrl: 'https://s1.ticketm.net/dam/a/593/de5707a0-fc3b-4ad8-bdfc-4f880b488593_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Atlanta Hawks',
    genre: 'NBA Basketball',
    imageUrl: 'https://s1.ticketm.net/dam/a/ae2/5beb62d8-2c29-4c5c-aa7d-c7513e229ae2_1340121_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Phoenix Suns',
    genre: 'NBA Basketball',
    imageUrl: 'https://s1.ticketm.net/dam/a/c62/0636ff21-e369-4b8c-bee4-214ea0a81c62_1339761_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Golden State Warriors',
    genre: 'NBA Basketball',
    imageUrl: 'https://s1.ticketm.net/dam/a/c26/f3bc3686-a6c2-4324-a6cb-18ab2441ac26_1339991_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Miami Heat',
    genre: 'NBA Basketball',
    imageUrl: 'https://s1.ticketm.net/dam/a/599/f9331497-7667-4f9d-9d26-d144cb25a599_1339911_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'FORMULA 1 HEINEKEN LAS VEGAS GRAND PRIX',
    genre: 'Motorsports / Racing',
    imageUrl: 'https://s1.ticketm.net/dam/a/2ec/8acf8dc4-31ec-4416-a738-a79e9a0b22ec_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=640&q=80'
  }
];

export const POPULAR_THEATER: PopularPerformerItem[] = [
  {
    name: 'Hamilton (Broadway & Tour)',
    genre: 'Musical Theatre',
    imageUrl: 'https://s1.ticketm.net/dam/a/d7a/6ffed4d3-61d3-44c3-8e63-cc776582fd7a_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Harry Potter and the Cursed Child',
    genre: 'Broadway Drama',
    imageUrl: 'https://s1.ticketm.net/dam/a/cd1/143791c4-1f21-4707-8dcd-0ecccbf00cd1_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Dave Chappelle',
    genre: 'Stand-Up Comedy',
    imageUrl: 'https://s1.ticketm.net/dam/a/e69/931eff58-62a7-4240-adb3-cf67a084ee69_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'John Mulaney',
    genre: 'Stand-Up Comedy',
    imageUrl: 'https://s1.ticketm.net/dam/a/b30/ccd9ebe2-c301-4487-bbe4-5bd6be744b30_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'The Wizard of Oz at Sphere',
    genre: 'Immersive Spectacular',
    imageUrl: 'https://s1.ticketm.net/dam/a/411/3f944dde-1402-4026-9e41-80c1b5d25411_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=640&q=80'
  }
];

export const POPULAR_FAMILY: PopularPerformerItem[] = [
  {
    name: 'Disney On Ice presents Find Your Hero',
    genre: 'Ice Spectacular',
    imageUrl: 'https://s1.ticketm.net/dam/a/d43/8a728326-0f79-42d0-bd75-8af0a7dd6d43_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'PBR: Unleash the Beast',
    genre: 'Championship Bullriding',
    imageUrl: 'https://s1.ticketm.net/dam/a/b04/3b084064-27f7-42f3-ade1-1964f41fab04_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Westminster Kennel Club Dog Show',
    genre: 'Family Entertainment',
    imageUrl: 'https://s1.ticketm.net/dam/a/fe3/376c1774-f232-4aea-a6fc-7e389a4d8fe3_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Ringling Bros. and Barnum & Bailey',
    genre: 'The Greatest Show On Earth',
    imageUrl: 'https://s1.ticketm.net/dam/a/a63/78373653-b55e-4af0-be4b-45f645654a63_RETINA_PORTRAIT_16_9.jpg?width=720&height=405&fit=cover&optimize=high&auto=webp',
    fallbackImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=640&q=80'
  }
];

interface PopularNearYouProps {
  onSelectCategory: (category: string) => void;
  onSelectPerformer: (name: string) => void;
}

interface CategoryCarouselRowProps {
  title: string;
  items: PopularPerformerItem[];
  onSeeAll: () => void;
  onSelectPerformer: (name: string) => void;
}

const CategoryCarouselRow: React.FC<CategoryCarouselRowProps> = ({
  title,
  items,
  onSeeAll,
  onSelectPerformer
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: direction === 'left' ? -360 : 360,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="type-vinson font-bold text-gray-900">
          {title}
        </h3>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onSeeAll}
            className="text-xs sm:text-sm font-bold text-[#024ddf] hover:text-[#0139a7] hover:underline"
          >
            See All
          </button>
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous Items"
              className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next items"
              className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-xs"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={rowRef}
        className="flex space-x-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div 
            key={item.name}
            onClick={() => onSelectPerformer(item.name)}
            className="shrink-0 w-[180px] sm:w-[210px] snap-start group cursor-pointer bg-white rounded-xl p-2 border border-gray-200 hover:border-[#024ddf] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-xs">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = item.fallbackImage;
                }}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-2 left-2 bg-[#121212]/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center space-x-1">
                <Calendar className="w-3 h-3 mr-1 text-[#ffb932]" />
                <span>See Dates</span>
              </span>
            </div>
            <div className="pt-2 px-0.5 space-y-0.5">
              <span className="type-snowdon text-gray-500 block truncate">
                {item.genre}
              </span>
              <h4 className="type-blanc font-bold text-gray-900 group-hover:text-[#024ddf] transition-colors truncate">
                {item.name}
              </h4>
              <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-[#024ddf]">
                <span>All Dates & Tickets</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PopularNearYou: React.FC<PopularNearYouProps> = ({
  onSelectCategory,
  onSelectPerformer
}) => {
  return (
    <section 
      data-testid="popularTickets"
      className="my-10 space-y-8 w-full"
    >
      <div>
        <h2 className="type-everest text-[#121212] font-extrabold tracking-tight">
          Popular Near You
        </h2>
        <p className="type-etna text-gray-500 mt-0.5">
          Top-ranked touring acts, regional sports teams, and acclaimed stage shows
        </p>
      </div>

      {/* 1. Concerts */}
      <CategoryCarouselRow 
        title="Concerts"
        items={POPULAR_CONCERTS}
        onSeeAll={() => onSelectCategory('Concerts')}
        onSelectPerformer={onSelectPerformer}
      />

      {/* 2. Sports */}
      <CategoryCarouselRow 
        title="Sports"
        items={POPULAR_SPORTS}
        onSeeAll={() => onSelectCategory('Sports')}
        onSelectPerformer={onSelectPerformer}
      />

      {/* 3. Arts, Theater & Comedy */}
      <CategoryCarouselRow 
        title="Arts, Theater & Comedy"
        items={POPULAR_THEATER}
        onSeeAll={() => onSelectCategory('Arts & Theater')}
        onSelectPerformer={onSelectPerformer}
      />

      {/* 4. Family */}
      <CategoryCarouselRow 
        title="Family"
        items={POPULAR_FAMILY}
        onSeeAll={() => onSelectCategory('Family')}
        onSelectPerformer={onSelectPerformer}
      />
    </section>
  );
};
