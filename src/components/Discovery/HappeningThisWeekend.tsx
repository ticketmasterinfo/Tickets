import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { EventItem } from '../../types';

export interface WeekendEventItem {
  name: string;
  venue: string;
  city: string;
  state: string;
  badge: 'Today' | 'Tomorrow' | 'Sunday';
  dateDisplay: string;
  timeDisplay: string;
  imageUrl: string;
  fallbackImage: string;
  category: string;
}

export const HAPPENING_THIS_WEEKEND_DATA: WeekendEventItem[] = [
  {
    name: 'The Wizard of Oz at Sphere',
    venue: 'Sphere',
    city: 'Las Vegas',
    state: 'NV',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '2:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/411/3f944dde-1402-4026-9e41-80c1b5d25411_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=720&q=80',
    category: 'Spectacular'
  },
  {
    name: 'WWE Friday Night SmackDown',
    venue: 'Toyota Arena',
    city: 'Ontario',
    state: 'CA',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '4:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/380/bf11c4a6-7591-40d0-babc-f357525e0380_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=720&q=80',
    category: 'Sports'
  },
  {
    name: 'The Red Clay Strays',
    venue: 'Bridgestone Arena',
    city: 'Nashville',
    state: 'TN',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '6:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/ab5/9914ca2d-3115-427b-9cde-424a66230ab5_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=720&q=80',
    category: 'Country'
  },
  {
    name: 'Monster Jam',
    venue: 'Broadmoor World Arena',
    city: 'Colorado Springs',
    state: 'CO',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '7:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/648/bee96ceb-7d32-4b5d-bb15-6a8615501648_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=720&q=80',
    category: 'Motorsports'
  },
  {
    name: 'WEEZER- The Gathering',
    venue: 'T-Mobile Arena',
    city: 'Las Vegas',
    state: 'NV',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '7:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/a2e/4990f811-a315-4173-adcf-405a96de3a2e_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=720&q=80',
    category: 'Alternative Rock'
  },
  {
    name: 'RUSH: Fifty Something',
    venue: 'Heritage Bank Center',
    city: 'Cincinnati',
    state: 'OH',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '7:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/6bd/c02199ad-8d22-4668-8973-f400d85826bd_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=720&q=80',
    category: 'Classic Rock'
  },
  {
    name: "Rod Wave: Don't Look Down Tour",
    venue: 'PPG Paints Arena',
    city: 'Pittsburgh',
    state: 'PA',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '8:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=720&q=80',
    category: 'Hip-Hop/Rap'
  },
  {
    name: 'Garth Brooks - Blame It All On My Roots Arena Tour',
    venue: 'BOK Center',
    city: 'Tulsa',
    state: 'OK',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '8:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/98d/152fc3eb-991c-4e98-b742-8aaf0285c98d_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=720&q=80',
    category: 'Country'
  },
  {
    name: 'Fuerza Regida - This Is Our Dream Tour 2026',
    venue: 'Toyota Amphitheatre',
    city: 'Wheatland',
    state: 'CA',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '8:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/a5b/d253e4da-483a-4720-b191-7c4be1ceca5b_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=720&q=80',
    category: 'Latin'
  },
  {
    name: 'Steve Lacy: Oh yeah? Tour',
    venue: 'Red Hat Amphitheater',
    city: 'Raleigh',
    state: 'NC',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '8:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/736/9b65a2e3-c29e-4710-97b1-a60425077736_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=720&q=80',
    category: 'R&B'
  },
  {
    name: 'Tim McGraw: Live in Las Vegas',
    venue: 'The Colosseum at Caesars Palace',
    city: 'Las Vegas',
    state: 'NV',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '8:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/01b/322e6b9c-1a1c-4de5-aa5b-e88badcea01b_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=720&q=80',
    category: 'Country'
  },
  {
    name: 'LIL WAYNE: 20 YEARS OF CARTER CLASSICS',
    venue: 'Food City Center',
    city: 'Knoxville',
    state: 'TN',
    badge: 'Today',
    dateDisplay: 'Fri, Oct 23',
    timeDisplay: '8:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/feb/da63459e-8148-453b-8863-e464f25acfeb_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=720&q=80',
    category: 'Hip-Hop/Rap'
  },
  {
    name: 'Ed Sheeran',
    venue: 'AT&T Stadium',
    city: 'Arlington',
    state: 'TX',
    badge: 'Tomorrow',
    dateDisplay: 'Sat, Oct 24',
    timeDisplay: '5:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/7ac/222f0ea8-3b7e-4039-b40b-04a68ccde7ac_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=720&q=80',
    category: 'Pop'
  },
  {
    name: 'Breaking Benjamin',
    venue: 'Jiffy Lube Live',
    city: 'Bristow',
    state: 'VA',
    badge: 'Tomorrow',
    dateDisplay: 'Sat, Oct 24',
    timeDisplay: '6:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/255/f4f5706d-5ec7-4cbe-a6fe-7e76a233e255_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=720&q=80',
    category: 'Rock'
  },
  {
    name: 'Bryson Tiller Presents: The Neo Trapsoul Tour',
    venue: 'North Island Credit Union Amphitheatre',
    city: 'Chula Vista',
    state: 'CA',
    badge: 'Tomorrow',
    dateDisplay: 'Sat, Oct 24',
    timeDisplay: '7:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/433/021fc7b3-815d-4f88-9fce-83b31a96d433_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=720&q=80',
    category: 'R&B'
  },
  {
    name: 'My Chemical Romance The Black Parade 2026',
    venue: 'Hollywood Bowl',
    city: 'Hollywood',
    state: 'CA',
    badge: 'Tomorrow',
    dateDisplay: 'Sat, Oct 24',
    timeDisplay: '8:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/b67/0aae6aa9-4e17-482b-81d9-5282ff937b67_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=720&q=80',
    category: 'Rock'
  },
  {
    name: 'Ryan Bingham w/ The Texas Gentlemen',
    venue: 'Val Air Ballroom',
    city: 'West Des Moines',
    state: 'IA',
    badge: 'Tomorrow',
    dateDisplay: 'Sat, Oct 24',
    timeDisplay: '8:00 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/0f9/1e878bcf-e4fc-425d-8d4f-e90b90a4d0f9_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=720&q=80',
    category: 'Country'
  },
  {
    name: 'Jonas Brothers: The Burning Up Tour All Over Again',
    venue: 'Little Caesars Arena',
    city: 'Detroit',
    state: 'MI',
    badge: 'Sunday',
    dateDisplay: 'Sun, Oct 25',
    timeDisplay: '7:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/378/809a1187-1545-43be-b5ab-e2d220621378_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=720&q=80',
    category: 'Pop'
  },
  {
    name: 'Avery Anna w/ Jaid Joice',
    venue: 'The National',
    city: 'Richmond',
    state: 'VA',
    badge: 'Sunday',
    dateDisplay: 'Sun, Oct 25',
    timeDisplay: '7:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/cd1/a54b0fa1-4896-4405-af3a-e3ad915a5cd1_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=720&q=80',
    category: 'Country'
  },
  {
    name: 'Doja Cat - Tour Ma Vie World Tour',
    venue: 'Chase Center',
    city: 'San Francisco',
    state: 'CA',
    badge: 'Sunday',
    dateDisplay: 'Sun, Oct 25',
    timeDisplay: '7:30 PM',
    imageUrl: 'https://s1.ticketm.net/dam/a/b3f/bb7ae999-2e8c-4af5-97c5-73e396c67b3f_SOURCE',
    fallbackImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=720&q=80',
    category: 'Hip-Hop/Rap'
  }
];

