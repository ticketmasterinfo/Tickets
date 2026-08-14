import React from 'react';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { EventItem, FilterOptions } from '../../types';
import { EventCard } from '../Events/EventCard';

interface EventGridProps {
  events: EventItem[];
  totalCount: number;
  filters: FilterOptions;
  onChangeFilters: (newFilters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  onSelectEvent: (event: EventItem) => void;
  onViewDetails: (event: EventItem) => void;
  layout: 'grid' | 'list';
  onToggleLayout: (layout: 'grid' | 'list') => void;
}

export const EventGrid: React.FC<EventGridProps> = ({
  events,
  totalCount,
  filters,
  onChangeFilters,
  onResetFilters,
  onSelectEvent,
  onViewDetails,
  layout,
  onToggleLayout
}) => {
  // Generate active filter pills
  const activePills: { label: string; onRemove: () => void }[] = [];

  if (filters.category !== 'all') {
    activePills.push({
      label: `Category: ${filters.category}`,
      onRemove: () => onChangeFilters({ category: 'all' })
    });
  }
  if (filters.city !== 'all') {
    activePills.push({
      label: `City: ${filters.city}`,
      onRemove: () => onChangeFilters({ city: 'all' })
    });
  }
  if (filters.venue !== 'all') {
    activePills.push({
      label: `Venue: ${filters.venue}`,
      onRemove: () => onChangeFilters({ venue: 'all' })
    });
  }
  if (filters.maxPrice < 900) {
    activePills.push({
      label: `Under $${filters.maxPrice}`,
      onRemove: () => onChangeFilters({ maxPrice: 900 })
    });
  }
  if (filters.searchQuery) {
    activePills.push({
      label: `Search: "${filters.searchQuery}"`,
      onRemove: () => onChangeFilters({ searchQuery: '' })
    });
  }
  if (filters.dateRange !== 'all') {
    activePills.push({
      label: `Dates: ${filters.dateRange.replace('_', ' ')}`,
      onRemove: () => onChangeFilters({ dateRange: 'all' })
    });
  }

  return (
    <div className="space-y-4">
      {/* Top Bar: Count, Active Pills, Sort & View Mode */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Result Count */}
          <div>
            <h3 className="type-vinson text-gray-900 font-bold">
              All Available Live Events
            </h3>
            <p className="type-etna text-gray-500">
              Showing <strong className="text-gray-900">{events.length}</strong> of {totalCount} total verified events
            </p>
          </div>

          {/* Sort & Layout Controls */}
          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-semibold text-gray-500 hidden sm:inline">Sort:</span>
              <select
                id="sort-events-select"
                value={filters.sortBy}
                onChange={(e) => onChangeFilters({ sortBy: e.target.value as any })}
                className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#024ddf] focus:outline-none"
              >
                <option value="date_asc">Date (Earliest First)</option>
                <option value="date_desc">Date (Latest First)</option>
                <option value="price_asc">Price (Lowest First)</option>
                <option value="price_desc">Price (Highest First)</option>
                <option value="popularity">Most Popular / High Demand</option>
              </select>
            </div>

            {/* Layout Toggle (Grid / List) */}
            <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button
                id="view-grid-btn"
                onClick={() => onToggleLayout('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  layout === 'grid' ? 'bg-white text-[#024ddf] shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                id="view-list-btn"
                onClick={() => onToggleLayout('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  layout === 'list' ? 'bg-white text-[#024ddf] shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Active Filter Pills */}
        {activePills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-400 mr-1">Active:</span>
            {activePills.map((pill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 bg-blue-50 text-[#024ddf] border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                <span>{pill.label}</span>
                <button
                  onClick={pill.onRemove}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                  aria-label={`Remove filter ${pill.label}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={onResetFilters}
              className="text-xs text-red-600 hover:underline font-semibold ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Events Container or Empty State */}
      {events.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <div>
            <h4 className="type-kilimanjaro text-gray-900 font-bold">No Events Match Your Filters</h4>
            <p className="type-rainier text-gray-500 max-w-md mx-auto mt-1">
              Try adjusting your search criteria, widening the price limit, or selecting a different city.
            </p>
          </div>
          <button
            onClick={onResetFilters}
            className="bg-[#024ddf] hover:bg-[#0139a7] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {events.map((event) => (
            <EventCard
              key={event.identity.event_id}
              event={event}
              onSelectEvent={onSelectEvent}
              onViewDetails={onViewDetails}
              layout={layout}
            />
          ))}
        </div>
      )}
    </div>
  );
};
