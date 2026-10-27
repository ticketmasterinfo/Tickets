import { EventItem, ArtistProfile } from '../types';
import { EVENTS_DATA } from '../data/eventsData';
import { HAPPENING_THIS_WEEKEND_DATA } from '../components/Discovery/HappeningThisWeekend';
import { TRENDING_SEARCHES_DATA } from '../components/Discovery/TrendingSearches';
import { POPULAR_NEAR_YOU_DATA } from '../components/Discovery/PopularNearYou';
import { SPONSORED_PRESALES_DATA } from '../components/Discovery/SponsoredPresales';
import { ARTISTS_DATABASE } from '../data/artistsData';
import { resolveEventForBooking } from './eventResolver';

export interface SearchResultItem {
  id: string;
  type: 'artist' | 'event' | 'venue' | 'city';
  title: string;
  subtitle: string;
  category: string;
  city?: string;
  venue?: string;
  date?: string;
  imageUrl?: string;
  eventItem?: EventItem;
  artistId?: string;
}

// Build unified search database once
let cachedUnifiedIndex: SearchResultItem[] | null = null;

export function getUnifiedSearchIndex(liveEvents: EventItem[] = []): SearchResultItem[] {
  const items: SearchResultItem[] = [];
  const seenTitles = new Set<string>();

  // 1. Calvin Harris First-Class Entry
  items.push({
    id: 'artist-calvin-harris',
    type: 'artist',
    title: 'Calvin Harris',
    subtitle: 'Pop / Dance &bull; Official 2026-2027 Concert Tour',
    category: 'Concerts',
    imageUrl: '/assets/aistudio/IMG_6648_6f59728a.jpeg'
  });
  seenTitles.add('calvin harris');

  // 2. Artists from ARTISTS_DATABASE
  Object.values(ARTISTS_DATABASE).forEach(art => {
    const key = art.name.toLowerCase();
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      items.push({
        id: `artist-${art.id}`,
        type: 'artist',
        title: art.name,
        subtitle: `${art.genre} &bull; ${art.tourName || 'Tour Dates Available'}`,
        category: 'Concerts',
        imageUrl: art.heroImageUrl || art.avatarUrl
      });
    }
  });

  // 3. Trending Searches performers
  TRENDING_SEARCHES_DATA.forEach(t => {
    const key = t.name.toLowerCase();
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      items.push({
        id: `trending-${t.name}`,
        type: 'artist',
        title: t.name,
        subtitle: `${t.genre} &bull; Trending Search Attraction`,
        category: t.name.toLowerCase().includes('sphere') ? 'Arts & Theater' : 'Concerts',
        imageUrl: t.imageUrl
      });
    }
  });

  // 4. Popular Near You performers across all tabs
  Object.values(POPULAR_NEAR_YOU_DATA).flat().forEach(p => {
    const key = p.name.toLowerCase();
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      items.push({
        id: `popular-${p.name}`,
        type: 'artist',
        title: p.name,
        subtitle: `${p.genre} &bull; Popular Attraction`,
        category: p.genre === 'NBA' || p.genre === 'NFL' || p.genre === 'NHL' ? 'Sports' : 'Concerts',
        imageUrl: p.imageUrl
      });
    }
  });

  // 5. Sponsored Presales (Interpol, CHVRCHES, 2hollis)
  SPONSORED_PRESALES_DATA.forEach(s => {
    const key = s.artist.toLowerCase();
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      items.push({
        id: `presale-${s.id}`,
        type: 'event',
        title: s.artist,
        subtitle: `${s.venue} &bull; ${s.city}, ${s.state} &bull; ${s.eventDate}`,
        category: 'Concerts',
        city: s.city,
        venue: s.venue,
        date: s.eventDate,
        imageUrl: s.imageUrl
      });
    }
  });

  // 6. Happening This Weekend items
  HAPPENING_THIS_WEEKEND_DATA.forEach(w => {
    const key = w.name.toLowerCase() + '-' + w.city.toLowerCase();
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      items.push({
        id: `weekend-${w.name}-${w.city}`,
        type: 'event',
        title: w.name,
        subtitle: `${w.venue} &bull; ${w.city}, ${w.state} &bull; ${w.dateDisplay}`,
        category: w.name.includes('SmackDown') ? 'Sports' : 'Concerts',
        city: w.city,
        venue: w.venue,
        date: w.dateDisplay,
        imageUrl: w.imageUrl
      });
    }
  });

  // 7. Live / Catalog Events
  const allEvents = liveEvents.length > 0 ? liveEvents : EVENTS_DATA;
  allEvents.forEach(e => {
    const key = e.identity.event_title.toLowerCase();
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      items.push({
        id: e.identity.event_id,
        type: 'event',
        title: e.identity.event_title,
        subtitle: `${e.location.venue_name} &bull; ${e.location.city}, ${e.location.state} &bull; ${e.date_time.full_date_display}`,
        category: e.identity.category,
        city: e.location.city,
        venue: e.location.venue_name,
        date: e.date_time.full_date_display,
        imageUrl: e.identity.image_url,
        eventItem: e
      });
    }
  });

  // 8. Top Metro Cities
  const metroCities = [
    { name: 'New York City', state: 'NY' },
    { name: 'Los Angeles', state: 'CA' },
    { name: 'Las Vegas', state: 'NV' },
    { name: 'Chicago', state: 'IL' },
    { name: 'Atlanta', state: 'GA' },
    { name: 'Nashville', state: 'TN' },
    { name: 'Denver', state: 'CO' },
    { name: 'Miami', state: 'FL' },
    { name: 'Boston', state: 'MA' },
    { name: 'Houston', state: 'TX' }
  ];
  metroCities.forEach(c => {
    items.push({
      id: `city-${c.name}`,
      type: 'city',
      title: `${c.name}, ${c.state}`,
      subtitle: `Find Concerts, Sports & Shows in ${c.name}`,
      category: 'Cities',
      city: c.name
    });
  });

  return items;
}

