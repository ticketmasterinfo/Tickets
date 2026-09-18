import React from 'react';
import { Sparkles, ArrowRight, ExternalLink, Calendar } from 'lucide-react';

export interface DiscoverArticle {
  id: string;
  tagline: string;
  title: string;
  text: string;
  imageUrl: string;
  link: string;
}

export const DISCOVER_ARTICLES: DiscoverArticle[] = [
  {
    id: 'art-1',
    tagline: 'Sports',
    title: 'A Look at the 2026 MLB Schedule and New Rules',
    text: 'MLB’s 2026 season is bringing big schedule changes and new rules. Here’s what fans need to know before first pitch.',
    imageUrl: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&w=800&q=80',
    link: '#sports'
  },
  {
    id: 'art-2',
    tagline: 'Ticket Tips',
    title: 'What to Bring to a Concert: Complete Guide',
    text: 'Read our ultimate packing checklist, clear bag policies, and venue tips before you go to your next arena show.',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    link: '#concerts'
  },
  {
    id: 'art-3',
    tagline: 'Sports',
    title: 'MLS 2026 Season & Tournament FAQs',
    text: 'For the 2026 MLS season, make sure you have all the matchday info you need including verified safe ticketing.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    link: '#sports'
  },
  {
    id: 'art-4',
    tagline: 'General Info',
    title: 'Get the Most Out of Your Ticketmaster Account',
    text: 'Learn what’s possible with SafeTix dynamic passes, instant ticket transfer, and verified fan presales.',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    link: '#safetix'
  },
  {
    id: 'art-5',
    tagline: 'Championships',
    title: 'US Open Tennis Championship Buying Guide',
    text: 'Here’s what you need to know about US Open tickets, Arthur Ashe Stadium seats, grounds passes, and session pricing.',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
    link: '#sports'
  },
  {
    id: 'art-6',
    tagline: 'Broadway NYC',
    title: '6 Broadway Shows & Musicals to See This Season',
    text: 'Need ideas for family activities and date nights in NYC? Here are the best Broadway shows and musicals in 2026.',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    link: '#theater'
  }
];

export const DiscoverArticles: React.FC = () => {
  return (
    <section 
      id="discover-articles-section"
      data-testid="discover" 
      className="sc-7da1b7bb-1 Nrlyt my-10 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
    >
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
        <div>
          <span className="type-snowdon text-[#024ddf] font-black tracking-wider uppercase block">
            Insider Guides & Stories
          </span>
          <h2 id=":R2r9om:" className="sc-d7c83cb1-0 gyFPyN type-vinson text-gray-900 font-bold">
            Discover More
          </h2>
        </div>
      </div>

      <div className="sc-d039b6e9-0 eGeFnr">
        <ul className="sc-7da1b7bb-0 gCizYJ grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
          {DISCOVER_ARTICLES.map((article) => (
            <li key={article.id} className="sc-d039b6e9-2 kVKuuC group">
              <div className="Link__StyledLink-sc-pudy0l-0 eYZQRC sc-db79b53f-0 hSQGJY block h-full no-underline cursor-pointer">
                <div className="sc-db79b53f-1 ihImIC rounded-xl overflow-hidden aspect-[16/9] relative bg-gray-100 shadow-xs group-hover:shadow-md transition-all">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="sc-8e2511ba-2 dYYGfg w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-black/75 text-[#ffb932] backdrop-blur-sm text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    {article.tagline}
                  </span>
                </div>
                
                <div className="sc-db79b53f-2 igfezH mt-3 space-y-1.5">
                  <span className="sc-db79b53f-3 eIfuRw type-snowdon text-gray-400 block">
                    {article.tagline}
                  </span>
                  <h3 className="sc-db79b53f-4 fypInu type-blanc text-sm font-bold text-gray-900 group-hover:text-[#024ddf] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="sc-db79b53f-5 hhOzil text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {article.text}
                  </p>
                  <span className="sc-db79b53f-6 kJOSZa type-snowdon text-[#024ddf] font-bold inline-flex items-center space-x-1 pt-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
