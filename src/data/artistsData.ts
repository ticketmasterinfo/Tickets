import { ArtistProfile, ArtistTourDate, EventItem } from '../types';
import { EVENTS_DATA } from './eventsData';

export const ARTISTS_DATABASE: Record<string, ArtistProfile> = {
  'harry-styles': {
    id: '2366444',
    slug: 'harry-styles-tickets',
    name: 'Harry Styles',
    genre: 'Pop',
    subgenre: 'Pop Rock',
    heroImageUrl: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    bannerImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80',
    avatarUrl: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    verified: true,
    fanCount: '4.9M',
    rating: 4.9,
    reviewCount: 48920,
    tourName: 'Love On Tour: Together Together Tour 2026',
    headlineNotice: 'Extra Stadium & Arena residencies added due to monumental demand. Verified Fan presale now unlocked.',
    biography: 'Grammy and Brit Award-winning global superstar Harry Styles has established himself as one of the most influential and celebrated musical icons of the 21st century. Following the historic multi-year success of Love On Tour, which grossed over $600 million across 173 sold-out stadium dates worldwide, Styles brings his dazzling, joyous live show back for an exclusive series of multi-night residencies in major world entertainment capitals. Expect vibrant energy, high fashion, intimate fan connections, and dazzling live renditions of chart-topping anthems like "As It Was", "Watermelon Sugar", and "Sign of the Times".',
    careerHighlights: [
      'Grammy Award Winner for Album of the Year (Harry\'s House)',
      'Billboard #1 Hit "As It Was" (Longest-running solo #1 in Billboard Hot 100 history)',
      'Record-setting 15-night historic sold-out residency at Madison Square Garden',
      'Brit Awards sweep: British Artist, Song of the Year, Mastercard Album of the Year'
    ],
    topTracks: [
      { title: 'As It Was', album: "Harry's House", duration: '2:47', streams: '3.4B' },
      { title: 'Watermelon Sugar', album: 'Fine Line', duration: '2:54', streams: '2.8B' },
      { title: 'Sign of the Times', album: 'Harry Styles', duration: '5:40', streams: '1.9B' },
      { title: 'Late Night Talking', album: "Harry's House", duration: '2:57', streams: '1.2B' },
      { title: 'Adore You', album: 'Fine Line', duration: '3:27', streams: '1.6B' },
      { title: 'Golden', album: 'Fine Line', duration: '3:28', streams: '980M' }
    ],
    vipPackages: [
      {
        title: 'Harry Styles VIP Lounge Experience',
        price: 650,
        perks: [
          'One premium reserved Lower Bowl ticket in the first 5 rows or General Admission Pit ticket with Early Entry',
          'Access to the official pre-show Harry Styles VIP Hospitality Lounge featuring themed drinks & hors d\'oeuvres',
          'Exclusive tour merchandise bundle including collector\'s tour laminate & custom silkscreen poster',
          'Dedicated VIP turnstile entrance and crowd-free on-site merchandise shopping',
          'On-site VIP event management concierge'
        ]
      },
      {
        title: 'Watermelon Sugar Early Entry Pit Package',
        price: 425,
        perks: [
          'One standing general admission floor/pit ticket with priority early entry to the venue floor',
          'Specially designed Harry Styles VIP tour gift item and limited-edition wristband',
          'Official commemorative VIP tour laminate and lanyard',
          'Early access to merchandise stand prior to general doors opening'
        ]
      },
      {
        title: 'Gold Premium Seat Package',
        price: 320,
        perks: [
          'One top-tier reserved seat in prime Lower Tier club sections',
          'Exclusive Harry Styles concert tour merchandise gift pack',
          'Commemorative ticket sleeve and collectible tour credential'
        ]
      }
    ],
    tourDates: [
      {
        eventId: 'HS-NYC-01',
        date: '2026-10-14',
        dayOfWeek: 'Wednesday',
        month: 'OCT',
        dayNumber: '14',
        time: '8:00 PM',
        doorsTime: '6:30 PM',
        eventTitle: 'Harry Styles: Love On Tour Live in New York',
        venueName: 'Madison Square Garden',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        minPrice: 145,
        maxPrice: 650,
        status: 'Selling Fast',
        hasVip: true,
        hasResale: true,
        eventItem: {
          identity: {
            event_title: 'Harry Styles: Love On Tour Live in New York',
            event_id: 'HS-NYC-01',
            event_url: 'https://www.ticketmaster.com/harry-styles-tickets/artist/2366444',
            category: 'Concerts',
            subcategory: 'Pop Rock',
            subgenre: 'Pop',
            main_performer: 'Harry Styles',
            lineup: ['Harry Styles', 'Wet Leg'],
            supporting_acts: ['Wet Leg'],
            image_url: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            banner_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80',
            is_featured: true,
            is_selling_fast: true
          },
          date_time: {
            exact_date: '2026-10-14',
            day_of_week: 'Wednesday',
            start_time: '20:00:00',
            end_time: '23:00:00',
            time_zone: 'EST',
            doors_time: '18:30:00',
            full_date_display: 'Wednesday, Oct 14, 2026 • 8:00 PM'
          },
          location: {
            venue_name: 'Madison Square Garden',
            venue_url: 'https://www.ticketmaster.com/venue/new-york',
            city: 'New York',
            state: 'NY',
            country: 'United States',
            full_address: '4 Pennsylvania Plaza, New York, NY 10001',
            parking_info: 'Underground parking at MSG & surrounding garages on 7th and 8th Ave.',
            accessibility_info: 'Full ADA accessibility, wheelchair seating, and sensory inclusive kits available at guest relations.',
            capacity: 20789
          },
          pricing: {
            currency: 'USD',
            min_price: 145,
            max_price: 650
          },
          description: {
            full_description: 'Harry Styles live at Madison Square Garden. Join the historic residency featuring unforgettable live performances, theatrical production, and timeless music.',
            special_notices: 'Mobile tickets only via Ticketmaster SafeTix. Strict limit of 6 tickets per household.',
            age_restrictions: 'All ages welcome. Pit tickets recommend ages 14+.',
            entry_requirements: 'Clear bag policy strictly enforced. No professional cameras allowed.'
          }
        }
      },
      {
        eventId: 'HS-NYC-02',
        date: '2026-10-16',
        dayOfWeek: 'Friday',
        month: 'OCT',
        dayNumber: '16',
        time: '8:00 PM',
        doorsTime: '6:30 PM',
        eventTitle: 'Harry Styles: Love On Tour Live in New York (Night 2)',
        venueName: 'Madison Square Garden',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        minPrice: 160,
        maxPrice: 650,
        status: 'Few Tickets Left',
        hasVip: true,
        hasResale: true,
        eventItem: {
          identity: {
            event_title: 'Harry Styles: Love On Tour Live in New York (Night 2)',
            event_id: 'HS-NYC-02',
            event_url: 'https://www.ticketmaster.com/harry-styles-tickets/artist/2366444',
            category: 'Concerts',
            subcategory: 'Pop Rock',
            subgenre: 'Pop',
            main_performer: 'Harry Styles',
            lineup: ['Harry Styles', 'Wet Leg'],
            supporting_acts: ['Wet Leg'],
            image_url: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            banner_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80',
            is_featured: true,
            is_selling_fast: true
          },
          date_time: {
            exact_date: '2026-10-16',
            day_of_week: 'Friday',
            start_time: '20:00:00',
            end_time: '23:00:00',
            time_zone: 'EST',
            doors_time: '18:30:00',
            full_date_display: 'Friday, Oct 16, 2026 • 8:00 PM'
          },
          location: {
            venue_name: 'Madison Square Garden',
            venue_url: 'https://www.ticketmaster.com/venue/new-york',
            city: 'New York',
            state: 'NY',
            country: 'United States',
            full_address: '4 Pennsylvania Plaza, New York, NY 10001',
            parking_info: 'Official garage parking available on 31st and 33rd Streets.',
            accessibility_info: 'ADA seating on all levels with elevator escorts.',
            capacity: 20789
          },
          pricing: {
            currency: 'USD',
            min_price: 160,
            max_price: 650
          },
          description: {
            full_description: 'Friday night celebration with Harry Styles at MSG. Experience the electrifying energy of Love On Tour.',
            special_notices: 'Ticketmaster SafeTix barcode refreshes automatically. Screenshots are not accepted.',
            age_restrictions: 'All ages welcome.',
            entry_requirements: 'Clear bag policy applies.'
          }
        }
      },
      {
        eventId: 'HS-LA-01',
        date: '2026-10-23',
        dayOfWeek: 'Friday',
        month: 'OCT',
        dayNumber: '23',
        time: '8:00 PM',
        doorsTime: '6:30 PM',
        eventTitle: 'Harry Styles: Love On Tour Live in Inglewood / LA',
        venueName: 'Kia Forum',
        city: 'Inglewood',
        state: 'CA',
        country: 'United States',
        minPrice: 155,
        maxPrice: 625,
        status: 'Selling Fast',
        hasVip: true,
        hasResale: true,
        eventItem: {
          identity: {
            event_title: 'Harry Styles: Love On Tour Live in Inglewood / LA',
            event_id: 'HS-LA-01',
            event_url: 'https://www.ticketmaster.com/harry-styles-tickets/artist/2366444',
            category: 'Concerts',
            subcategory: 'Pop Rock',
            subgenre: 'Pop',
            main_performer: 'Harry Styles',
            lineup: ['Harry Styles', 'Jenny Lewis'],
            supporting_acts: ['Jenny Lewis'],
            image_url: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            banner_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80',
            is_featured: true,
            is_selling_fast: true
          },
          date_time: {
            exact_date: '2026-10-23',
            day_of_week: 'Friday',
            start_time: '20:00:00',
            end_time: '23:00:00',
            time_zone: 'PST',
            doors_time: '18:30:00',
            full_date_display: 'Friday, Oct 23, 2026 • 8:00 PM'
          },
          location: {
            venue_name: 'Kia Forum',
            venue_url: 'https://www.ticketmaster.com/venue/kia-forum',
            city: 'Inglewood',
            state: 'CA',
            country: 'United States',
            full_address: '3900 W Manchester Blvd, Inglewood, CA 90305',
            parking_info: 'Pre-paid parking strongly recommended at the Forum lot.',
            accessibility_info: 'Wheelchair accessible ramps and dedicated ADA restrooms throughout the concourse.',
            capacity: 17500
          },
          pricing: {
            currency: 'USD',
            min_price: 155,
            max_price: 625
          },
          description: {
            full_description: 'Harry Styles returns to Southern California for a dazzling weekend at the legendary Kia Forum.',
            special_notices: 'Verified Tickets guarantee authentic admission.',
            age_restrictions: 'All ages.',
            entry_requirements: 'Cashless venue; cards and mobile payments only.'
          }
        }
      },
      {
        eventId: 'HS-CHI-01',
        date: '2026-11-04',
        dayOfWeek: 'Wednesday',
        month: 'NOV',
        dayNumber: '04',
        time: '8:00 PM',
        doorsTime: '6:30 PM',
        eventTitle: 'Harry Styles: Love On Tour Live in Chicago',
        venueName: 'United Center',
        city: 'Chicago',
        state: 'IL',
        country: 'United States',
        minPrice: 135,
        maxPrice: 590,
        status: 'On Sale',
        hasVip: true,
        hasResale: true,
        eventItem: {
          identity: {
            event_title: 'Harry Styles: Love On Tour Live in Chicago',
            event_id: 'HS-CHI-01',
            event_url: 'https://www.ticketmaster.com/harry-styles-tickets/artist/2366444',
            category: 'Concerts',
            subcategory: 'Pop Rock',
            subgenre: 'Pop',
            main_performer: 'Harry Styles',
            lineup: ['Harry Styles'],
            supporting_acts: [],
            image_url: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            banner_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80',
            is_featured: true
          },
          date_time: {
            exact_date: '2026-11-04',
            day_of_week: 'Wednesday',
            start_time: '20:00:00',
            end_time: '23:00:00',
            time_zone: 'CST',
            doors_time: '18:30:00',
            full_date_display: 'Wednesday, Nov 4, 2026 • 8:00 PM'
          },
          location: {
            venue_name: 'United Center',
            venue_url: 'https://www.ticketmaster.com/venue/united-center',
            city: 'Chicago',
            state: 'IL',
            country: 'United States',
            full_address: '1901 W Madison St, Chicago, IL 60612',
            parking_info: 'Official United Center parking lots A through G available on site.',
            accessibility_info: 'ADA accessible drop-off at Gate 3.5.',
            capacity: 23500
          },
          pricing: {
            currency: 'USD',
            min_price: 135,
            max_price: 590
          },
          description: {
            full_description: 'Harry Styles brings his spectacle to the Windy City for an unforgettable night of music and community.',
            special_notices: 'Tickets delivered 72 hours prior to showtime.',
            age_restrictions: 'All ages.',
            entry_requirements: 'Strict bag size limitations.'
          }
        }
      },
      {
        eventId: 'HS-LON-01',
        date: '2026-11-18',
        dayOfWeek: 'Wednesday',
        month: 'NOV',
        dayNumber: '18',
        time: '7:30 PM',
        doorsTime: '5:30 PM',
        eventTitle: 'Harry Styles: Love On Tour Stadium Special at Wembley',
        venueName: 'Wembley Stadium',
        city: 'London',
        state: 'UK',
        country: 'United Kingdom',
        minPrice: 95,
        maxPrice: 480,
        status: 'Few Tickets Left',
        hasVip: true,
        hasResale: true,
        eventItem: {
          identity: {
            event_title: 'Harry Styles: Love On Tour Stadium Special at Wembley',
            event_id: 'HS-LON-01',
            event_url: 'https://www.ticketmaster.com/harry-styles-tickets/artist/2366444',
            category: 'Concerts',
            subcategory: 'Pop Rock',
            subgenre: 'Pop',
            main_performer: 'Harry Styles',
            lineup: ['Harry Styles', 'Special Guests'],
            supporting_acts: ['Special Guests'],
            image_url: 'https://s1.ticketm.net/dam/a/2c8/8b6d9420-66c7-4bcb-877b-0ff0238da2c8_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            banner_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80',
            is_featured: true,
            is_selling_fast: true
          },
          date_time: {
            exact_date: '2026-11-18',
            day_of_week: 'Wednesday',
            start_time: '19:30:00',
            end_time: '22:45:00',
            time_zone: 'GMT',
            doors_time: '17:30:00',
            full_date_display: 'Wednesday, Nov 18, 2026 • 7:30 PM'
          },
          location: {
            venue_name: 'Wembley Stadium',
            venue_url: 'https://www.ticketmaster.com/venue/wembley-stadium',
            city: 'London',
            state: 'ENG',
            country: 'United Kingdom',
            full_address: 'London HA9 0WS, United Kingdom',
            parking_info: 'Public transport via Wembley Park Station recommended.',
            accessibility_info: 'Comprehensive step-free access and dedicated wheelchair viewing platforms.',
            capacity: 90000
          },
          pricing: {
            currency: 'USD',
            min_price: 95,
            max_price: 480
          },
          description: {
            full_description: 'Harry Styles homecoming stadium extravaganza at iconic Wembley Stadium London.',
            special_notices: 'Under 16s must be accompanied by an adult. Pit standing 14+ only.',
            age_restrictions: 'Ages 14+ for pitch standing.',
            entry_requirements: 'Valid Ticketmaster digital ticket required.'
          }
        }
      }
    ],
    faqs: [
      {
        question: 'When do doors open for Harry Styles concerts?',
        answer: 'Doors generally open 90 minutes to 2 hours prior to scheduled showtime. VIP early entry ticket holders typically gain priority admission 30 minutes before general doors.'
      },
      {
        question: 'Are Harry Styles tickets mobile-only?',
        answer: 'Yes! All tickets for Harry Styles concerts are powered by Ticketmaster SafeTix™. Your mobile barcode dynamically refreshes every few seconds to prevent scalping and counterfeiting. Screenshots and printed PDFs are not accepted at turnstiles.'
      },
      {
        question: 'What is the ticket limit per order?',
        answer: 'There is an overall limit of 6 tickets per household or credit card to ensure fair access for authentic fans.'
      },
      {
        question: 'Can I transfer or resell my tickets if I cannot attend?',
        answer: 'Yes, Ticketmaster Verified Resale and Ticket Transfer are available inside your My Tickets account. Resale tickets are 100% verified and re-issued with authentic new barcodes directly to the buyer.'
      }
    ]
  },

  'rod-wave': {
    id: '2619420',
    slug: 'rod-wave-tickets',
    name: 'Rod Wave',
    genre: 'Hip-Hop/Rap',
    subgenre: 'Soul Rap / Trap',
    heroImageUrl: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    bannerImageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80',
    avatarUrl: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    verified: true,
    fanCount: '2.4M',
    rating: 4.8,
    reviewCount: 31200,
    tourName: 'Last Lap Arena Tour 2026',
    headlineNotice: 'Selling fast across nationwide arenas. Special guests Moneybagg Yo and Toosii on select dates.',
    biography: 'Hailing from St. Petersburg, Florida, Rod Wave has pioneered soul trap music with his raw, emotionally resonant vocals and vulnerable songwriting. With consecutive #1 Billboard 200 albums including SoulFly, Beautiful Mind, and Nostalgia, his arena tours consistently sell out venues nationwide with thousands of devoted fans singing every heartfelt lyric.',
    careerHighlights: [
      'Multiple #1 Billboard 200 albums (Nostalgia, Beautiful Mind, SoulFly)',
      'Over 15 billion streams across global platforms',
      'Multi-platinum hits including "Heart on Ice", "Street Runner", and "Call Your Friends"'
    ],
    topTracks: [
      { title: 'Heart on Ice', album: 'Ghetto Gospel', duration: '2:41', streams: '890M' },
      { title: 'Call Your Friends', album: 'Nostalgia', duration: '2:33', streams: '640M' },
      { title: 'Street Runner', album: 'SoulFly', duration: '4:12', streams: '520M' },
      { title: 'Great Gatsby', album: 'Nostalgia', duration: '2:27', streams: '410M' }
    ],
    vipPackages: [
      {
        title: 'Rod Wave Ultimate VIP Meet & Greet',
        price: 495,
        perks: [
          'One front row Lower Bowl ticket or GA Pit with early entry',
          'Pre-show personal photo with Rod Wave',
          'Exclusive autographed tour merchandise item & VIP pass'
        ]
      },
      {
        title: 'Nostalgia Early Entry Pit Package',
        price: 275,
        perks: [
          'One GA Floor/Pit ticket with early entrance',
          'Exclusive Rod Wave tour merchandise bundle',
          'Commemorative VIP laminate and lanyard'
        ]
      }
    ],
    tourDates: [
      {
        eventId: 'RW-ATL-01',
        date: '2026-10-09',
        dayOfWeek: 'Friday',
        month: 'OCT',
        dayNumber: '09',
        time: '8:00 PM',
        doorsTime: '6:30 PM',
        eventTitle: 'Rod Wave: Last Lap Arena Tour Live in Atlanta',
        venueName: 'State Farm Arena',
        city: 'Atlanta',
        state: 'GA',
        country: 'United States',
        minPrice: 85,
        maxPrice: 420,
        status: 'Selling Fast',
        hasVip: true,
        hasResale: true,
        eventItem: {
          identity: {
            event_title: 'Rod Wave: Last Lap Arena Tour Live in Atlanta',
            event_id: 'RW-ATL-01',
            event_url: 'https://www.ticketmaster.com/rod-wave-tickets/artist/2619420',
            category: 'Concerts',
            subcategory: 'Hip-Hop/Rap',
            subgenre: 'Soul Rap',
            main_performer: 'Rod Wave',
            lineup: ['Rod Wave', 'Moneybagg Yo', 'Toosii'],
            supporting_acts: ['Moneybagg Yo', 'Toosii'],
            image_url: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            banner_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80',
            is_featured: true,
            is_selling_fast: true
          },
          date_time: {
            exact_date: '2026-10-09',
            day_of_week: 'Friday',
            start_time: '20:00:00',
            end_time: '23:00:00',
            time_zone: 'EST',
            doors_time: '18:30:00',
            full_date_display: 'Friday, Oct 9, 2026 • 8:00 PM'
          },
          location: {
            venue_name: 'State Farm Arena',
            venue_url: 'https://www.ticketmaster.com/venue/state-farm-arena',
            city: 'Atlanta',
            state: 'GA',
            country: 'United States',
            full_address: '1 State Farm Dr, Atlanta, GA 30303',
            parking_info: 'CNN Deck and Sapphire Deck parking adjoining arena.',
            accessibility_info: 'ADA parking and elevators to all concourses.',
            capacity: 17500
          },
          pricing: {
            currency: 'USD',
            min_price: 85,
            max_price: 420
          },
          description: {
            full_description: 'Rod Wave brings the Last Lap Tour to Atlanta for a high-emotion arena spectacle.',
            special_notices: 'SafeTix barcode required for admission.',
            age_restrictions: 'All ages.',
            entry_requirements: 'Clear bag policy.'
          }
        }
      },
      {
        eventId: 'RW-MIA-01',
        date: '2026-10-18',
        dayOfWeek: 'Sunday',
        month: 'OCT',
        dayNumber: '18',
        time: '7:30 PM',
        doorsTime: '6:00 PM',
        eventTitle: 'Rod Wave: Last Lap Arena Tour Live in Miami',
        venueName: 'Kaseya Center',
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        minPrice: 95,
        maxPrice: 450,
        status: 'On Sale',
        hasVip: true,
        hasResale: true,
        eventItem: {
          identity: {
            event_title: 'Rod Wave: Last Lap Arena Tour Live in Miami',
            event_id: 'RW-MIA-01',
            event_url: 'https://www.ticketmaster.com/rod-wave-tickets/artist/2619420',
            category: 'Concerts',
            subcategory: 'Hip-Hop/Rap',
            subgenre: 'Soul Rap',
            main_performer: 'Rod Wave',
            lineup: ['Rod Wave', 'Toosii'],
            supporting_acts: ['Toosii'],
            image_url: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            banner_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80',
            is_featured: true
          },
          date_time: {
            exact_date: '2026-10-18',
            day_of_week: 'Sunday',
            start_time: '19:30:00',
            end_time: '22:30:00',
            time_zone: 'EST',
            doors_time: '18:00:00',
            full_date_display: 'Sunday, Oct 18, 2026 • 7:30 PM'
          },
          location: {
            venue_name: 'Kaseya Center',
            venue_url: 'https://www.ticketmaster.com/venue/kaseya-center',
            city: 'Miami',
            state: 'FL',
            country: 'United States',
            full_address: '601 Biscayne Blvd, Miami, FL 33132',
            parking_info: 'Bayside and arena garages available.',
            accessibility_info: 'Full wheelchair accessibility throughout.',
            capacity: 19600
          },
          pricing: {
            currency: 'USD',
            min_price: 95,
            max_price: 450
          },
          description: {
            full_description: 'Rod Wave Florida homecoming show at Kaseya Center in downtown Miami.',
            special_notices: 'Strict ticket limits in effect.',
            age_restrictions: 'All ages.',
            entry_requirements: 'Mobile ticket only.'
          }
        }
      }
    ],
    faqs: [
      {
        question: 'Are there age restrictions for Rod Wave shows?',
        answer: 'All ages are welcome at all arena dates unless specifically noted by the host venue.'
      },
      {
        question: 'What time does Rod Wave go on stage?',
        answer: 'Opening acts usually perform starting 60 to 75 minutes after doors open, with Rod Wave taking the stage around 8:45 PM.'
      }
    ]
  },

  'dave-chappelle': {
    id: '803554',
    slug: 'dave-chappelle-tickets',
    name: 'Dave Chappelle',
    genre: 'Comedy',
    subgenre: 'Stand-Up Comedy',
    heroImageUrl: 'https://s1.ticketm.net/dam/a/e69/931eff58-62a7-4240-adb3-cf67a084ee69_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    bannerImageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1920&q=80',
    avatarUrl: 'https://s1.ticketm.net/dam/a/e69/931eff58-62a7-4240-adb3-cf67a084ee69_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    verified: true,
    fanCount: '1.8M',
    rating: 4.9,
    reviewCount: 29500,
    tourName: 'Dave Chappelle Live Stand-Up Tour 2026',
    headlineNotice: 'Strict NO CELL PHONE event. All devices secured in Yondr pouches upon entry.',
    biography: 'Mark Twain Prize recipient Dave Chappelle is universally acclaimed as one of the greatest stand-up comedians of all time. Known for his legendary sketch series Chappelle\'s Show and five Emmy and Grammy-winning Netflix comedy specials, his live stand-up performances are masterclasses in sharp observational wit, social commentary, and boundary-pushing hilarity.',
    careerHighlights: [
      'Recipient of the Mark Twain Prize for American Humor',
      'Five-time Grammy Award winner for Best Comedy Album',
      'Three-time Emmy Award winner for Outstanding Variety Special'
    ],
    topTracks: [
      { title: 'The Dreamer', album: 'Live Special', duration: '56:00' },
      { title: 'The Closer', album: 'Live Special', duration: '72:00' },
      { title: 'Sticks & Stones', album: 'Live Special', duration: '65:00' }
    ],
    vipPackages: [
      {
        title: 'Front Orchestra VIP Seating',
        price: 375,
        perks: [
          'Reserved seat in Rows 1 through 6 of Center Orchestra',
          'Priority VIP line entry into the venue',
          'Commemorative Dave Chappelle tour merchandise'
        ]
      }
    ],
    tourDates: [
      {
        eventId: 'DC-CHI-01',
        date: '2026-10-10',
        dayOfWeek: 'Saturday',
        month: 'OCT',
        dayNumber: '10',
        time: '7:30 PM',
        doorsTime: '6:00 PM',
        eventTitle: 'Dave Chappelle: Live in Chicago',
        venueName: 'Chicago Theatre',
        city: 'Chicago',
        state: 'IL',
        country: 'United States',
        minPrice: 110,
        maxPrice: 375,
        status: 'Few Tickets Left',
        hasVip: true,
        hasResale: true,
        eventItem: {
          identity: {
            event_title: 'Dave Chappelle: Live in Chicago',
            event_id: 'DC-CHI-01',
            event_url: 'https://www.ticketmaster.com/dave-chappelle-tickets/artist/803554',
            category: 'Arts & Theater',
            subcategory: 'Stand-Up Comedy',
            subgenre: 'Comedy',
            main_performer: 'Dave Chappelle',
            lineup: ['Dave Chappelle', 'Special Guest Comedians'],
            supporting_acts: ['Special Guest Comedians'],
            image_url: 'https://s1.ticketm.net/dam/a/e69/931eff58-62a7-4240-adb3-cf67a084ee69_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            banner_url: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1920&q=80',
            is_featured: true,
            is_selling_fast: true
          },
          date_time: {
            exact_date: '2026-10-10',
            day_of_week: 'Saturday',
            start_time: '19:30:00',
            end_time: '22:00:00',
            time_zone: 'CST',
            doors_time: '18:00:00',
            full_date_display: 'Saturday, Oct 10, 2026 • 7:30 PM'
          },
          location: {
            venue_name: 'Chicago Theatre',
            venue_url: 'https://www.ticketmaster.com/venue/chicago-theatre',
            city: 'Chicago',
            state: 'IL',
            country: 'United States',
            full_address: '175 N State St, Chicago, IL 60601',
            parking_info: 'Theatre District parking garages nearby.',
            accessibility_info: 'Main floor wheelchair seating and infrared listening devices available.',
            capacity: 3600
          },
          pricing: {
            currency: 'USD',
            min_price: 110,
            max_price: 375
          },
          description: {
            full_description: 'An intimate evening of world-class comedy with Dave Chappelle at the historic Chicago Theatre.',
            special_notices: 'No cell phones, smart watches, or recording devices allowed. All phones locked in Yondr pouches.',
            age_restrictions: 'Ages 18+ strictly enforced.',
            entry_requirements: 'Valid government ID matching ticket name may be required.'
          }
        }
      }
    ],
    faqs: [
      {
        question: 'What is the phone policy for Dave Chappelle shows?',
        answer: 'Strict NO PHONE policy. Upon arrival, all mobile devices, smart watches, and recording electronics will be locked in individual Yondr pouches that remain in your possession. They can only be unlocked at designated phone stations in the outer lobby.'
      }
    ]
  },

  'rush': {
    id: '735996',
    slug: 'rush-tickets',
    name: 'RUSH',
    genre: 'Rock',
    subgenre: 'Progressive Rock',
    heroImageUrl: 'https://s1.ticketm.net/dam/a/6bd/c02199ad-8d22-4668-8973-f400d85826bd_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    bannerImageUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=1920&q=80',
    avatarUrl: 'https://s1.ticketm.net/dam/a/6bd/c02199ad-8d22-4668-8973-f400d85826bd_TABLET_LANDSCAPE_LARGE_16_9.jpg',
    verified: true,
    fanCount: '1.5M',
    rating: 4.9,
    reviewCount: 22400,
    tourName: 'RUSH: 50th Anniversary Legacy Celebration',
    headlineNotice: 'Geddy Lee and Alex Lifeson celebrate 50 years of progressive rock majesty with special guest drummers.',
    biography: 'Inducted into the Rock and Roll Hall of Fame in 2013, Canadian progressive rock pioneers RUSH have shaped generations of musicians with virtuoso musicianship, complex compositions, and legendary rock albums such as 2112, Moving Pictures, and Permanent Waves. This landmark retrospective tour honors their unmatched legacy with jaw-dropping audio-visual production.',
    careerHighlights: [
      'Rock and Roll Hall of Fame Inductees',
      'Over 40 million albums sold worldwide',
      'Ranked 3rd behind The Beatles and The Rolling Stones for most consecutive gold or platinum studio albums by a rock band'
    ],
    topTracks: [
      { title: 'Tom Sawyer', album: 'Moving Pictures', duration: '4:36', streams: '420M' },
      { title: 'Limelight', album: 'Moving Pictures', duration: '4:20', streams: '210M' },
      { title: 'The Spirit of Radio', album: 'Permanent Waves', duration: '4:57', streams: '190M' },
      { title: 'Closer to the Heart', album: 'A Farewell to Kings', duration: '2:53', streams: '160M' }
    ],
    vipPackages: [
      {
        title: 'Moving Pictures Front Row VIP Experience',
        price: 550,
        perks: [
          'Reserved seat in Row 1 or 2 in front of the stage',
          'Exclusive autographed lithograph signed by Geddy Lee & Alex Lifeson',
          'Commemorative RUSH 50 tour jacket and VIP laminate'
        ]
      }
    ],
    tourDates: [
      {
        eventId: 'RUSH-BOS-01',
        date: '2026-10-24',
        dayOfWeek: 'Saturday',
        month: 'OCT',
        dayNumber: '24',
        time: '7:30 PM',
        doorsTime: '6:00 PM',
        eventTitle: 'RUSH: 50th Anniversary Celebration in Boston',
        venueName: 'TD Garden',
        city: 'Boston',
        state: 'MA',
        country: 'United States',
        minPrice: 120,
        maxPrice: 550,
        status: 'Selling Fast',
        hasVip: true,
        hasResale: true,
        eventItem: {
          identity: {
            event_title: 'RUSH: 50th Anniversary Celebration in Boston',
            event_id: 'RUSH-BOS-01',
            event_url: 'https://www.ticketmaster.com/rush-tickets/artist/735996',
            category: 'Concerts',
            subcategory: 'Classic Rock',
            subgenre: 'Progressive Rock',
            main_performer: 'RUSH',
            lineup: ['RUSH'],
            supporting_acts: [],
            image_url: 'https://s1.ticketm.net/dam/a/6bd/c02199ad-8d22-4668-8973-f400d85826bd_TABLET_LANDSCAPE_LARGE_16_9.jpg',
            banner_url: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=1920&q=80',
            is_featured: true,
            is_selling_fast: true
          },
          date_time: {
            exact_date: '2026-10-24',
            day_of_week: 'Saturday',
            start_time: '19:30:00',
            end_time: '22:45:00',
            time_zone: 'EST',
            doors_time: '18:00:00',
            full_date_display: 'Saturday, Oct 24, 2026 • 7:30 PM'
          },
          location: {
            venue_name: 'TD Garden',
            venue_url: 'https://www.ticketmaster.com/venue/boston',
            city: 'Boston',
            state: 'MA',
            country: 'United States',
            full_address: '100 Legends Way, Boston, MA 02114',
            parking_info: 'North Station garage parking beneath arena.',
            accessibility_info: 'Wheelchair seating on all levels.',
            capacity: 19580
          },
          pricing: {
            currency: 'USD',
            min_price: 120,
            max_price: 550
          },
          description: {
            full_description: 'An epic night celebrating 50 years of RUSH with Geddy Lee, Alex Lifeson, and world-renowned guest musicians.',
            special_notices: 'SafeTix mobile entry enforced.',
            age_restrictions: 'All ages.',
            entry_requirements: 'Clear bag policy.'
          }
        }
      }
    ],
    faqs: [
      {
        question: 'Will there be an opening act for RUSH?',
        answer: 'RUSH shows are traditionally "An Evening With RUSH", featuring two full sets with an intermission.'
      }
    ]
  }
};

