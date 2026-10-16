import React from 'react';
import { Bookmark, Heart, Bell, Calendar, ChevronRight, Sparkles, Plus } from 'lucide-react';
import { EventItem } from '../../types';

interface MobileWatchlistViewProps {
  watchlistArtists: string[];
  onRemoveWatchlistArtist: (artistName: string) => void;
  onExploreTrending: () => void;
  events: EventItem[];
  onViewEventDetails: (event: EventItem) => void;
}

export const MobileWatchlistView: React.FC<MobileWatchlistViewProps> = ({
  watchlistArtists,
  onRemoveWatchlistArtist,
  onExploreTrending,
  events,
  onViewEventDetails
}) => {
  // Find events for favorited artists
  const matchedEvents = events.filter(e => 
    watchlistArtists.some(artist => e.identity.main_performer.toLowerCase().includes(artist.toLowerCase()) || e.identity.event_title.toLowerCase().includes(artist.toLowerCase()))
  );

  return (
    <div className="w-full min-h-[85vh] pb-28 bg-[#121212] text-white select-none">
      {/* Header */}
      <div className="pt-4 px-5 pb-3 flex items-center justify-between border-b border-white/5 bg-[#121212]">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-blue-500 fill-blue-500" />
          <h1 className="text-base font-bold tracking-tight text-white">Watchlist</h1>
        </div>
        <span className="text-xs text-white/50">{watchlistArtists.length} Saved</span>
      </div>

      {watchlistArtists.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Your Watchlist is Empty</h3>
          <p className="text-xs text-white/60 max-w-xs mb-6">
            Tap the heart icon next to any artist or event to receive presale alerts and tour announcements.
          </p>
          <button
            onClick={onExploreTrending}
            className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-lg transition"
          >
            Explore Trending Artists
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-5">
          {/* Saved Artists Pills */}
          <div>
            <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2.5">
              Followed Artists & Teams
            </h3>
            <div className="flex flex-wrap gap-2">
              {watchlistArtists.map((artist) => (
                <div 
                  key={artist}
                  className="flex items-center gap-2 bg-[#1c1e24] border border-white/10 rounded-full py-1.5 pl-3 pr-2 text-xs font-semibold"
                >
                  <span className="text-white">{artist}</span>
                  <button 
                    onClick={() => onRemoveWatchlistArtist(artist)}
                    className="w-5 h-5 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-[10px] text-white/60 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Presale Alerts Notice */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/30 to-blue-950/30 border border-blue-500/30 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">Presale Notifications Active</p>
              <p className="text-white/60 text-[11px]">You will receive early-access alerts for your followed artists.</p>
            </div>
          </div>

          {/* Upcoming Events for Watchlist */}
          <div>
            <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2.5">
              Available Tour Dates ({matchedEvents.length})
            </h3>
            <div className="space-y-2.5">
              {matchedEvents.map((event) => (
                <div
                  key={event.identity.event_id}
                  onClick={() => onViewEventDetails(event)}
                  className="p-3 bg-[#1c1e24] border border-white/10 rounded-xl flex items-center justify-between hover:border-blue-500/50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={event.identity.image_url} 
                      alt={event.identity.event_title} 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{event.identity.event_title}</h4>
                      <p className="text-[11px] text-white/50">{event.location.venue_name} • {event.location.city}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
