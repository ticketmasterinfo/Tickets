import React from 'react';
import { 
  MapPin, 
  Ticket, 
  Info, 
  Sparkles
} from 'lucide-react';
import { EventItem } from '../../types';

interface EventCardProps {
  event: EventItem;
  onSelectEvent: (event: EventItem) => void;
  onViewDetails: (event: EventItem) => void;
  layout?: 'grid' | 'list';
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelectEvent,
  onViewDetails,
  layout = 'grid'
}) => {
  const dateObj = new Date(event.date_time.exact_date + 'T12:00:00');
  const monthStr = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dayStr = dateObj.getDate();
  const dayOfWeek = dateObj.toLocaleString('en-US', { weekday: 'short' });

  if (layout === 'list') {
    return (
      <div 
        id={`event-card-list-${event.identity.event_id}`}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-stretch group"
      >
        {/* Left Date Ribbon / Block */}
        <div className="bg-[#121212] text-white p-3 sm:w-28 flex sm:flex-col items-center justify-between sm:justify-center text-center shrink-0 border-b sm:border-b-0 sm:border-r border-gray-800">
          <span className="type-snowdon text-[#ffb932] tracking-widest">{monthStr}</span>
          <span className="type-kilimanjaro font-black text-white leading-none my-1">{dayStr}</span>
          <span className="text-[12px] text-gray-300 font-medium">{dayOfWeek}</span>
        </div>

        {/* Thumbnail Image */}
        <div className="relative sm:w-48 h-36 sm:h-auto overflow-hidden shrink-0">
          <img 
            src={event.identity.image_url} 
            alt={event.identity.event_title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <span className="bg-[#121212]/90 backdrop-blur-sm text-white type-snowdon px-2 py-0.5 rounded text-[10px]">
              {event.identity.category}
            </span>
          </div>
        </div>

        {/* Main Event Info */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-500">
                {event.identity.subcategory} &bull; {event.date_time.start_time.slice(0, 5)} PM
              </span>
              {event.identity.is_presale && (
                <span className="bg-[#00875a]/10 text-[#00875a] border border-[#00875a]/30 text-[10px] font-bold px-1.5 py-0.2 rounded">
                  Presale Live
                </span>
              )}
              {event.identity.is_resale && (
                <span className="bg-[#d91b5c]/10 text-[#d91b5c] border border-[#d91b5c]/30 text-[10px] font-bold px-1.5 py-0.2 rounded">
                  Verified Resale
                </span>
              )}
            </div>

            <h3 className="type-blanc text-gray-900 font-bold group-hover:text-[#024ddf] transition-colors leading-snug">
              {event.identity.event_title}
            </h3>

            <p className="text-xs text-gray-600 flex items-center mt-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1 shrink-0" />
              <span>{event.location.venue_name} &bull; {event.location.city}, {event.location.state}</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-gray-500 block">From (incl. base)</span>
              <span className="text-lg font-black text-gray-900">
                ${event.pricing.min_price.toFixed(0)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onViewDetails(event)}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="View Event Details"
                aria-label="View Event Details"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectEvent(event)}
                className="bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5"
              >
                <Ticket className="w-4 h-4" />
                <span>See Tickets</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Card Layout
  return (
    <article 
      id={`event-card-grid-${event.identity.event_id}`}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
    >
      {/* 16:9 Aspect Ratio Image Wrapper with Hover Zoom */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
        <img 
          src={event.identity.image_url} 
          alt={event.identity.event_title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="bg-[#121212]/80 backdrop-blur-md text-white type-snowdon px-2 py-0.5 rounded text-[10px] font-bold">
            {event.identity.category}
          </span>
          {event.identity.is_presale && (
            <span className="bg-[#00875a] text-white type-snowdon px-2 py-0.5 rounded text-[10px] font-bold">
              Presale
            </span>
          )}
          {event.identity.is_resale && (
            <span className="bg-[#d91b5c] text-white type-snowdon px-2 py-0.5 rounded text-[10px] font-bold">
              Resale
            </span>
          )}
        </div>

        {/* Date Badge (Kilimanjaro token) in Bottom Corner */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-md rounded-lg px-2.5 py-1 text-center shadow-md flex items-center space-x-2">
          <div className="text-center">
            <span className="block text-[10px] font-bold text-[#024ddf] uppercase tracking-wider leading-none">
              {monthStr}
            </span>
            <span className="block text-base font-black text-gray-900 leading-tight">
              {dayStr}
            </span>
          </div>
          <div className="w-px h-6 bg-gray-200"></div>
          <span className="text-xs font-semibold text-gray-600">
            {dayOfWeek}
          </span>
        </div>

        {event.identity.is_selling_fast && (
          <div className="absolute bottom-2.5 right-2.5 bg-[#d91b5c] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
            Selling Fast
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Subgenre */}
          <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center space-x-1">
            <span>{event.identity.subcategory}</span>
            <span>&bull;</span>
            <span className="text-gray-400">{event.location.city}, {event.location.state}</span>
          </div>

          {/* Performer / Event Title (Blanc token) */}
          <h3 className="type-blanc font-bold text-gray-900 leading-snug group-hover:text-[#024ddf] transition-colors line-clamp-2">
            {event.identity.event_title}
          </h3>

          {/* Venue Info */}
          <p className="text-xs text-gray-600 flex items-center mt-2">
            <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1.5 shrink-0" />
            <span className="truncate">{event.location.venue_name}</span>
          </p>
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-500 block uppercase font-medium">Starting at</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-black text-gray-900">
                ${event.pricing.min_price.toFixed(0)}
              </span>
              <span className="text-[11px] text-gray-400">ea</span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => onViewDetails(event)}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Event Information"
              aria-label={`View details for ${event.identity.event_title}`}
            >
              <Info className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectEvent(event)}
              className="bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all flex items-center space-x-1 shadow-sm active:scale-95"
            >
              <span>See Tickets</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
