import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RecentlyViewedItem {
  id: string;
  name: string;
  imageUrl: string;
  fallbackImage: string;
}

const INITIAL_RECENTLY_VIEWED: RecentlyViewedItem[] = [
  {
    id: 'pentatonix',
    name: 'Pentatonix',
    imageUrl: 'https://s1.ticketm.net/dam/a/007/c8a22313-f355-4dbd-8a5e-994183aa3007_RETINA_PORTRAIT_3_2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=320&q=80'
  },
  {
    id: 'olivia-rodrigo',
    name: 'Olivia Rodrigo',
    imageUrl: 'https://s1.ticketm.net/dam/a/4e1/ca96dd03-8def-46ae-b6d3-9441e992c4e1_RETINA_PORTRAIT_3_2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=320&q=80'
  },
  {
    id: 'wizard-of-oz',
    name: 'The Wizard of Oz at Sphere',
    imageUrl: 'https://s1.ticketm.net/dam/a/411/3f944dde-1402-4026-9e41-80c1b5d25411_RETINA_PORTRAIT_3_2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=320&q=80'
  }
];

interface RecentlyViewedSectionProps {
  onSelectEvent: (name: string) => void;
}

export const RecentlyViewedSection: React.FC<RecentlyViewedSectionProps> = ({ onSelectEvent }) => {
  const [items, setItems] = useState<RecentlyViewedItem[]>(INITIAL_RECENTLY_VIEWED);

  if (items.length === 0) return null;

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <section data-testid="recently-viewed" aria-label="Recently Viewed" className="w-full">
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-3">
        Recently Viewed
      </h2>

      <div className="flex flex-wrap gap-3">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectEvent(item.name)}
            className="group flex items-center bg-white border border-gray-200 rounded-full pl-1.5 pr-3 py-1 shadow-xs hover:shadow-md transition-all cursor-pointer gap-2.5 max-w-xs"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-9 h-9 rounded-full object-cover shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = item.fallbackImage;
              }}
            />
            <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#024ddf] transition-colors truncate">
              {item.name}
            </span>
            <button
              type="button"
              onClick={(e) => handleRemove(e, item.id)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors ml-auto cursor-pointer"
              aria-label={`Remove ${item.name} from recently viewed`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
