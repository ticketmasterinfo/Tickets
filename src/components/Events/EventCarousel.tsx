import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { EventItem } from '../../types';
import { EventCard } from './EventCard';

interface EventCarouselProps {
  title: string;
  subtitle?: string;
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onViewDetails: (event: EventItem) => void;
  onViewAll?: () => void;
  badgeText?: string;
}

export const EventCarousel: React.FC<EventCarouselProps> = ({
  title,
  subtitle,
  events,
  onSelectEvent,
  onViewDetails,
  onViewAll,
  badgeText
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!events.length) return null;

  return (
    <section className="py-6 sm:py-8" aria-label={title}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Carousel Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            {badgeText && (
              <span className="inline-block bg-blue-100 text-[#024ddf] type-snowdon px-2.5 py-0.5 rounded font-black tracking-wider mb-1">
                {badgeText}
              </span>
            )}
            <h2 className="type-everest text-gray-900 font-extrabold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="type-etna text-gray-500 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {onViewAll && (
              <button
                onClick={onViewAll}
                className="hidden sm:flex items-center space-x-1 text-sm font-bold text-[#024ddf] hover:text-[#0139a7] mr-2"
              >
                <span>View All ({events.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Left/Right Carousel Controls */}
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all"
              aria-label={`Scroll ${title} left`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all"
              aria-label={`Scroll ${title} right`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Snap Scroll Container */}
        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto pb-4 pt-1 snap-x-mandatory no-scrollbar scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {events.map((event) => (
            <div
              key={event.identity.event_id}
              className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start-card"
            >
              <EventCard
                event={event}
                onSelectEvent={onSelectEvent}
                onViewDetails={onViewDetails}
                layout="grid"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
