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
    tagline: 'General Info',
    title: 'All In Prices Explained',
    text: "Here's what you need to know about All In Prices, and why there are fees on top of the ticket price.",
    imageUrl: 'https://prismic-images.tmol.io/ticketmaster-tm-global/1VPuYshAp4r8uNX2_IMG_5253.png?auto=format,compress&rect=0,0,2000,1123&w=616&h=346',
    link: 'https://www.ticketmaster.com/welcome/all-in?ac_link=hpguide'
  },
  {
    id: 'art-2',
    tagline: 'Ticket Tips',
    title: 'What to Bring to a Concert',
    text: 'Read our ultimate packing checklist before you go to your next show.',
    imageUrl: 'https://prismic-images.tmol.io/ticketmaster-tm-global/Wvuuscx5AScCzapq_what-to-bring-to-a-concert-1024x614-2-.jpg?auto=format,compress&rect=0,19,1024,575&w=308&h=173',
    link: 'https://blog.ticketmaster.com/what-to-bring-to-a-concert/?ac_link=hpguide'
  },
  {
    id: 'art-3',
    tagline: 'Sports',
    title: 'MLS 2026 Season FAQs',
    text: 'Get ready for your next match with our 2026 MLS guide.',
    imageUrl: 'https://prismic-images.tmol.io/ticketmaster-tm-global/aYuB5t0YXLCxVqgZ_2026soccerworldcup.jpg?auto=format,compress&rect=19,0,1243,698&w=308&h=173',
    link: 'https://blog.ticketmaster.com/mls-faqs/?ac_link=hpguide'
  },
  {
    id: 'art-4',
    tagline: 'General Info',
    title: 'Get the Most Out of Your Ticketmaster Account',
    text: "Learn what's possible with this guide of ticket tips and info.",
    imageUrl: 'https://prismic-images.tmol.io/ticketmaster-tm-global/nq67UbwPJf_VjV25_Account-Manager-Featured-Image-1024x536.jpg?auto=format,compress&rect=35,0,954,536&w=308&h=173',
    link: 'https://blog.ticketmaster.com/ticketmaster-account-manual/?ac_link=hpguide'
  },
  {
    id: 'art-5',
    tagline: 'Sports',
    title: 'A Look at the 2026 MLB Schedule and New Rules',
    text: 'MLB’s 2026 season is bringing big schedule changes and new rules. Here’s what fans need to know before first pitch.',
    imageUrl: 'https://prismic-images.tmol.io/ticketmaster-tm-global/Z7a8IJ7c43Q3f_lc_mlb-faqs-2025.png?auto=format,compress&rect=0,0,1024,575&w=616&h=346',
    link: 'https://blog.ticketmaster.com/mlb-schedule-explained/?ac_link=hpguide'
  },
  {
    id: 'art-6',
    tagline: 'Local Guide',
    title: '6 Broadway Shows to See This Fall in NYC',
    text: 'Need ideas for family activities in NYC this fall? Here are the best Broadway shows and musicals to see in 2026.',
    imageUrl: 'https://prismic-images.tmol.io/ticketmaster-tm-global/BYlo9-FVTsHNUDOO_fall-broadway-shows.png?auto=format,compress&rect=0,0,1024,575&w=616&h=346',
    link: 'https://blog.ticketmaster.com/broadway-shows-2026-nyc/?ac_link=hpguide'
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
                    loading="lazy"
                    decoding="async"
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