interface HappeningThisWeekendProps {
  onSelectEvent: (name: string) => void;
}

export const HappeningThisWeekend: React.FC<HappeningThisWeekendProps> = ({ onSelectEvent }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section data-testid="hp-happening-this-week" aria-label="Happening This Weekend" className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Happening This Weekend
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Live arena concerts, premier tours & games happening near you
          </p>
        </div>

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
        aria-label="Weekend Events"
      >
        {HAPPENING_THIS_WEEKEND_DATA.map((item) => (
          <div
            key={item.name + item.city}
            onClick={() => onSelectEvent(item.name)}
            className="min-w-[240px] sm:min-w-[270px] shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            {/* Image Container with Badge */}
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = item.fallbackImage;
                }}
              />
              <span className={`absolute top-2 left-2 text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-md flex items-center gap-1 ${
                item.badge === 'Today' 
                  ? 'bg-amber-400 text-black' 
                  : item.badge === 'Tomorrow' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-emerald-600 text-white'
              }`}>
                <Clock className="w-3 h-3" />
                <span>{item.badge}</span>
              </span>
            </div>

            {/* Event Info */}
            <div className="p-3.5 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#024ddf]">
                <span>{item.dateDisplay}</span>
                <span>&bull;</span>
                <span>{item.timeDisplay}</span>
              </div>
              <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-[#024ddf] transition-colors line-clamp-1">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{item.venue} &bull; {item.city}, {item.state}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
