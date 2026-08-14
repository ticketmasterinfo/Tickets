import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Ticket
} from 'lucide-react';
import { EventItem } from '../../types';

interface HeroBillboardProps {
  featuredEvents: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onViewDetails: (event: EventItem) => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  featuredEvents,
  onSelectEvent,
  onViewDetails
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || featuredEvents.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, featuredEvents.length]);

  if (!featuredEvents.length) return null;

  const currentEvent = featuredEvents[currentIndex] || featuredEvents[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredEvents.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  return (
    <section 
      id="hero-spotlight-billboard"
      className="relative w-full overflow-hidden bg-[#121212] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Billboard"
    >
      {/* 16:9 to 21:9 Aspect Ratio Hero Frame */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/8] lg:aspect-[21/8] min-h-[380px] max-h-[560px]">
        
        {/* Background Image with smooth fade transition */}
        <div className="absolute inset-0">
          <img
            src={currentEvent.identity.banner_url || currentEvent.identity.image_url}
            alt={currentEvent.identity.event_title}
            className="w-full h-full object-cover object-center transform scale-105 transition-all duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/75 to-transparent"></div>
        </div>

        {/* Hero Content Container */}
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-8 sm:pb-12 z-20">
          <div className="max-w-3xl space-y-3 md:space-y-4">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1 bg-[#ffb932] text-[#121212] type-snowdon px-2.5 py-1 rounded font-black tracking-wider">
                <Sparkles className="w-3 h-3 text-[#121212]" />
                <span>Featured Tour Spotlight</span>
              </span>
              
              <span className="inline-flex items-center space-x-1 bg-[#024ddf] text-white type-snowdon px-2.5 py-1 rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
                <span>100% Verified Tickets</span>
              </span>

              {currentEvent.identity.is_selling_fast && (
                <span className="bg-[#d91b5c] text-white type-snowdon px-2.5 py-1 rounded">
                  Selling Fast
                </span>
              )}
            </div>

            {/* Performer & Tour Title (Mauna Typography) */}
            <h1 className="type-mauna font-black text-white leading-tight drop-shadow-md">
              {currentEvent.identity.event_title}
            </h1>

            {/* Event Date & Location Subtitle */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-gray-200 text-sm sm:text-base font-medium">
              <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-md border border-white/10">
                <Calendar className="w-4 h-4 text-[#ffb932]" />
                <span>{currentEvent.date_time.full_date_display}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-md border border-white/10">
                <MapPin className="w-4 h-4 text-[#024ddf]" />
                <span>{currentEvent.location.venue_name} &bull; {currentEvent.location.city}, {currentEvent.location.state}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="hero-see-tickets-btn"
                onClick={() => onSelectEvent(currentEvent)}
                className="bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white type-fiji px-6 py-3 rounded-lg flex items-center space-x-2 transition-all transform active:scale-95 shadow-xl font-bold"
              >
                <Ticket className="w-5 h-5" />
                <span>See Tickets & Seats &bull; From ${currentEvent.pricing.min_price.toFixed(0)}</span>
              </button>

              <button
                id="hero-event-info-btn"
                onClick={() => onViewDetails(currentEvent)}
                className="bg-white/15 hover:bg-white/25 active:bg-white/10 text-white backdrop-blur-md px-5 py-3 rounded-lg text-sm font-semibold transition-colors border border-white/20"
              >
                Tour & Venue Info
              </button>
            </div>

          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute right-4 bottom-8 hidden sm:flex items-center space-x-2 z-30">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous Featured Event"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-1.5 px-2">
            {featuredEvents.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-6 bg-[#ffb932]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next Featured Event"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
