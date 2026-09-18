import React from 'react';
import { Hotel, Tag, Crown, ArrowRight, ShieldCheck } from 'lucide-react';

export interface FeaturedItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  fallbackImage: string;
  link: string;
  icon: React.ReactNode;
}

export const FEATURED_SIDEBAR_DATA: FeaturedItem[] = [
  {
    id: 'featured-hotels',
    title: 'Hotels',
    subtitle: 'Combine your ticket with a hotel booking nearby',
    badge: 'Travel Deals',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    link: '#hotels',
    icon: <Hotel className="w-4 h-4 text-blue-400" />
  },
  {
    id: 'featured-deals',
    title: 'Ticket Deals',
    subtitle: '2-for-1 ticket bundles and special group promotions',
    badge: 'Special Offers',
    imageUrl: 'https://prismic-images.tmol.io/ticketmaster-tm-global/f0113677-a22e-4487-8d62-72fd2c95d97c_Discovery-Ticket-Deals-Tile.jpg?auto=webp&rect=2%2C0%2C2045%2C1152&w=300&h=169',
    fallbackImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    link: '#deals',
    icon: <Tag className="w-4 h-4 text-emerald-400" />
  },
  {
    id: 'featured-vip',
    title: 'VIP Packages',
    subtitle: 'Meet & greets, premier lounges and private hospitality',
    badge: 'Exclusive',
    imageUrl: 'https://prismic-images.tmol.io/ticketmaster-tm-global/aEihoLNJEFaPX2D2_VIPHomepage.jpg?auto=webp&rect=1%2C0%2C343%2C193&w=300&h=169',
    fallbackImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    link: '#vip',
    icon: <Crown className="w-4 h-4 text-[#ffb932]" />
  },
  {
    id: 'featured-sell',
    title: 'Sell on Ticketmaster',
    subtitle: 'List your verified tickets safely and get paid directly',
    badge: 'Verified Resale',
    imageUrl: 'https://prismic-images.tmol.io/ticketmaster-tm-global/aNLahZ5xUNkB1CCO_SellFeatureTitle.jpg?auto=webp&rect=1%2C0%2C719%2C405&w=300&h=169',
    fallbackImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    link: '#sell',
    icon: <ShieldCheck className="w-4 h-4 text-purple-400" />
  }
];

interface FeaturedSidebarProps {
  onActionClick: (id: string) => void;
}

export const FeaturedSidebar: React.FC<FeaturedSidebarProps> = ({ onActionClick }) => {
  return (
    <aside 
      data-testid="featured" 
      className="space-y-6"
    >
      {/* Featured Header */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
        <h2 className="type-vinson font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">
          Featured
        </h2>

        <ul className="space-y-3.5 list-none p-0 m-0">
          {FEATURED_SIDEBAR_DATA.map((item) => (
            <li key={item.id}>
              <div 
                onClick={() => onActionClick(item.id)}
                className="group block cursor-pointer bg-[#fcfcfc] hover:bg-blue-50/50 rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.fallbackImage;
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white type-snowdon px-2 py-0.5 rounded border border-white/10 flex items-center space-x-1">
                    {item.icon}
                    <span>{item.badge}</span>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="type-blanc text-sm font-bold text-gray-900 group-hover:text-[#024ddf] transition-colors">
                    {item.title}
                  </h3>
                  <p className="type-etna text-xs text-gray-500 line-clamp-2 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Verified Partner Callout */}
      <div className="bg-[#121212] text-white rounded-2xl p-5 border border-gray-800 space-y-3 shadow-md">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="type-blanc text-sm font-bold">100% Buyer Guarantee</h3>
        </div>
        <p className="type-etna text-xs text-gray-400 leading-relaxed">
          Every ticket is 100% verified by our primary venue partnerships and guaranteed authentic for seamless barcode entry.
        </p>
        <div className="pt-1">
          <button
            onClick={() => onActionClick('guarantee')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>Learn about fan protection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
