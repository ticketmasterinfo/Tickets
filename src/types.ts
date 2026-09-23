export interface EventIdentity {
  event_title: string;
  event_id: string;
  event_url: string;
  category: 'Concerts' | 'Sports' | 'Arts & Theater' | 'Family';
  subcategory: string;
  subgenre: string;
  main_performer: string;
  lineup: string[];
  supporting_acts: string[];
  image_url: string;
  banner_url?: string;
  is_featured?: boolean;
  is_presale?: boolean;
  is_resale?: boolean;
  is_selling_fast?: boolean;
}

export interface EventDateTime {
  exact_date: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  time_zone: string;
  doors_time: string;
  full_date_display: string;
}

export interface EventLocation {
  venue_name: string;
  venue_url: string;
  city: string;
  state: string;
  country: string;
  full_address: string;
  parking_info: string;
  accessibility_info: string;
  capacity?: number;
}

export interface EventPricing {
  currency: string;
  min_price: number;
  max_price: number;
}

export interface EventDescription {
  full_description: string;
  special_notices: string;
  age_restrictions: string;
  entry_requirements: string;
}

export interface EventItem {
  identity: EventIdentity;
  date_time: EventDateTime;
  location: EventLocation;
  pricing: EventPricing;
  description: EventDescription;
}

export interface SeatZone {
  id: string;
  name: string;
  code: string;
  tier: 'VIP' | 'Floor' | 'Lower' | 'Upper';
  color: string;
  hoverColor: string;
  price: number;
  availableCount: number;
  totalCount: number;
  description: string;
  perks?: string[];
  svgPath?: string;
  centerPos: { x: number; y: number };
  ticketType?: 'Standard' | 'VIP' | 'Platinum' | 'Resale' | 'Presale';
  isSellingFast?: boolean;
}

export interface SeatUnit {
  id: string;
  zoneId: string;
  section: string;
  row: string;
  number: number;
  status: 'available' | 'reserved' | 'selected';
  price: number;
  x: number;
  y: number;
}

export interface SelectedTicketGroup {
  zoneId: string;
  zoneName: string;
  section: string;
  row: string;
  quantity: number;
  unitPrice: number;
  serviceFee: number;
  facilityFee: number;
  processingFee: number;
  selectedSeats?: string[];
}

export interface PurchasedTicket {
  ticketId: string;
  orderId: string;
  event: EventItem;
  zoneName: string;
  section: string;
  row: string;
  seatNumber: string;
  price: number;
  totalPaid: number;
  barcode: string;
  purchaseDate: string;
  attendeeName: string;
  attendeeEmail: string;
  gate?: string;
  ticketType?: string;
}

export interface ArtistTourDate {
  eventId: string;
  date: string;
  dayOfWeek: string;
  month: string;
  dayNumber: string;
  time: string;
  doorsTime: string;
  eventTitle: string;
  venueName: string;
  city: string;
  state: string;
  country: string;
  minPrice: number;
  maxPrice: number;
  status: 'On Sale' | 'Selling Fast' | 'Few Tickets Left' | 'Presale';
  hasVip: boolean;
  hasResale: boolean;
  eventItem: EventItem;
}

export interface ArtistProfile {
  id: string;
  slug: string;
  name: string;
  genre: string;
  subgenre: string;
  heroImageUrl: string;
  bannerImageUrl: string;
  avatarUrl: string;
  verified: boolean;
  fanCount: string;
  rating: number;
  reviewCount: number;
  tourName: string;
  headlineNotice?: string;
  biography: string;
  careerHighlights: string[];
  topTracks: { title: string; album: string; duration: string; streams?: string }[];
  vipPackages: { title: string; price: number; perks: string[] }[];
  tourDates: ArtistTourDate[];
  faqs: { question: string; answer: string }[];
}

export interface FilterOptions {
  category: string;
  subcategory: string;
  city: string;
  dateRange: 'all' | 'today' | 'this_weekend' | 'this_month' | 'future';
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: 'date_asc' | 'date_desc' | 'price_asc' | 'price_desc' | 'popularity';
  venue: string;
}
