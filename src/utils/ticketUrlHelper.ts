import { PurchasedTicket, EventItem } from '../types';
import { EVENTS_DATA } from '../data/eventsData';

export interface ScannedPassPayload {
  tid: string;          // Ticket ID (e.g. "TIX-928410")
  oid: string;          // Order ID (e.g. "TM-71049281")
  eid: string;          // Event ID (e.g. "VV1aZ9v1001TM")
  title: string;        // Event Title (e.g. "Eagles: The Long Farewell Tour")
  performer: string;    // Main Performer
  venue: string;        // Venue name
  city: string;         // City, State
  date: string;         // Date display string
  time: string;         // Time display string
  section: string;      // Section (e.g. "SEC-102")
  row: string;          // Row (e.g. "B")
  seat: string;         // Seat (e.g. "Seat 14")
  barcode: string;      // Barcode
  gate?: string;        // Gate (e.g. "Gate 1")
  zone?: string;        // Seating zone name
  attendee?: string;    // Attendee name
  price?: number;       // Ticket price
  imageUrl?: string;    // Event image
  category?: string;    // Category (Concerts, Sports, etc.)
  timestamp?: number;   // Timestamp generated
}

/**
 * Encode ticket details into a compact URL-safe base64 string
 */
export function encodeTicketPass(ticket: PurchasedTicket): string {
  const payload: ScannedPassPayload = {
    tid: ticket.ticketId,
    oid: ticket.orderId,
    eid: ticket.event.identity.event_id,
    title: ticket.event.identity.event_title,
    performer: ticket.event.identity.main_performer || '',
    venue: ticket.event.location.venue_name,
    city: `${ticket.event.location.city}, ${ticket.event.location.state}`,
    date: ticket.event.date_time.full_date_display || ticket.event.date_time.exact_date,
    time: ticket.event.date_time.start_time || '',
    section: ticket.section,
    row: ticket.row,
    seat: ticket.seatNumber,
    barcode: ticket.barcode,
    gate: ticket.gate || 'Turnstile A',
    zone: ticket.zoneName,
    attendee: ticket.attendeeName,
    price: ticket.price,
    imageUrl: ticket.event.identity.image_url,
    category: ticket.event.identity.category,
    timestamp: Date.now()
  };

  try {
    const json = JSON.stringify(payload);
    // Safe base64 encoding handling unicode
    const b64 = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
    return encodeURIComponent(b64);
  } catch (err) {
    console.error('Failed to encode ticket pass payload', err);
    return encodeURIComponent(btoa(JSON.stringify(payload)));
  }
}

/**
 * Decodes a ticket pass string from URL search params
 */
