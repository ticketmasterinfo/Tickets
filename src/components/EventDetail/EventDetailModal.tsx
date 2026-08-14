import React from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Car, 
  Accessibility, 
  Users, 
  Ticket, 
  Sparkles,
  Info
} from 'lucide-react';
import { EventItem } from '../../types';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onSelectEventForBooking: (event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onSelectEventForBooking
}) => {
  if (!event) return null;

  return (
    <div 
      id="event-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div 
        id="event-detail-modal-card"
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-200 my-auto animate-in zoom-in-95"
      >
        {/* Hero Header with Media */}
        <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full bg-gray-900 overflow-hidden">
          <img 
            src={event.identity.banner_url || event.identity.image_url} 
            alt={event.identity.event_title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header text content */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6">
            <div className="flex flex-wrap gap-2 mb-1.5">
              <span className="bg-[#024ddf] text-white type-snowdon px-2.5 py-0.5 rounded font-black">
                {event.identity.category}
              </span>
              <span className="bg-white/20 text-white backdrop-blur-sm type-snowdon px-2.5 py-0.5 rounded">
                {event.identity.subcategory}
              </span>
            </div>
            <h2 className="type-everest text-white font-black leading-tight drop-shadow-md">
              {event.identity.event_title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Quick Date & Venue Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#024ddf] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase block">DATE & TIME</span>
                <span className="text-sm font-bold text-gray-900">{event.date_time.full_date_display}</span>
                <span className="text-xs text-gray-500 block">Doors open: {event.date_time.doors_time} PM</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase block">LOCATION & VENUE</span>
                <span className="text-sm font-bold text-gray-900">{event.location.venue_name}</span>
                <span className="text-xs text-gray-500 block">{event.location.full_address}</span>
              </div>
            </div>
          </div>

          {/* About Event Description */}
          <div className="space-y-2">
            <h3 className="type-blanc text-gray-900 font-bold">About the Event</h3>
            <p className="type-rainier text-gray-700 leading-relaxed">
              {event.description.full_description}
            </p>
          </div>

          {/* Lineup & Performers */}
          {event.identity.lineup && event.identity.lineup.length > 0 && (
            <div className="space-y-2">
              <h4 className="type-vinson text-gray-900 font-bold flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#024ddf]" />
                <span>Featured Lineup</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.identity.lineup.map((performer, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 border border-gray-200 text-gray-800 font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#ffb932]" />
                    <span>{performer}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Important Venue Policies & Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {/* Bag Policy */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Clear Bag Policy & Security</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {event.description.entry_requirements}
              </p>
            </div>

            {/* Accessibility & Parking */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center space-x-1.5 text-[#024ddf] font-bold text-xs uppercase tracking-wider">
                <Accessibility className="w-4 h-4" />
                <span>ADA Accessibility & Parking</span>
              </div>
              <p className="text-xs text-blue-950 leading-relaxed">
                {event.location.accessibility_info} {event.location.parking_info}
              </p>
            </div>
          </div>

          {/* Age Restrictions */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600 flex items-center space-x-2">
            <Info className="w-4 h-4 text-gray-400 shrink-0" />
            <span><strong>Age Guidelines:</strong> {event.description.age_restrictions}</span>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-xs text-gray-500 block font-medium">Verified Ticket Pricing</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-xs text-gray-500">From</span>
              <span className="text-xl font-black text-[#024ddf]">${event.pricing.min_price.toFixed(0)}</span>
              <span className="text-xs text-gray-400">to ${event.pricing.max_price.toFixed(0)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectEventForBooking(event);
              }}
              className="flex-1 sm:flex-none bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white font-bold px-6 py-2.5 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Select Seats on Interactive Map</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
