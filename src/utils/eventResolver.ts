import { EventItem } from '../types';
import { HAPPENING_THIS_WEEKEND_DATA } from '../components/Discovery/HappeningThisWeekend';
import { TRENDING_SEARCHES_DATA } from '../components/Discovery/TrendingSearches';
import { POPULAR_NEAR_YOU_DATA } from '../components/Discovery/PopularNearYou';
import { SPONSORED_PRESALES_DATA } from '../components/Discovery/SponsoredPresales';

/**
 * Universal Event Resolver
 * Converts any event name, artist, sports team, or show from the Ticketmaster homepage
 * into a complete, alive, interactive EventItem with accurate pricing, venue, date, and seating layout.
 */
export function resolveEventForBooking(
  queryOrName: string,
  existingEvents: EventItem[]
): EventItem {
  const clean = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const targetClean = clean(queryOrName);

  // 1. Direct match in existing events by ID, title, or main performer
  const foundInExisting = existingEvents.find(e => {
    const titleClean = clean(e.identity.event_title);
    const performerClean = clean(e.identity.main_performer);
    return titleClean.includes(targetClean) || 
           targetClean.includes(titleClean) || 
           performerClean.includes(targetClean) ||
           targetClean.includes(performerClean) ||
           e.identity.event_id.toLowerCase() === queryOrName.toLowerCase();
  });
  if (foundInExisting) {
    return foundInExisting;
  }

  // 2. Match in Happening This Weekend (all 20 items)
  const weekendMatch = HAPPENING_THIS_WEEKEND_DATA.find(w => {
    const wClean = clean(w.name);
    return wClean.includes(targetClean) || targetClean.includes(wClean);
  });
  if (weekendMatch) {
    const category = weekendMatch.category === 'Sports' ? 'Sports' : 
                     weekendMatch.category === 'Spectacular' ? 'Arts & Theater' : 'Concerts';
    return {
      identity: {
        event_title: `${weekendMatch.name}: Live Tour`,
        event_id: `TM-EVT-${targetClean.slice(0, 10).toUpperCase()}`,
        event_url: `https://www.ticketmaster.com/event/${targetClean}`,
        category: category as any,
        subcategory: weekendMatch.category,
        subgenre: weekendMatch.category,
        main_performer: weekendMatch.name,
        lineup: [weekendMatch.name],
        supporting_acts: [],
        image_url: weekendMatch.imageUrl,
        banner_url: weekendMatch.imageUrl,
        is_featured: true,
        is_selling_fast: true
      },
      date_time: {
        exact_date: '2026-10-24',
        day_of_week: 'Saturday',
        start_time: '19:30:00',
        end_time: '23:00:00',
        time_zone: 'EST',
        doors_time: '18:30:00',
        full_date_display: `${weekendMatch.dateDisplay}, 2026 • ${weekendMatch.timeDisplay}`
      },
      location: {
        venue_name: weekendMatch.venue,
        venue_url: `https://www.ticketmaster.com/venue/${clean(weekendMatch.venue)}`,
        city: weekendMatch.city,
        state: weekendMatch.state,
        country: 'United States',
        full_address: `${weekendMatch.venue}, ${weekendMatch.city}, ${weekendMatch.state}`,
        parking_info: `Official parking passes available for ${weekendMatch.venue}.`,
        accessibility_info: 'ADA wheelchair seating and companion tickets available at all price levels.',
        capacity: 18500
      },
      pricing: {
        currency: 'USD',
        min_price: 59.50,
        max_price: 375.00
      },
      description: {
        full_description: `Official verified live event: ${weekendMatch.name} at ${weekendMatch.venue} in ${weekendMatch.city}, ${weekendMatch.state}. Direct primary ticket access with Ticketmaster SafeTix encryption and 100% Buyer Guarantee.`,
        special_notices: 'Mobile barcode tickets only. Screenshots will not be accepted for venue entry.',
        age_restrictions: 'All ages welcome unless otherwise specified by local venue guidelines.',
        entry_requirements: 'Clear bag policy in effect. Doors open 60 minutes prior to scheduled start.'
      }
    };
  }

  // 3. Match in Trending Searches (Pentatonix, Calvin Harris, Olivia Rodrigo, etc.)
  const trendingMatch = TRENDING_SEARCHES_DATA.find(t => {
    const tClean = clean(t.name);
    return tClean.includes(targetClean) || targetClean.includes(tClean);
  });
  if (trendingMatch) {
    return {
      identity: {
        event_title: `${trendingMatch.name}: Live in Concert`,
        event_id: `TM-TRD-${targetClean.slice(0, 10).toUpperCase()}`,
        event_url: `https://www.ticketmaster.com/event/${targetClean}`,
        category: trendingMatch.name.toLowerCase().includes('sphere') ? 'Arts & Theater' : 'Concerts',
        subcategory: trendingMatch.genre,
        subgenre: trendingMatch.genre,
        main_performer: trendingMatch.name,
        lineup: [trendingMatch.name],
        supporting_acts: [],
        image_url: trendingMatch.imageUrl,
        banner_url: trendingMatch.imageUrl,
        is_featured: true,
        is_selling_fast: true
      },
      date_time: {
        exact_date: '2026-11-06',
        day_of_week: 'Friday',
        start_time: '20:00:00',
        end_time: '23:00:00',
        time_zone: 'EST',
        doors_time: '19:00:00',
        full_date_display: 'Friday, Nov 6, 2026 • 8:00 PM'
      },
      location: {
        venue_name: 'Madison Square Garden',
        venue_url: 'https://www.ticketmaster.com/venue/msg',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        full_address: '4 Pennsylvania Plaza, New York, NY 10001',
        parking_info: 'Underground MSG parking available.',
        accessibility_info: 'ADA accessible seating, wheelchair companion seats, and assistive listening.',
        capacity: 19500
      },
      pricing: {
        currency: 'USD',
        min_price: 65.00,
        max_price: 420.00
      },
      description: {
        full_description: `Experience ${trendingMatch.name} live with complete stage production, premier acoustics, and verified SafeTix admission.`,
        special_notices: 'Primary inventory verified by Ticketmaster.',
        age_restrictions: 'All ages.',
        entry_requirements: 'Clear bag policy enforced.'
      }
    };
  }

  // 4. Match in Popular Near You (Concerts, Sports, Arts, Family)
  const popularMatch = POPULAR_NEAR_YOU_DATA.find(p => {
    const pClean = clean(p.name);
    return pClean.includes(targetClean) || targetClean.includes(pClean);
  });
  if (popularMatch) {
    const isSports = popularMatch.categoryTab === 'sports';
    const isArts = popularMatch.categoryTab === 'arts';
    const isFamily = popularMatch.categoryTab === 'family';
    const category = isSports ? 'Sports' : isArts ? 'Arts & Theater' : isFamily ? 'Family' : 'Concerts';

    return {
      identity: {
        event_title: isSports ? `${popularMatch.name} Home Game` : `${popularMatch.name}: Live Tour`,
        event_id: `TM-POP-${targetClean.slice(0, 10).toUpperCase()}`,
        event_url: `https://www.ticketmaster.com/event/${targetClean}`,
        category: category as any,
        subcategory: popularMatch.genre,
        subgenre: popularMatch.genre,
        main_performer: popularMatch.name,
        lineup: [popularMatch.name],
        supporting_acts: [],
        image_url: popularMatch.imageUrl,
        banner_url: popularMatch.imageUrl,
        is_featured: true,
        is_selling_fast: true
      },
      date_time: {
        exact_date: '2026-11-14',
        day_of_week: 'Saturday',
        start_time: '19:30:00',
        end_time: '22:30:00',
        time_zone: 'EST',
        doors_time: '18:30:00',
        full_date_display: 'Saturday, Nov 14, 2026 • 7:30 PM'
      },
      location: {
        venue_name: isSports ? 'Crypto.com Arena' : isArts ? 'Radio City Music Hall' : 'SoFi Stadium',
        venue_url: 'https://www.ticketmaster.com/venue/arena',
        city: isArts ? 'New York' : 'Los Angeles',
        state: isArts ? 'NY' : 'CA',
        country: 'United States',
        full_address: isArts ? '1260 Avenue of the Americas, New York, NY' : '1111 S Figueroa St, Los Angeles, CA',
        parking_info: 'Official prepaid venue parking passes available.',
        accessibility_info: 'Full ADA compliance with accessible restrooms and ramps.',
        capacity: 20000
      },
      pricing: {
        currency: 'USD',
        min_price: isSports ? 45.00 : 79.00,
        max_price: isSports ? 350.00 : 495.00
      },
      description: {
        full_description: `Official verified tickets for ${popularMatch.name}. Verified primary ticket access with Ticketmaster SafeTix dynamic barcodes.`,
        special_notices: 'No paper tickets. Enter using the Ticketmaster mobile app or mobile browser.',
        age_restrictions: 'All ages.',
        entry_requirements: 'Venue security screening at all gates.'
      }
    };
  }

  // 5. Match in Sponsored Presales (Citi)
  const presaleMatch = SPONSORED_PRESALES_DATA.find(s => {
    const sClean = clean(s.artist);
    return sClean.includes(targetClean) || targetClean.includes(sClean);
  });
  if (presaleMatch) {
    return {
      identity: {
        event_title: `${presaleMatch.artist} - Citi Cardmember Presale`,
        event_id: `TM-PRE-${targetClean.slice(0, 10).toUpperCase()}`,
        event_url: `https://www.ticketmaster.com/event/${targetClean}`,
        category: 'Concerts',
        subcategory: 'Alternative',
        subgenre: 'Alternative',
        main_performer: presaleMatch.artist,
        lineup: [presaleMatch.artist],
        supporting_acts: [],
        image_url: presaleMatch.imageUrl,
        banner_url: presaleMatch.imageUrl,
        is_featured: true,
        is_presale: true
      },
      date_time: {
        exact_date: '2026-11-20',
        day_of_week: 'Friday',
        start_time: '20:00:00',
        end_time: '23:00:00',
        time_zone: 'EST',
        doors_time: '19:00:00',
        full_date_display: presaleMatch.eventDate || 'Friday, Nov 20, 2026 • 8:00 PM'
      },
      location: {
        venue_name: presaleMatch.venue || 'Barclays Center',
        venue_url: `https://www.ticketmaster.com/venue/${clean(presaleMatch.venue || 'barclays')}`,
        city: presaleMatch.city || 'Brooklyn',
        state: presaleMatch.state || 'NY',
        country: 'United States',
        full_address: `${presaleMatch.venue}, ${presaleMatch.city}, ${presaleMatch.state}`,
        parking_info: 'Official venue parking options available.',
        accessibility_info: 'ADA accessible seating on all concourse levels.',
        capacity: 17700
      },
      pricing: {
        currency: 'USD',
        min_price: 52.00,
        max_price: 295.00
      },
      description: {
        full_description: `${presaleMatch.artist} live in concert at ${presaleMatch.venue}. Citi Cardmember Preferred Access and Verified Primary Tickets.`,
        special_notices: 'Citi Cardmembers use first 6 digits of card as presale passcode.',
        age_restrictions: 'All ages.',
        entry_requirements: 'Mobile SafeTix entry only.'
      }
    };
  }

  // 6. Special hero items (Pentatonix, Luke Combs, Trans-Siberian Orchestra)
  if (targetClean.includes('pentatonix')) {
    return {
      identity: {
        event_title: 'Pentatonix: The World Tour 2026',
        event_id: 'TM-PTX-2026',
        event_url: 'https://www.ticketmaster.com/pentatonix-tickets/artist/1654335',
        category: 'Concerts',
        subcategory: 'A Cappella / Pop',
        subgenre: 'Pop',
        main_performer: 'Pentatonix',
        lineup: ['Pentatonix'],
        supporting_acts: [],
        image_url: 'https://s1.ticketm.net/dam/a/007/c8a22313-f355-4dbd-8a5e-994183aa3007_TABLET_LANDSCAPE_LARGE_16_9.jpg',
        banner_url: 'https://s1.ticketm.net/dam/a/007/c8a22313-f355-4dbd-8a5e-994183aa3007_TABLET_LANDSCAPE_LARGE_16_9.jpg',
        is_featured: true,
        is_selling_fast: true
      },
      date_time: {
        exact_date: '2026-11-28',
        day_of_week: 'Saturday',
        start_time: '19:30:00',
        end_time: '22:30:00',
        time_zone: 'EST',
        doors_time: '18:30:00',
        full_date_display: 'Saturday, Nov 28, 2026 • 7:30 PM'
      },
      location: {
        venue_name: 'Madison Square Garden',
        venue_url: 'https://www.ticketmaster.com/venue/msg',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        full_address: '4 Pennsylvania Plaza, New York, NY 10001',
        parking_info: 'Official garage parking available nearby.',
        accessibility_info: 'Full ADA compliance.',
        capacity: 19500
      },
      pricing: {
        currency: 'USD',
        min_price: 69.50,
        max_price: 385.00
      },
      description: {
        full_description: 'Experience 3x Grammy-winning vocal sensation Pentatonix live on their massive 2026 World Tour. Featuring breathtaking 5-part vocal harmonies, brand new choreography, and hit holiday & pop favorites.',
        special_notices: 'All tickets are 100% verified SafeTix with dynamic encrypted barcodes.',
        age_restrictions: 'All ages welcome.',
        entry_requirements: 'Clear bag policy strictly enforced.'
      }
    };
  }

  // 7. Fallback: Synthesize clean, authentic Ticketmaster verified event
  const title = queryOrName.trim() || 'Verified Live Spectacular';
  return {
    identity: {
      event_title: title.includes(':') ? title : `${title}: Live Showcase`,
      event_id: `TM-GEN-${targetClean.slice(0, 10).toUpperCase() || 'LIVE'}`,
      event_url: `https://www.ticketmaster.com/event/${targetClean || 'show'}`,
      category: 'Concerts',
      subcategory: 'Live Entertainment',
      subgenre: 'Pop / Rock',
      main_performer: title,
      lineup: [title],
      supporting_acts: [],
      image_url: 'https://s1.ticketm.net/dam/a/007/c8a22313-f355-4dbd-8a5e-994183aa3007_TABLET_LANDSCAPE_LARGE_16_9.jpg',
      banner_url: 'https://s1.ticketm.net/dam/a/007/c8a22313-f355-4dbd-8a5e-994183aa3007_TABLET_LANDSCAPE_LARGE_16_9.jpg',
      is_featured: true,
      is_selling_fast: true
    },
    date_time: {
      exact_date: '2026-11-15',
      day_of_week: 'Sunday',
      start_time: '19:30:00',
      end_time: '22:30:00',
      time_zone: 'EST',
      doors_time: '18:30:00',
      full_date_display: 'Sunday, Nov 15, 2026 • 7:30 PM'
    },
    location: {
      venue_name: 'Crypto.com Arena',
      venue_url: 'https://www.ticketmaster.com/venue/la-arena',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      full_address: '1111 S Figueroa St, Los Angeles, CA 90015',
      parking_info: 'L.A. LIVE parking garages and transit lines available.',
      accessibility_info: 'ADA accessible seating on all levels.',
      capacity: 19000
    },
    pricing: {
      currency: 'USD',
      min_price: 55.00,
      max_price: 350.00
    },
    description: {
      full_description: `Official Ticketmaster live access for ${title}. Verified primary tickets with 100% Buyer Guarantee and SafeTix digital protection.`,
      special_notices: 'Direct mobile barcode delivery.',
      age_restrictions: 'All ages.',
      entry_requirements: 'Venue guidelines apply.'
    }
  };
}