export function decodeTicketPass(raw: string): ScannedPassPayload | null {
  if (!raw) return null;
  try {
    const decodedUri = decodeURIComponent(raw);
    const binaryStr = atob(decodedUri);
    const json = decodeURIComponent(
      Array.prototype.map.call(binaryStr, (ch: string) => {
        return '%' + ('00' + ch.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
    return JSON.parse(json) as ScannedPassPayload;
  } catch (e) {
    try {
      // Fallback direct JSON parse or simple atob
      const json = atob(decodeURIComponent(raw));
      return JSON.parse(json) as ScannedPassPayload;
    } catch {
      console.error('Failed to decode scanned pass payload:', e);
      return null;
    }
  }
}

/**
 * Generates the full scan URL for any mobile or scanning device
 */
export function generateTicketVerificationUrl(ticket: PurchasedTicket, baseOrigin?: string): string {
  let origin = baseOrigin;
  if (!origin && typeof window !== 'undefined' && window.location) {
    origin = window.location.origin;
  }
  if (!origin) {
    origin = 'https://www.ticketmaster.com';
  }

  const pathname = typeof window !== 'undefined' && window.location ? window.location.pathname : '/';
  const encoded = encodeTicketPass(ticket);
  return `${origin}${pathname}?pass=${encoded}`;
}

/**
 * Reconstructs or looks up the full EventItem and PurchasedTicket from a scanned payload
 */
export function resolveScannedPass(
  payload: ScannedPassPayload, 
  availableEvents: EventItem[] = EVENTS_DATA
): { event: EventItem; ticket: PurchasedTicket } {
  // 1. Look for matching event by ID
  let matchedEvent = availableEvents.find(e => e.identity.event_id === payload.eid);

  // 2. Look for matching event by Title if ID changed
  if (!matchedEvent) {
    matchedEvent = availableEvents.find(e => 
      e.identity.event_title.toLowerCase().trim() === payload.title.toLowerCase().trim()
    );
  }

  // 3. Fallback: reconstruct complete EventItem from payload
  if (!matchedEvent) {
    const cityStateParts = (payload.city || 'City, State').split(',');
    const city = cityStateParts[0]?.trim() || 'Los Angeles';
    const state = cityStateParts[1]?.trim() || 'CA';

    const validCategories: Array<'Concerts' | 'Sports' | 'Arts & Theater' | 'Family'> = [
      'Concerts', 'Sports', 'Arts & Theater', 'Family'
    ];
    const category = validCategories.find(c => c === payload.category) || 'Concerts';

    matchedEvent = {
      identity: {
        event_title: payload.title,
        event_id: payload.eid || `evt-scanned-${payload.tid}`,
        event_url: `https://www.ticketmaster.com/event/${payload.eid}`,
        category,
        subcategory: 'Live Tour',
        subgenre: 'Live Performance',
        main_performer: payload.performer || payload.title,
        lineup: [payload.performer || payload.title],
        supporting_acts: [],
        image_url: payload.imageUrl || 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
        banner_url: payload.imageUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80',
        is_featured: true,
        is_selling_fast: true
      },
      date_time: {
        exact_date: '2026-10-15',
        day_of_week: 'Official Date',
        start_time: payload.time || '19:30:00',
        end_time: 'Unspecified',
        time_zone: 'Local',
        doors_time: '18:00:00',
        full_date_display: payload.date || 'Upcoming Verified Date'
      },
      location: {
        venue_name: payload.venue || 'Premier Event Venue',
        venue_url: 'https://www.ticketmaster.com',
        city,
        state,
        country: 'United States',
        full_address: `${payload.venue}, ${city}, ${state}`,
        parking_info: 'Official venue parking available. Mobile parking passes accepted at all gates.',
        accessibility_info: 'ADA accessible turnstiles, companion seating, and assistive listening available.',
        capacity: 25000
      },
      pricing: {
        currency: 'USD',
        min_price: payload.price || 120,
        max_price: (payload.price || 120) * 3
      },
      description: {
        full_description: `Official live event for ${payload.title} at ${payload.venue}. Official verified mobile entry required for admission.`,
        special_notices: 'Ticket verified authentic by Ticketmaster SafeTix encryption engine. Valid for one-time turnstile admission.',
        age_restrictions: 'All ages welcome. Every attendee requires a verified ticket.',
        entry_requirements: 'Present mobile QR pass at turnstile. Do not use screenshots.'
      }
    };
  }

  // Reconstruct PurchasedTicket
  const ticket: PurchasedTicket = {
    ticketId: payload.tid,
    orderId: payload.oid,
    event: matchedEvent,
    zoneName: payload.zone || `${payload.section} - Reserved Seating`,
    section: payload.section,
    row: payload.row,
    seatNumber: payload.seat,
    price: payload.price || 150,
    totalPaid: (payload.price || 150) * 1.18,
    barcode: payload.barcode,
    purchaseDate: new Date(payload.timestamp || Date.now()).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    attendeeName: payload.attendee || 'Ticket Holder',
    attendeeEmail: 'verified-fan@ticketmaster.com',
    gate: payload.gate || 'Turnstile A'
  };

  return { event: matchedEvent, ticket };
}
