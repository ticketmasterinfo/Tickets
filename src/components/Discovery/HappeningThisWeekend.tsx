import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Ticket } from 'lucide-react';
import { EventItem } from '../../types';

export interface WeekendEventItem {
  name: string;
  venue: string;
  city: string;
  state: string;
  badge: 'Today' | 'Tomorrow';
  dateDisplay: string;
  timeDisplay: string;
  imageUrl: string;
  fallbackImage: string;
  category: string;
  priceFrom: number;
}

export const HAPPENING_THIS_WEEKEND_DATA: WeekendEventItem[] = [
  {
    name: 'The Wizard of Oz at Sphere',
    venue: 'Sphere',
    city: 'Las Vegas',
    state: 'NV',
    badge: 'Today',
    dateDisplay: 'Fri, Sep 18',
    timeDisplay: '11:00 AM',
    imageUrl: 'https://s1.ticketm.net/dam/a/411/3f944dde-1402-4026-9e41-80c1b5d25411_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=720&q=80',
    category: 'Spectacular',
    priceFrom: 119
  },
  {
    name: 'Colorado Rockies vs. Seattle Mariners',
    venue: 'Coors Field',
    city: 'Denver',
    state: 'CO',
    badge: 'Today',
    dateDisplay: 'Fri, Sep 18',
    timeDisplay: '6:10 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/73f/4eacbabd-ab88-46ae-83ca-dc464216973f_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&w=720&q=80',
    category: 'Baseball',
    priceFrom: 35
  },
  {
    name: 'WWE Friday Night SmackDown',
    venue: 'Hilliard Center Arena',
    city: 'Corpus Christi',
    state: 'TX',
    badge: 'Today',
    dateDisplay: 'Fri, Sep 18',
    timeDisplay: '6:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/380/bf11c4a6-7591-40d0-babc-f357525e0380_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=720&q=80',
    category: 'Wrestling',
    priceFrom: 45
  },
  {
    name: '$uicideboy$ Present Grey Day Tour 2026',
    venue: 'American Family Insurance Amphitheater',
    city: 'Milwaukee',
    state: 'WI',
    badge: 'Today',
    dateDisplay: 'Fri, Sep 18',
    timeDisplay: '6:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/ea8/fe1025a1-d118-4c3f-b53a-29810fd0bea8_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=720&q=80',
    category: 'Hip-Hop/Rap',
    priceFrom: 65
  },
  {
    name: 'Chicago White Sox vs. Detroit Tigers',
    venue: 'Rate Field',
    city: 'Chicago',
    state: 'IL',
    badge: 'Today',
    dateDisplay: 'Fri, Sep 18',
    timeDisplay: '6:40 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/773/c14a57ed-68ec-47b8-8750-8384bc0f8773_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=720&q=80',
    category: 'Baseball',
    priceFrom: 29
  },
  {
    name: 'KAROL G - VIAJANDO POR EL MUNDO TROPITOUR',
    venue: 'MetLife Stadium',
    city: 'East Rutherford',
    state: 'NJ',
    badge: 'Today',
    dateDisplay: 'Fri, Sep 18',
    timeDisplay: '7:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/aae/d27e184b-9f69-4963-9027-d3b5572a4aae_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=720&q=80',
    category: 'Latin',
    priceFrom: 89
  },
  {
    name: 'Ed Sheeran: LOOP Tour',
    venue: 'Lincoln Financial Field',
    city: 'Philadelphia',
    state: 'PA',
    badge: 'Tomorrow',
    dateDisplay: 'Sat, Sep 19',
    timeDisplay: '5:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/7ac/222f0ea8-3b7e-4039-b40b-04a68ccde7ac_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=720&q=80',
    category: 'Pop',
    priceFrom: 79
  },
  {
    name: "Guns N' Roses: World Tour 2026",
    venue: 'Truist Park',
    city: 'Atlanta',
    state: 'GA',
    badge: 'Tomorrow',
    dateDisplay: 'Sat, Sep 19',
    timeDisplay: '6:25 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/ff0/bfc0ce5a-c7ad-4584-a30e-795584aeeff0_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=720&q=80',
    category: 'Rock',
    priceFrom: 95
  },
  {
    name: 'Bruno Mars - The Romantic Tour',
    venue: 'Hard Rock Stadium',
    city: 'Miami',
    state: 'FL',
    badge: 'Tomorrow',
    dateDisplay: 'Sat, Sep 19',
    timeDisplay: '7:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=720&q=80',
    category: 'Pop/R&B',
    priceFrom: 110
  },
  {
    name: 'J. Cole: The Fall-Off Tour',
    venue: 'American Airlines Center',
    city: 'Dallas',
    state: 'TX',
    badge: 'Tomorrow',
    dateDisplay: 'Sat, Sep 19',
    timeDisplay: '8:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/4f4/44bb1cf4-fdde-49a8-813a-440dc24234f4_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=720&q=80',
    category: 'Hip-Hop',
    priceFrom: 85
  }
];

interface HappeningThisWeekendProps {
  onSelectEvent: (name: string) => void;
}

export const HappeningThisWeekend: React.FC<HappeningThisWeekendProps> = ({ onSelectEvent }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      data-testid="hp-happening-this-week"
      className="my-8 w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="type-everest text-[#121212] font-extrabold tracking-tight">
            Happening This Weekend
          </h2>
          <p className="type-etna text-gray-500 mt-0.5">
            Verified tickets for hot arena concerts, baseball matchups & live theater tonight and tomorrow
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

      {/* Horizontal Carousel */}
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {HAPPENING_THIS_WEEKEND_DATA.map((item) => (
          <div 
            key={item.name}
            onClick={() => onSelectEvent(item.name)}
            className="shrink-0 w-[240px] sm:w-[280px] snap-start group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image & Today/Tomorrow Badge */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.fallbackImage;
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5">
                  <div className="inline-flex items-center space-x-1 bg-black/80 backdrop-blur-xs text-white type-snowdon px-2 py-0.5 rounded shadow">
                    <Clock className="w-3 h-3 text-[#ffb932]" />
                    <span>{item.badge}</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/75 text-white type-snowdon px-1.5 py-0.5 rounded">
                  {item.category}
                </div>
              </div>

              {/* Text content */}
              <div className="p-3.5 space-y-1.5">
                <div className="type-etna font-semibold text-[#024ddf] flex items-center space-x-1.5">
                  <span>{item.dateDisplay}</span>
                  <span>&bull;</span>
                  <span>{item.timeDisplay}</span>
                </div>

                <h3 className="type-blanc text-sm font-bold text-gray-900 group-hover:text-[#024ddf] transition-colors line-clamp-2 leading-tight">
                  {item.name}
                </h3>

                <p className="type-etna text-gray-500 truncate flex items-center">
                  <MapPin className="w-3 h-3 mr-1 shrink-0 text-gray-400" />
                  <span>{item.venue} &bull; {item.city}, {item.state}</span>
                </p>
              </div>
            </div>

            <div className="px-3.5 pb-3.5 pt-1 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="type-snowdon text-gray-400 block">Verified From</span>
                <span className="type-blanc font-extrabold text-[#024ddf]">
                  ${item.priceFrom}
                </span>
              </div>
              <span className="bg-[#024ddf] group-hover:bg-[#0139a7] active:bg-[#012e85] text-white text-xs font-bold px-3 py-1.5 rounded transition-colors flex items-center space-x-1 shadow-xs">
                <Ticket className="w-3 h-3" />
                <span>See Tickets</span>
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