/**
 * Robust search query evaluator with fuzzy token matching
 */
export function searchCatalogue(query: string, liveEvents: EventItem[] = []): {
  artists: SearchResultItem[];
  events: SearchResultItem[];
  cities: SearchResultItem[];
  allMatches: SearchResultItem[];
} {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) {
    return { artists: [], events: [], cities: [], allMatches: [] };
  }

  const index = getUnifiedSearchIndex(liveEvents);
  const qTokens = cleanQ.split(/\s+/).filter(Boolean);

  const scoredMatches: { item: SearchResultItem; score: number }[] = [];

  for (const item of index) {
    const titleLower = item.title.toLowerCase();
    const subtitleLower = item.subtitle.toLowerCase();
    const categoryLower = item.category.toLowerCase();
    const cityLower = (item.city || '').toLowerCase();
    const venueLower = (item.venue || '').toLowerCase();

    let score = 0;

    // Exact title match gets highest score
    if (titleLower === cleanQ) {
      score += 100;
    } else if (titleLower.startsWith(cleanQ)) {
      score += 50;
    } else if (titleLower.includes(cleanQ)) {
      score += 30;
    }

    // Calvin Harris special boosting
    if (cleanQ.includes('calvin') || cleanQ.includes('harris')) {
      if (titleLower.includes('calvin harris')) {
        score += 80;
      }
    }

    // Token matching across all fields
    const allText = `${titleLower} ${subtitleLower} ${categoryLower} ${cityLower} ${venueLower}`;
    const allTokensMatch = qTokens.every(tok => allText.includes(tok));

    if (allTokensMatch) {
      score += 20;
    } else {
      const someTokensMatch = qTokens.some(tok => allText.includes(tok));
      if (someTokensMatch) {
        score += 10;
      }
    }

    if (score > 0) {
      scoredMatches.push({ item, score });
    }
  }

  // Sort descending by score
  scoredMatches.sort((a, b) => b.score - a.score);

  const allMatches = scoredMatches.map(s => s.item);

  return {
    artists: allMatches.filter(m => m.type === 'artist'),
    events: allMatches.filter(m => m.type === 'event'),
    cities: allMatches.filter(m => m.type === 'city'),
    allMatches
  };
}
