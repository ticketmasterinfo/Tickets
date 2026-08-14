import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  DollarSign, 
  Sparkles, 
  Building2, 
  MapPin
} from 'lucide-react';
import { FilterOptions } from '../../types';
import { CITIES_LIST, VENUES_LIST, CATEGORIES_LIST } from '../../data/eventsData';

interface FilterSidebarProps {
  filters: FilterOptions;
  onChangeFilters: (newFilters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  totalFilteredCount
}) => {
  return (
    <aside 
      id="discovery-filter-sidebar" 
      className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-6"
      aria-label="Filter events"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#024ddf]" />
          <h2 className="type-blanc text-gray-900 font-bold">Filters</h2>
        </div>
        <button
          id="reset-filters-btn"
          onClick={onResetFilters}
          className="text-xs font-semibold text-[#024ddf] hover:underline flex items-center space-x-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <label className="type-snowdon text-gray-700 block">
          Event Category
        </label>
        <div className="space-y-1">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onChangeFilters({ category: cat.id })}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  isSelected 
                    ? 'bg-blue-50 text-[#024ddf] font-bold border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#024ddf]"></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Timeframe Filter */}
      <div className="space-y-2.5 pt-2 border-t border-gray-100">
        <label className="type-snowdon text-gray-700 block">
          Date & Timeframe
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Dates' },
            { id: 'today', label: 'Today' },
            { id: 'this_weekend', label: 'This Weekend' },
            { id: 'this_month', label: 'August - Sept' },
            { id: 'future', label: 'Next 30 Days' }
          ].map((item) => {
            const isSelected = filters.dateRange === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeFilters({ dateRange: item.id as any })}
                className={`text-xs font-semibold px-2.5 py-2 rounded-lg border text-center transition-all ${
                  isSelected
                    ? 'bg-[#024ddf] text-white border-[#024ddf] shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2.5 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <label className="type-snowdon text-gray-700 block">
            Max Ticket Price
          </label>
          <span className="text-sm font-black text-[#024ddf]">
            ${filters.maxPrice}
          </span>
        </div>
        <input
          id="price-range-slider"
          type="range"
          min="30"
          max="900"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onChangeFilters({ maxPrice: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#024ddf]"
        />
        <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
          <span>$30 min</span>
          <span>$900+</span>
        </div>
      </div>

      {/* Location / City Filter */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <label className="type-snowdon text-gray-700 block flex items-center space-x-1">
          <MapPin className="w-3.5 h-3.5 text-[#024ddf]" />
          <span>Metro City</span>
        </label>
        <select
          id="filter-city-select"
          value={filters.city}
          onChange={(e) => onChangeFilters({ city: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-[#024ddf] focus:outline-none"
        >
          {CITIES_LIST.map((city) => {
            const val = city === 'All Cities' ? 'all' : city.split(',')[0].trim();
            return (
              <option key={city} value={val}>
                {city}
              </option>
            );
          })}
        </select>
      </div>

      {/* Venue Filter */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <label className="type-snowdon text-gray-700 block flex items-center space-x-1">
          <Building2 className="w-3.5 h-3.5 text-[#024ddf]" />
          <span>Specific Venue</span>
        </label>
        <select
          id="filter-venue-select"
          value={filters.venue}
          onChange={(e) => onChangeFilters({ venue: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-[#024ddf] focus:outline-none"
        >
          {VENUES_LIST.map((venue) => {
            const val = venue === 'All Venues' ? 'all' : venue.split('(')[0].trim();
            return (
              <option key={venue} value={val}>
                {venue}
              </option>
            );
          })}
        </select>
      </div>

      {/* Status Summary Banner */}
      <div className="pt-2">
        <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
          <span className="text-xs text-gray-500 font-medium">Matching Events</span>
          <div className="text-xl font-black text-gray-900 mt-0.5">
            {totalFilteredCount}
          </div>
        </div>
      </div>

    </aside>
  );
};
