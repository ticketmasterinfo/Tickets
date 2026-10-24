import React from 'react';
import { EventItem } from '../../types';

interface HeroHighlightsProps {
  onSelectEvent: (eventOrName?: EventItem | string) => void;
  onExploreCategory?: (category: string) => void;
}

export const HeroHighlights: React.FC<HeroHighlightsProps> = ({
  onSelectEvent
}) => {
  const spotlights = [
    {
      id: 'spotlight-vip',
      name: 'Browse Available VIP Packages',
      subtitle: 'Meet & Greets, Special Access and more',
      category: 'VIP Packages',
      imageUrl: 'https://s3.us-east-1.amazonaws.com/prd3318.tmp-digital-assets.prod.us-east-1.tmaws/assets/VIP_Guide_720x405.jpg?fit=cover&optimize=high&auto=webp',
      performer: 'VIP Packages'
    },
    {
      id: 'spotlight-red-clay-strays',
      name: 'The Red Clay Strays',
      subtitle: 'Country',
      category: 'Country',
      imageUrl: 'https://s1.ticketm.net/dam/a/ab5/9914ca2d-3115-427b-9cde-424a66230ab5_TABLET_LANDSCAPE_LARGE_16_9.jpg?fit=cover&optimize=high&auto=webp',
      performer: 'The Red Clay Strays'
    },
    {
      id: 'spotlight-tso',
      name: 'Trans-Siberian Orchestra',
      subtitle: 'Rock',
      category: 'Rock',
      imageUrl: 'https://s1.ticketm.net/dam/a/e8b/b5409ed1-4af0-44a7-bccd-83fef3b0ae8b_TABLET_LANDSCAPE_LARGE_16_9.jpg?fit=cover&optimize=high&auto=webp',
      performer: 'Trans-Siberian Orchestra'
    },
    {
      id: 'spotlight-luke-combs',
      name: 'Luke Combs',
      subtitle: 'Country',
      category: 'Country',
      imageUrl: 'https://s1.ticketm.net/dam/a/c7d/d69a71d2-0361-44a4-90a0-4aa7536dbc7d_TABLET_LANDSCAPE_LARGE_16_9.jpg?fit=cover&optimize=high&auto=webp',
      performer: 'Luke Combs'
    }
  ];

  return (
    <section aria-label="Highlights" className="w-full bg-[#121212] pt-3 pb-6 px-4 md:px-8 border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="sr-only">Highlights</h2>

        {/* Main Promoted Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          
          {/* Main Promoted Hero: Pentatonix (8 cols on large screens) */}
          <div 
            data-testid="tmPromotedHero"
            onClick={() => onSelectEvent('Pentatonix')}
            className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 group cursor-pointer min-h-[260px] sm:min-h-[340px] md:min-h-[420px] flex flex-col justify-end p-6 sm:p-8 transition-transform active:scale-[0.99]"
          >
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url("https://s1.ticketm.net/dam/a/007/c8a22313-f355-4dbd-8a5e-994183aa3007_TABLET_LANDSCAPE_LARGE_16_9.jpg?fit=cover&optimize=high&auto=webp")`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-xl space-y-1.5">
              <span className="inline-block text-[11px] font-black uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/20">
                Rock
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                Pentatonix
              </h1>
              <p className="text-xs sm:text-sm text-gray-200 font-semibold drop-shadow">
                Official Live Concert Tour &bull; Verified Tickets Available
              </p>
            </div>
          </div>

          {/* Promoted Spotlights Grid (4 cols on large screens: 2x2 cards) */}
          <div data-testid="tmPromotedSpotlights" className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
            {spotlights.map((spotlight) => (
              <div
                key={spotlight.id}
                onClick={() => onSelectEvent(spotlight.performer)}
                className="relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/10 group cursor-pointer min-h-[120px] sm:min-h-[150px] lg:min-h-[96px] flex flex-col justify-end p-3 sm:p-4 transition-all hover:border-white/30"
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${spotlight.imageUrl}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block truncate">
                    {spotlight.subtitle}
                  </span>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {spotlight.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
