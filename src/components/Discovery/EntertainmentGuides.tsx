import React from 'react';
import { ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';

export interface GuideItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  link: string;
}

export const ENTERTAINMENT_GUIDES: GuideItem[] = [
  {
    id: 'nba-guide',
    title: 'NBA Basketball Tickets',
    description: 'See your favorite team hit the court and get tickets at the Official Ticket Marketplace of the NBA.',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    category: 'NBA',
    link: '#sports'
  },
  {
    id: 'nhl-guide',
    title: 'NHL Hockey Tickets',
    description: 'Be there live when your favorite team hits the ice and get tickets at the Official Ticket Marketplace of the NHL.',
    imageUrl: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=800&q=80',
    category: 'NHL',
    link: '#sports'
  },
  {
    id: 'mls-guide',
    title: 'MLS Soccer Tickets',
    description: 'Catch every action-packed game this season and get tickets at the Official Ticket Marketplace of the MLS.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    category: 'MLS',
    link: '#sports'
  },
  {
    id: 'mlb-guide',
    title: 'MLB Baseball Tickets',
    description: 'We answer all of your questions about the 2026 MLB season, including how to get tickets to see your favorite team.',
    imageUrl: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&w=800&q=80',
    category: 'MLB',
    link: '#sports'
  },
  {
    id: 'broadway-guide',
    title: 'Broadway Tickets & Musicals',
    description: 'Browse Broadway tickets, find show schedules, and discover award-winning upcoming plays.',
    imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80',
    category: 'Broadway',
    link: '#theater'
  }
];

interface EntertainmentGuidesProps {
  onSelectCategory?: (category: string) => void;
}

export const EntertainmentGuides: React.FC<EntertainmentGuidesProps> = ({ onSelectCategory }) => {
  return (
    <section 
      id="entertainment-guides-section"
      data-testid="prismic-guides" 
      className="sc-1c0987ce-0 jYWAsE my-10 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
    >
      <div className="sc-1c0987ce-4 eYufxR flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <span className="type-snowdon text-[#024ddf] font-black tracking-wider uppercase block">
            Curated Playlists & Schedules
          </span>
          <h2 id=":R2j9om:" className="sc-d7c83cb1-0 gyFPyN type-vinson text-gray-900 font-bold">
            Entertainment Guides
          </h2>
        </div>
        <button
          onClick={() => onSelectCategory && onSelectCategory('all')}
          className="text-xs font-bold text-[#024ddf] hover:text-[#0139a7] flex items-center space-x-1"
        >
          <span>Explore All Guides</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="sc-d039b6e9-0 eGeFnr sc-1c0987ce-1 JBTHT mt-5">
        <ul id=":R2j9omH1:" className="sc-d039b6e9-1 fUiOrx sc-1c0987ce-2 cXNKMj grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 list-none p-0 m-0">
          {ENTERTAINMENT_GUIDES.map((guide) => (
            <li key={guide.id} className="sc-d039b6e9-2 kVKuuC sc-1c0987ce-3 lodMMo group cursor-pointer">
              <div 
                onClick={() => onSelectCategory && onSelectCategory(guide.category === 'Broadway' ? 'Arts & Theater' : 'Sports')}
                className="Link__StyledLink-sc-pudy0l-0 eYZQRC sc-db79b53f-0 hSQGJY block h-full no-underline"
              >
                <div className="sc-db79b53f-1 ihImIC rounded-xl overflow-hidden aspect-[16/9] relative bg-gray-100 shadow-xs group-hover:shadow-md transition-shadow">
                  <img 
                    src={guide.imageUrl} 
                    alt={guide.title} 
                    className="sc-8e2511ba-2 dYYGfg w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-2 left-2 bg-[#024ddf] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    {guide.category}
                  </span>
                </div>
                <div className="sc-db79b53f-2 igfezH mt-2.5 space-y-1">
                  <h3 className="sc-db79b53f-4 feHXwP type-blanc text-sm font-bold text-gray-900 group-hover:text-[#024ddf] transition-colors leading-snug line-clamp-1">
                    {guide.title}
                  </h3>
                  <p className="sc-db79b53f-5 szdzW text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