/**
 * Universal artist profile resolver:
 * Matches known database artists or synthesizes full, high-fidelity profile
 * with authentic multi-city tour stops from existing EVENTS_DATA or synthesized venues.
 */
export function getArtistProfile(searchKey: string, existingEvents: EventItem[] = EVENTS_DATA): ArtistProfile {
  const normalized = searchKey.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  // Check exact key match
  if (ARTISTS_DATABASE[normalized]) {
    return ARTISTS_DATABASE[normalized];
  }

  // Check substring / alias match in known database
  for (const [key, profile] of Object.entries(ARTISTS_DATABASE)) {
    if (
      normalized.includes(key) || 
      key.includes(normalized) || 
      profile.name.toLowerCase().includes(searchKey.toLowerCase()) ||
      searchKey.toLowerCase().includes(profile.name.toLowerCase())
    ) {
      return profile;
    }
  }

  // Check matching events in EVENTS_DATA
  const matchedEvents = existingEvents.filter(e => 
    e.identity.main_performer.toLowerCase().includes(searchKey.toLowerCase()) ||
    e.identity.event_title.toLowerCase().includes(searchKey.toLowerCase()) ||
    e.identity.lineup.some(l => l.toLowerCase().includes(searchKey.toLowerCase()))
  );

  const referenceEvent = matchedEvents[0] || existingEvents[0];
  const performerName = referenceEvent?.identity.main_performer || searchKey;
  const category = referenceEvent?.identity.category || 'Concerts';
  const subcategory = referenceEvent?.identity.subcategory || 'Live Music';

  // Build synthesized tour stops across major North American / World stops
  const tourCities = [
    { city: 'New York', state: 'NY', venue: 'Madison Square Garden', date: '2026-10-15', day: 'Thursday', month: 'OCT', dayNum: '15' },
    { city: 'Los Angeles', state: 'CA', venue: 'Crypto.com Arena', date: '2026-10-22', day: 'Thursday', month: 'OCT', dayNum: '22' },
    { city: 'Chicago', state: 'IL', venue: 'United Center', date: '2026-10-29', day: 'Thursday', month: 'OCT', dayNum: '29' },
    { city: 'Houston', state: 'TX', venue: 'Toyota Center', date: '2026-11-06', day: 'Friday', month: 'NOV', dayNum: '06' },
    { city: 'Atlanta', state: 'GA', venue: 'State Farm Arena', date: '2026-11-13', day: 'Friday', month: 'NOV', dayNum: '13' },
    { city: 'Toronto', state: 'ON', venue: 'Scotiabank Arena', date: '2026-11-20', day: 'Friday', month: 'NOV', dayNum: '20' }
  ];

  const tourDates: ArtistTourDate[] = tourCities.map((c, i) => {
    const eventId = `EVT-${normalized.toUpperCase()}-${i + 1}`;
    const minPrice = Math.max(49, referenceEvent?.pricing.min_price || 85);
    const maxPrice = Math.max(250, referenceEvent?.pricing.max_price || 450);

    const eventItem: EventItem = {
      identity: {
        event_title: `${performerName}: Official Live Tour`,
        event_id: eventId,
        event_url: `https://www.ticketmaster.com/${normalized}-tickets/artist/${1000000 + i}`,
        category: category,
        subcategory: subcategory,
        subgenre: referenceEvent?.identity.subgenre || subcategory,
        main_performer: performerName,
        lineup: [performerName],
        supporting_acts: [],
        image_url: referenceEvent?.identity.image_url || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
        banner_url: referenceEvent?.identity.banner_url || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80',
        is_featured: i === 0,
        is_selling_fast: i % 2 === 0
      },
      date_time: {
        exact_date: c.date,
        day_of_week: c.day,
        start_time: '20:00:00',
        end_time: '23:00:00',
        time_zone: 'EST',
        doors_time: '18:30:00',
        full_date_display: `${c.day}, ${c.month} ${c.dayNum}, 2026 • 8:00 PM`
      },
      location: {
        venue_name: c.venue,
        venue_url: `https://www.ticketmaster.com/venue/${c.city.toLowerCase().replace(/\s+/g, '-')}`,
        city: c.city,
        state: c.state,
        country: 'United States',
        full_address: `${c.venue}, ${c.city}, ${c.state}`,
        parking_info: 'On-site parking garages and valet options available.',
        accessibility_info: 'Full ADA accessible seating and services provided.',
        capacity: 18500
      },
      pricing: {
        currency: 'USD',
        min_price: minPrice,
        max_price: maxPrice
      },
      description: {
        full_description: `Experience ${performerName} live on stage at ${c.venue} in ${c.city}. Features full concert production, authentic Ticketmaster SafeTix mobile entry, and unforgettable live music.`,
        special_notices: 'Mobile tickets only. Please add to Apple Wallet or Google Wallet before arriving at the venue.',
        age_restrictions: 'All ages welcome.',
        entry_requirements: 'Clear bag policy strictly enforced.'
      }
    };

    return {
      eventId,
      date: c.date,
      dayOfWeek: c.day,
      month: c.month,
      dayNumber: c.dayNum,
      time: '8:00 PM',
      doorsTime: '6:30 PM',
      eventTitle: `${performerName}: Live in ${c.city}`,
      venueName: c.venue,
      city: c.city,
      state: c.state,
      country: 'United States',
      minPrice,
      maxPrice,
      status: i === 0 ? 'Selling Fast' : (i === 1 ? 'Few Tickets Left' : 'On Sale'),
      hasVip: true,
      hasResale: true,
      eventItem
    };
  });

  return {
    id: String(Math.floor(1000000 + Math.random() * 9000000)),
    slug: `${normalized}-tickets`,
    name: performerName,
    genre: category,
    subgenre: subcategory,
    heroImageUrl: referenceEvent?.identity.image_url || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    bannerImageUrl: referenceEvent?.identity.banner_url || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80',
    avatarUrl: referenceEvent?.identity.image_url || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    fanCount: '1.2M',
    rating: 4.8,
    reviewCount: 18450,
    tourName: `${performerName} Live On Tour 2026`,
    headlineNotice: 'Official verified tickets and VIP packages now available nationwide.',
    biography: `${performerName} is an internationally renowned artist delivering captivating, high-energy live performances to sold-out audiences worldwide. With acclaimed hits, chart-topping releases, and an extraordinary connection with fans, every show is a celebration of world-class artistry and unforgettable entertainment.`,
    careerHighlights: [
      'Multi-platinum recording and touring sensation',
      'Critically acclaimed live show and world tour production',
      'Billions of global music streams and millions of dedicated fans'
    ],
    topTracks: [
      { title: 'Greatest Hits Live', album: 'Tour Special', duration: '3:45' },
      { title: 'Encore Anthem', album: 'Studio Edition', duration: '4:10' },
      { title: 'Fan Favorite Live', album: 'Acoustic Sessions', duration: '3:20' }
    ],
    vipPackages: [
      {
        title: 'Ultimate Front Row VIP Package',
        price: 395,
        perks: [
          'Reserved seat in the first 5 rows or priority pit admission',
          'Exclusive VIP tour gift merchandise pack',
          'Commemorative VIP laminate and lanyard',
          'Dedicated VIP entrance turnstile'
        ]
      },
      {
        title: 'Priority Entry Fan Package',
        price: 220,
        perks: [
          'One premium reserved seat in Lower Bowl',
          'Official tour collectible credential',
          'Early merchandise shopping access'
        ]
      }
    ],
    tourDates,
    faqs: [
      {
        question: 'Are tickets for this tour authentic and guaranteed?',
        answer: 'Yes, 100% of tickets sold through Ticketmaster are verified authentic, powered by dynamic SafeTix barcodes that protect against duplicate or counterfeit tickets.'
      },
      {
        question: 'Can I select my exact seats?',
        answer: 'Yes, you can explore the interactive venue seat map, compare real-time pricing across VIP, Floor, Lower Bowl, and Upper Tier zones, and select your preferred seats before checkout.'
      }
    ]
  };
}
