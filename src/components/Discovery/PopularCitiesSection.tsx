import React from 'react';
import { MapPin, ChevronRight, ArrowRight } from 'lucide-react';

export interface CityItem {
  id: string;
  name: string;
  state: string;
  imageUrl: string;
  eventCount: number;
}

export const POPULAR_CITIES: CityItem[] = [
  {
    id: 'nyc',
    name: 'New York City',
    state: 'NY',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    eventCount: 420
  },
  {
    id: 'la',
    name: 'Los Angeles',
    state: 'CA',
    imageUrl: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=800&q=80',
    eventCount: 385
  },
  {
    id: 'vegas',
    name: 'Las Vegas',
    state: 'NV',
    imageUrl: 'https://images.unsplash.com/photo-1605833559746-6d16fed446be?auto=format&fit=crop&w=800&q=80',
    eventCount: 290
  },
  {
    id: 'chicago',
    name: 'Chicago',
    state: 'IL',
    imageUrl: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=800&q=80',
    eventCount: 310
  },
  {
    id: 'atlanta',
    name: 'Atlanta',
    state: 'GA',
    imageUrl: 'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?auto=format&fit=crop&w=800&q=80',
    eventCount: 215
  },
  {
    id: 'nashville',
    name: 'Nashville',
    state: 'TN',
    imageUrl: 'https://images.unsplash.com/photo-1548685913-fe6678babe8d?auto=format&fit=crop&w=800&q=80',
    eventCount: 260
  },
  {
    id: 'denver',
    name: 'Denver',
    state: 'CO',
    imageUrl: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80',
    eventCount: 180
  },
  {
    id: 'miami',
    name: 'Miami',
    state: 'FL',
    imageUrl: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80',
    eventCount: 275
  }
];

interface PopularCitiesSectionProps {
  onSelectCity: (city: string) => void;
}

export const PopularCitiesSection: React.FC<PopularCitiesSectionProps> = ({ onSelectCity }) => {
  return (
    <section 
      id="popular-cities-section"
      data-testid="popular-cities"
      className="sc-e6824213-0 cEpQhD my-10 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
    >
      <div className="sc-e6824213-4 cDdIrq flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
        <div>
          <span className="type-snowdon text-[#024ddf] font-black tracking-wider uppercase block">
            Top Metro Entertainment Destinations
          </span>
          <h2 id=":R339om:" className="sc-d7c83cb1-0 gyFPyN type-vinson text-gray-900 font-bold">
            Popular Cities
          </h2>
        </div>
        <button
          onClick={() => onSelectCity('all')}
          className="text-xs font-bold text-[#024ddf] hover:text-[#0139a7] flex items-center space-x-1"
        >
          <span>All 50+ Cities</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="sc-d039b6e9-0 eGeFnr sc-e6824213-1 hOBqcX">
        <ul id=":R339omH1:" className="sc-d039b6e9-1 cJjWZV grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 list-none p-0 m-0">
          {POPULAR_CITIES.map((city) => (
            <li key={city.id} className="sc-d039b6e9-2 kVKuuC sc-e6824213-2 fwbZUG">
              <button
                onClick={() => onSelectCity(city.name)}
                className="Link__StyledLink-sc-pudy0l-0 eYZQRC sc-db79b53f-0 hSQGJY sc-e6824213-3 gHOIYz group w-full text-left block no-underline focus:outline-none"
              >
                <div className="sc-db79b53f-1 ihImIC rounded-xl overflow-hidden aspect-[4/3] relative bg-gray-100 shadow-xs group-hover:shadow-md group-hover:ring-2 group-hover:ring-[#024ddf] transition-all">
                  <img 
                    src={city.imageUrl} 
                    alt={city.name} 
                    className="sc-8e2511ba-2 dYYGfg w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="text-[10px] text-gray-300 font-bold block">{city.state}</span>
                    <h3 className="type-blanc text-xs font-black leading-tight truncate">
                      {city.name}
                    </h3>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
