import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  ChevronRight, 
  Heart, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  Flame, 
  Music, 
  Mic2, 
  Guitar, 
  Volume2, 
  Trophy 
} from 'lucide-react';
import { EventItem, FilterOptions, ArtistProfile } from '../../types';

interface MobileHomeViewProps {
  events: EventItem[];
  currentCity: string;
  onOpenCitySelector: () => void;
  onSelectEvent: (event: EventItem) => void;
  onViewEventDetails: (event: EventItem) => void;
  onSelectArtist: (artist: ArtistProfile) => void;
  onToggleWatchlistArtist: (artistName: string) => void;
  watchlistArtists: string[];
  onOpenInstallModal: () => void;
}

export const MobileHomeView: React.FC<MobileHomeViewProps> = ({
  events,
  currentCity,
  onOpenCitySelector,
  onSelectEvent,
  onViewEventDetails,
  onSelectArtist,
  onToggleWatchlistArtist,
  watchlistArtists,
  onOpenInstallModal
}) => {
  // Cycling search placeholder: Teams, Artists, Concerts, Venues...
  const placeholderKeywords = ['Teams', 'Artists', 'Concerts', 'Venues', 'Events'];
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex(prev => (prev + 1) % placeholderKeywords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Trending Artists matching IMG_6273.png
  const trendingArtists = [
    {
      id: 'olivia-rodrigo',
      rank: '01',
      name: 'Olivia Rodrigo',
      genre: 'Pop',
      genreIcon: '🎤',
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
      eventId: 'VV1aZ9v1002TM'
    },
    {
      id: 'metallica',
      rank: '02',
      name: 'Metallica',
      genre: 'Metal',
      genreIcon: '🎸',
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
      eventId: 'VV1aZ9v1003TM'
    },
    {
      id: 'calvin-harris',
      rank: '03',
      name: 'Calvin Harris',
      genre: 'Pop / Dance',
      genreIcon: '🎧',
      imageUrl: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=400&q=80',
      eventId: 'VV1aZ9v1005TM'
    },
    {
      id: 'eagles',
      rank: '04',
      name: 'Eagles',
      genre: 'Classic Rock',
      genreIcon: '🎸',
      imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80',
      eventId: 'VV1aZ9v1001TM'
    },
    {
      id: 'taylor-swift',
      rank: '05',
      name: 'Taylor Swift',
      genre: 'Pop',
      genreIcon: '🎤',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
      eventId: 'VV1aZ9v1006TM'
    }
  ];

  // Filter events based on active category and search
  const filteredEvents = events.filter(e => {
    const matchesSearch = !searchQuery || 
      e.identity.event_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.identity.main_performer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.venue_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || 
      e.identity.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full pb-28 bg-[#121212] text-white select-none">
      {/* 1. Header Location Selector matching IMG_6273 */}
      <div className="pt-3 px-4 pb-2">
        <button 
          onClick={onOpenCitySelector}
          className="flex items-center gap-2 group text-left transition hover:opacity-85"
        >
          <div className="text-[#00e5ff]">
            <MapPin className="w-4 h-4 fill-[#00e5ff]/20 text-[#00e5ff]" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white group-hover:text-[#00e5ff] transition">
            {currentCity}, US
          </span>
          <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition" />
        </button>
      </div>

      {/* 2. Big Pill Search Input matching IMG_6273 */}
      <div className="px-4 py-2">
        <div className="relative flex items-center bg-[#1f2229] border border-[#2d313c] rounded-full px-3 py-2.5 shadow-inner focus-within:border-blue-500 transition">
          <div className="w-8 h-8 rounded-full bg-[#024ddf] flex items-center justify-center shrink-0 mr-3 shadow-md">
            <Search className="w-4 h-4 text-white" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search for ${placeholderKeywords[keywordIndex]}`}
            className="w-full bg-transparent text-sm text-white placeholder-white/50 focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs text-white/40 hover:text-white px-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 3. Category Pills Row */}
      <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {['All', 'Concerts', 'Sports', 'Arts & Theater', 'Family'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-[#22242a] text-white/70 hover:text-white hover:bg-[#2b2e36]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. Featured Hero Carousel (Swipeable horizontal cards) */}
      <div className="mt-3 px-4">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
          {events.slice(0, 3).map((event) => (
            <div 
              key={event.identity.event_id}
              onClick={() => onViewEventDetails(event)}
              className="min-w-[85vw] sm:min-w-[320px] snap-center rounded-2xl overflow-hidden relative aspect-[16/10] bg-[#1a1c22] border border-white/10 shadow-lg cursor-pointer group"
            >
              <img 
                src={event.identity.image_url} 
                alt={event.identity.event_title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded w-max mb-1">
                  Featured Tour
                </span>
                <h3 className="text-base font-bold text-white line-clamp-1 leading-snug">
                  {event.identity.event_title}
                </h3>
                <p className="text-xs text-white/70 line-clamp-1">
                  {event.location.venue_name} • {event.date_time.full_date_display.split('•')[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. "Trending In The United States" matching IMG_6273 */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
            <span>Trending In The United States</span>
          </h2>
          <button 
            onClick={() => setSelectedCategory('Concerts')}
            className="text-xs font-semibold text-white/70 hover:text-white"
          >
            View All
          </button>
        </div>

        {/* Trending List */}
        <div className="space-y-2">
          {trendingArtists.map((artist) => {
            const isFav = watchlistArtists.includes(artist.name);
            return (
              <div 
                key={artist.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#181a20] border border-white/5 hover:border-white/15 transition group"
              >
                <div 
                  onClick={() => {
                    const matchedEvent = events.find(e => e.identity.event_id === artist.eventId || e.identity.main_performer.toLowerCase().includes(artist.name.toLowerCase()));
                    if (matchedEvent) {
                      onViewEventDetails(matchedEvent);
                    }
                  }}
                  className="flex items-center gap-3.5 flex-1 cursor-pointer"
                >
                  {/* Neon Gold/Yellow Outlined Rank Number */}
                  <span 
                    className="text-2xl font-black italic tracking-tight text-transparent select-none min-w-[34px]"
                    style={{
                      WebkitTextStroke: '1.5px #f4d03f',
                      fontFamily: 'sans-serif'
                    }}
                  >
                    {artist.rank}
                  </span>

                  {/* Square thumbnail image */}
                  <img 
                    src={artist.imageUrl} 
                    alt={artist.name}
                    className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0" 
                  />

                  {/* Artist Name & Subgenre */}
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition leading-tight">
                      {artist.name}
                    </h4>
                    <p className="text-xs text-white/50 flex items-center gap-1 mt-0.5">
                      <span>{artist.genreIcon}</span>
                      <span>{artist.genre}</span>
                    </p>
                  </div>
                </div>

                {/* Heart Favorite button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWatchlistArtist(artist.name);
                  }}
                  className={`p-2 rounded-full transition ${
                    isFav 
                      ? 'text-red-500 hover:text-red-400' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                  aria-label={`Favorite ${artist.name}`}
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Floating Pill: "Find Events Near You / Set your location ->" matching IMG_6273 */}
      <div className="mt-6 px-4">
        <button
          onClick={onOpenCitySelector}
          className="w-full bg-white text-black p-3.5 rounded-full flex items-center justify-between shadow-xl active:scale-[0.98] transition group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00e5ff]/20 flex items-center justify-center text-[#00b0c7]">
              <MapPin className="w-5 h-5 fill-[#00e5ff] text-[#00e5ff]" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black tracking-tight text-black leading-tight">
                Find Events Near You
              </p>
              <p className="text-[11px] text-gray-500 font-medium leading-tight">
                Set your location
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black group-hover:translate-x-1 transition">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* 7. Upcoming Live Events Feed */}
      <div className="mt-7 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white">Upcoming Shows & Tickets</h2>
          <span className="text-xs text-white/50">{filteredEvents.length} events</span>
        </div>

        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <div
              key={event.identity.event_id}
              className="bg-[#181a20] border border-white/10 rounded-2xl p-3.5 flex gap-3.5 hover:border-blue-500/50 transition cursor-pointer"
              onClick={() => onViewEventDetails(event)}
            >
              <img 
                src={event.identity.image_url} 
                alt={event.identity.event_title}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-white/5" 
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    {event.identity.category}
                  </span>
                  <h4 className="text-sm font-bold text-white line-clamp-1 leading-snug">
                    {event.identity.event_title}
                  </h4>
                  <p className="text-xs text-white/60 line-clamp-1 mt-0.5">
                    {event.location.venue_name} • {event.location.city}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <span className="text-xs font-extrabold text-white">
                    From ${event.pricing.min_price}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(event);
                    }}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition shadow"
                  >
                    Tickets
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Download Mobile App CTA Card */}
      <div className="mt-8 mx-4 p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-blue-950/40 border border-blue-500/30 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-white">Download Phone App</p>
          <p className="text-[11px] text-white/60">Available for iPhone (iOS) & Android</p>
        </div>
        <button
          onClick={onOpenInstallModal}
          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md transition"
        >
          Install App
        </button>
      </div>
    </div>
  );
};
