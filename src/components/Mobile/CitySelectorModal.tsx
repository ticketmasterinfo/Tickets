import React, { useState } from 'react';
import { X, MapPin, Check, Search, Navigation } from 'lucide-react';

interface CitySelectorModalProps {
  isOpen: boolean;
  currentCity: string;
  onSelectCity: (city: string) => void;
  onClose: () => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  currentCity,
  onSelectCity,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const popularCities = [
    { name: 'Los Angeles', state: 'California, US', display: 'Los Angeles, California' },
    { name: 'New York', state: 'New York, US', display: 'New York, New York' },
    { name: 'Boston', state: 'Massachusetts, US', display: 'Boston, Massachusetts' },
    { name: 'Chicago', state: 'Illinois, US', display: 'Chicago, Illinois' },
    { name: 'Las Vegas', state: 'Nevada, US', display: 'Las Vegas, Nevada' },
    { name: 'Miami', state: 'Florida, US', display: 'Miami, Florida' },
    { name: 'Austin', state: 'Texas, US', display: 'Austin, Texas' },
    { name: 'Seattle', state: 'Washington, US', display: 'Seattle, Washington' },
    { name: 'Atlanta', state: 'Georgia, US', display: 'Atlanta, Georgia' },
    { name: 'San Francisco', state: 'California, US', display: 'San Francisco, California' },
  ];

  const filtered = popularCities.filter(c => 
    c.display.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#181a20] border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col text-white max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#121212]">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#00e5ff]" />
            <h3 className="font-bold text-base">Select Your Location</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-[#121212] border-b border-white/5">
          <div className="flex items-center bg-[#1f2229] border border-white/10 rounded-full px-3 py-2 text-xs">
            <Search className="w-4 h-4 text-white/40 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search city, state or zip code..."
              className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
            />
          </div>
        </div>

        {/* Quick Current Location */}
        <div className="px-4 py-2 bg-[#15171d]">
          <button
            onClick={() => {
              onSelectCity('Los Angeles, California');
              onClose();
            }}
            className="w-full p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center gap-3 text-xs font-semibold text-blue-400 hover:bg-blue-600/30 transition"
          >
            <Navigation className="w-4 h-4" />
            <span>Use Current Location (GPS)</span>
          </button>
        </div>

        {/* Cities List */}
        <div className="p-3 overflow-y-auto space-y-1 divide-y divide-white/5 flex-1">
          {filtered.map((city) => {
            const isSelected = currentCity.toLowerCase().includes(city.name.toLowerCase());
            return (
              <button
                key={city.name}
                onClick={() => {
                  onSelectCity(city.display);
                  onClose();
                }}
                className="w-full py-3 px-3 flex items-center justify-between text-left hover:bg-white/5 rounded-xl transition"
              >
                <div>
                  <p className="text-sm font-bold text-white">{city.name}</p>
                  <p className="text-xs text-white/50">{city.state}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
