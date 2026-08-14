import { EventItem, SeatZone } from '../types';

export const EVENTS_DATA: EventItem[] = [
  {
    identity: {
      event_title: "Eagles: The Long Farewell Tour",
      event_id: "VV1aZ9v1001TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1001TM",
      category: "Concerts",
      subcategory: "Classic Rock",
      subgenre: "Classic Rock",
      main_performer: "Eagles",
      lineup: ["Eagles", "Steely Dan"],
      supporting_acts: ["Steely Dan"],
      image_url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
      banner_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80",
      is_featured: true,
      is_selling_fast: true
    },
    date_time: {
      exact_date: "2026-08-17",
      day_of_week: "Monday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Monday, Aug 17, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "TD Garden",
      venue_url: "https://www.ticketmaster.com/venue/boston",
      city: "Boston",
      state: "MA",
      country: "United States",
      full_address: "100 Legends Way, Boston, MA 02114",
      parking_info: "On-site parking garages and valet options available at TD Garden.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 19580
    },
    pricing: {
      currency: "USD",
      min_price: 150.0,
      max_price: 750.0
    },
    description: {
      "full_description": "Experience Eagles: The Long Farewell Tour live at TD Garden in Boston, MA. Features world-class production, state-of-the-art audio, and an unforgettable live experience spanning five decades of iconic hits.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "All ages welcome. Children under 2 years old do not require a separate ticket if seated on a parent lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Metallica: M72 World Tour",
      event_id: "VV1aZ9v1002TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1002TM",
      category: "Concerts",
      subcategory: "Heavy Metal",
      subgenre: "Heavy Metal",
      main_performer: "Metallica",
      lineup: ["Metallica", "Pantera", "Mammoth WVH"],
      supporting_acts: ["Pantera", "Mammoth WVH"],
      image_url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
      banner_url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1920&q=80",
      is_featured: true,
      is_presale: true
    },
    date_time: {
      exact_date: "2026-08-20",
      day_of_week: "Thursday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Thursday, Aug 20, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Madison Square Garden",
      venue_url: "https://www.ticketmaster.com/venue/new-york",
      city: "New York",
      state: "NY",
      country: "United States",
      full_address: "4 Pennsylvania Plaza, New York, NY 10001",
      parking_info: "On-site parking garages and valet options available at Madison Square Garden.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 20789
    },
    pricing: {
      currency: "USD",
      min_price: 95.0,
      max_price: 450.0
    },
    description: {
      "full_description": "Experience Metallica: M72 World Tour live at Madison Square Garden in New York, NY. Features the iconic in-the-round Snake Pit stage design with Pantera and Mammoth WVH.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "All ages welcome. Children under 2 years old do not require a separate ticket if seated on a parent lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Taylor Swift: The Eras Tour",
      event_id: "VV1aZ9v1003TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1003TM",
      category: "Concerts",
      subcategory: "Pop",
      subgenre: "Pop",
      main_performer: "Taylor Swift",
      lineup: ["Taylor Swift", "Gracie Abrams"],
      supporting_acts: ["Gracie Abrams"],
      image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      banner_url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1920&q=80",
      is_featured: true,
      is_selling_fast: true
    },
    date_time: {
      exact_date: "2026-08-24",
      day_of_week: "Monday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Monday, Aug 24, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Crypto.com Arena",
      venue_url: "https://www.ticketmaster.com/venue/los-angeles",
      city: "Los Angeles",
      state: "CA",
      country: "United States",
      full_address: "1111 S Figueroa St, Los Angeles, CA 90015",
      parking_info: "On-site parking garages and valet options available at Crypto.com Arena.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 20000
    },
    pricing: {
      currency: "USD",
      min_price: 199.0,
      max_price: 899.0
    },
    description: {
      "full_description": "Experience Taylor Swift: The Eras Tour live at Crypto.com Arena in Los Angeles, CA. Journey through all musical eras in this record-breaking 3.5 hour stadium spectacle.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "All ages welcome. Children under 2 years old do not require a separate ticket if seated on a parent lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Coldplay: Music of the Spheres World Tour",
      event_id: "VV1aZ9v1004TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1004TM",
      category: "Concerts",
      subcategory: "Alternative Rock",
      subgenre: "Alternative Rock",
      main_performer: "Coldplay",
      lineup: ["Coldplay", "H.E.R."],
      supporting_acts: ["H.E.R."],
      image_url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      banner_url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1920&q=80",
      is_featured: true,
      is_resale: true
    },
    date_time: {
      exact_date: "2026-08-28",
      day_of_week: "Friday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Friday, Aug 28, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Sphere",
      venue_url: "https://www.ticketmaster.com/venue/las-vegas",
      city: "Las Vegas",
      state: "NV",
      country: "United States",
      full_address: "255 Sands Ave, Las Vegas, NV 89109",
      parking_info: "On-site parking garages and valet options available at Sphere.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 18600
    },
    pricing: {
      currency: "USD",
      min_price: 85.0,
      max_price: 380.0
    },
    description: {
      "full_description": "Experience Coldplay: Music of the Spheres World Tour live inside the ground-breaking Sphere in Las Vegas, NV with 16K wraparound visual immersion.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "All ages welcome. Children under 2 years old do not require a separate ticket if seated on a parent lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Drake & PartyNextDoor: It's All A Blur",
      event_id: "VV1aZ9v1005TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1005TM",
      category: "Concerts",
      subcategory: "Hip-Hop/Rap",
      subgenre: "Hip-Hop/Rap",
      main_performer: "Drake",
      lineup: ["Drake", "PartyNextDoor"],
      supporting_acts: ["PartyNextDoor"],
      image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_selling_fast: true
    },
    date_time: {
      exact_date: "2026-09-01",
      day_of_week: "Tuesday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Tuesday, Sep 01, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "United Center",
      venue_url: "https://www.ticketmaster.com/venue/chicago",
      city: "Chicago",
      state: "IL",
      country: "United States",
      full_address: "1901 W Madison St, Chicago, IL 60612",
      parking_info: "On-site parking garages and valet options available at United Center.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 23500
    },
    pricing: {
      currency: "USD",
      min_price: 120.0,
      max_price: 600.0
    },
    description: {
      "full_description": "Experience Drake & PartyNextDoor: It's All A Blur live at United Center in Chicago, IL. Dynamic visuals, pyrotechnics, and greatest chart-toppers.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "All ages welcome. Children under 2 years old do not require a separate ticket if seated on a parent lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Billie Eilish: Hit Me Hard and Soft Tour",
      event_id: "VV1aZ9v1006TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1006TM",
      category: "Concerts",
      subcategory: "Pop / Alternative",
      subgenre: "Pop / Alternative",
      main_performer: "Billie Eilish",
      lineup: ["Billie Eilish"],
      supporting_acts: [],
      image_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_presale: true
    },
    date_time: {
      exact_date: "2026-09-05",
      day_of_week: "Saturday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Saturday, Sep 05, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Kaseya Center",
      venue_url: "https://www.ticketmaster.com/venue/miami",
      city: "Miami",
      state: "FL",
      country: "United States",
      full_address: "601 Biscayne Blvd, Miami, FL 33132",
      parking_info: "On-site parking garages and valet options available at Kaseya Center.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 19600
    },
    pricing: {
      currency: "USD",
      min_price: 75.0,
      max_price: 320.0
    },
    description: {
      "full_description": "Experience Billie Eilish: Hit Me Hard and Soft Tour live at Kaseya Center in Miami, FL. A captivating and sensory 360-degree sonic experience.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "All ages welcome. Children under 2 years old do not require a separate ticket if seated on a parent lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "New York Knicks vs. Boston Celtics",
      event_id: "VV1aZ9v1007TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1007TM",
      category: "Sports",
      subcategory: "NBA Basketball",
      subgenre: "NBA Basketball",
      main_performer: "New York Knicks",
      lineup: ["New York Knicks", "Boston Celtics"],
      supporting_acts: ["Boston Celtics"],
      image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_selling_fast: true
    },
    date_time: {
      exact_date: "2026-08-18",
      day_of_week: "Tuesday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Tuesday, Aug 18, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "TD Garden",
      venue_url: "https://www.ticketmaster.com/venue/boston",
      city: "Boston",
      state: "MA",
      country: "United States",
      full_address: "100 Legends Way, Boston, MA 02114",
      parking_info: "On-site parking garages and valet options available at TD Garden.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 19580
    },
    pricing: {
      currency: "USD",
      min_price: 90.0,
      max_price: 550.0
    },
    description: {
      "full_description": "Experience New York Knicks vs. Boston Celtics live at TD Garden in Boston, MA. Legendary Eastern Conference rivalry clash on the parquet floor.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "All ages welcome. Children under 2 years old do not require a separate ticket if seated on a parent lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Los Angeles Lakers vs. Golden State Warriors",
      event_id: "VV1aZ9v1008TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1008TM",
      category: "Sports",
      subcategory: "NBA Basketball",
      subgenre: "NBA Basketball",
      main_performer: "Los Angeles Lakers",
      lineup: ["Los Angeles Lakers", "Golden State Warriors"],
      supporting_acts: ["Golden State Warriors"],
      image_url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80",
      is_featured: true,
      is_selling_fast: true
    },
    date_time: {
      exact_date: "2026-08-21",
      day_of_week: "Friday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Friday, Aug 21, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Madison Square Garden",
      venue_url: "https://www.ticketmaster.com/venue/new-york",
      city: "New York",
      state: "NY",
      country: "United States",
      full_address: "4 Pennsylvania Plaza, New York, NY 10001",
      parking_info: "On-site parking garages and valet options available at Madison Square Garden.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 20789
    },
    pricing: {
      currency: "USD",
      min_price: 110.0,
      max_price: 650.0
    },
    description: {
      "full_description": "Experience Los Angeles Lakers vs. Golden State Warriors marquee showcase live at Madison Square Garden in New York, NY.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "All ages welcome. Children under 2 years old do not require a separate ticket if seated on a parent lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "New York Rangers vs. New Jersey Devils",
      event_id: "VV1aZ9v1009TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1009TM",
      category: "Sports",
      subcategory: "NHL Hockey",
      subgenre: "NHL Hockey",
      main_performer: "New York Rangers",
      lineup: ["New York Rangers", "New Jersey Devils"],
      supporting_acts: ["New Jersey Devils"],
      image_url: "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_resale: true
    },
    date_time: {
      exact_date: "2026-08-25",
      day_of_week: "Tuesday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Tuesday, Aug 25, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Crypto.com Arena",
      venue_url: "https://www.ticketmaster.com/venue/los-angeles",
      city: "Los Angeles",
      state: "CA",
      country: "United States",
      full_address: "1111 S Figueroa St, Los Angeles, CA 90015",
      parking_info: "On-site parking garages and valet options available at Crypto.com Arena.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 20000
    },
    pricing: {
      currency: "USD",
      min_price: 65.0,
      max_price: 320.0
    },
    description: {
      "full_description": "Experience New York Rangers vs. New Jersey Devils live in a high-stakes NHL showdown with fierce Hudson River rivalry intensity.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "All ages welcome. Children under 2 years old do not require a separate ticket if seated on a parent lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "WWE Monday Night RAW Live",
      event_id: "VV1aZ9v1010TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1010TM",
      category: "Sports",
      subcategory: "Professional Wrestling",
      subgenre: "Professional Wrestling",
      main_performer: "WWE Superstars",
      lineup: ["WWE Superstars", "Cody Rhodes", "Rhea Ripley"],
      supporting_acts: ["Cody Rhodes", "Rhea Ripley"],
      image_url: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_presale: true
    },
    date_time: {
      exact_date: "2026-08-29",
      day_of_week: "Saturday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Saturday, Aug 29, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Sphere",
      venue_url: "https://www.ticketmaster.com/venue/las-vegas",
      city: "Las Vegas",
      state: "NV",
      country: "United States",
      full_address: "255 Sands Ave, Las Vegas, NV 89109",
      parking_info: "On-site parking garages and valet options available at Sphere.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 18600
    },
    pricing: {
      currency: "USD",
      min_price: 40.0,
      max_price: 250.0
    },
    description: {
      "full_description": "Experience WWE Monday Night RAW Live at Sphere in Las Vegas featuring Cody Rhodes, Rhea Ripley, Seth Rollins, and high-octane in-ring championship action.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "All ages welcome. Children under 2 years old do not require a separate ticket if seated on a parent lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Hamilton: An American Musical",
      event_id: "VV1aZ9v1011TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1011TM",
      category: "Arts & Theater",
      subcategory: "Broadway Musical",
      subgenre: "Broadway Musical",
      main_performer: "Broadway Original Cast Ensemble",
      lineup: ["Broadway Original Cast Ensemble"],
      supporting_acts: [],
      image_url: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80",
      is_featured: true,
      is_selling_fast: true
    },
    date_time: {
      exact_date: "2026-08-19",
      day_of_week: "Wednesday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Wednesday, Aug 19, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "United Center",
      venue_url: "https://www.ticketmaster.com/venue/chicago",
      city: "Chicago",
      state: "IL",
      country: "United States",
      full_address: "1901 W Madison St, Chicago, IL 60612",
      parking_info: "On-site parking garages and valet options available at United Center.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 23500
    },
    pricing: {
      currency: "USD",
      min_price: 125.0,
      max_price: 450.0
    },
    description: {
      "full_description": "Experience Hamilton: An American Musical live in Chicago, IL. Lin-Manuel Miranda's revolutionary score blending hip-hop, jazz, and classic Broadway storytelling.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "Recommended for ages 10+. Children under 4 are not permitted.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Wicked: The Untold Story of the Witches of Oz",
      event_id: "VV1aZ9v1012TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1012TM",
      category: "Arts & Theater",
      subcategory: "Broadway Musical",
      subgenre: "Broadway Musical",
      main_performer: "Gershwin Theatre Cast",
      lineup: ["Gershwin Theatre Cast"],
      supporting_acts: [],
      image_url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_presale: false
    },
    date_time: {
      exact_date: "2026-08-23",
      day_of_week: "Sunday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Sunday, Aug 23, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Kaseya Center",
      venue_url: "https://www.ticketmaster.com/venue/miami",
      city: "Miami",
      state: "FL",
      country: "United States",
      full_address: "601 Biscayne Blvd, Miami, FL 33132",
      parking_info: "On-site parking garages and valet options available at Kaseya Center.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 19600
    },
    pricing: {
      currency: "USD",
      min_price: 99.0,
      max_price: 380.0
    },
    description: {
      "full_description": "Experience Wicked: The Untold Story of the Witches of Oz live at Kaseya Center in Miami, FL. Discover what happened in Oz before Dorothy arrived.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "Recommended for ages 8+. Children under 4 are not admitted.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Bill Burr: Live Stand-up Comedy",
      event_id: "VV1aZ9v1013TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1013TM",
      category: "Arts & Theater",
      subcategory: "Comedy",
      subgenre: "Comedy",
      main_performer: "Bill Burr",
      lineup: ["Bill Burr"],
      supporting_acts: [],
      image_url: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_resale: true
    },
    date_time: {
      exact_date: "2026-08-26",
      day_of_week: "Wednesday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Wednesday, Aug 26, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "TD Garden",
      venue_url: "https://www.ticketmaster.com/venue/boston",
      city: "Boston",
      state: "MA",
      country: "United States",
      full_address: "100 Legends Way, Boston, MA 02114",
      parking_info: "On-site parking garages and valet options available at TD Garden.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 19580
    },
    pricing: {
      currency: "USD",
      min_price: 65.0,
      max_price: 220.0
    },
    description: {
      "full_description": "Experience Bill Burr: Live Stand-up Comedy live at TD Garden in Boston, MA. Unapologetic comedic genius returning to his hometown arena.",
      "special_notices": "Phone-free event: all mobile devices will be secured in Yondr pouches upon entry.",
      "age_restrictions": "Ages 18+ recommended due to adult comedic content.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras and audio recorders are strictly prohibited."
    }
  },
  {
    identity: {
      event_title: "The Lion King Broadway Production",
      event_id: "VV1aZ9v1014TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1014TM",
      category: "Arts & Theater",
      subcategory: "Broadway Musical",
      subgenre: "Broadway Musical",
      main_performer: "Minskoff Theatre Cast",
      lineup: ["Minskoff Theatre Cast"],
      supporting_acts: [],
      image_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_selling_fast: true
    },
    date_time: {
      exact_date: "2026-08-30",
      day_of_week: "Sunday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Sunday, Aug 30, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Madison Square Garden",
      venue_url: "https://www.ticketmaster.com/venue/new-york",
      city: "New York",
      state: "NY",
      country: "United States",
      full_address: "4 Pennsylvania Plaza, New York, NY 10001",
      parking_info: "On-site parking garages and valet options available at Madison Square Garden.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 20789
    },
    pricing: {
      currency: "USD",
      min_price: 105.0,
      max_price: 410.0
    },
    description: {
      "full_description": "Experience The Lion King Broadway Production live at Madison Square Garden in New York, NY. Julie Taymor's Tony Award-winning theatrical landmark.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "Recommended for ages 6+. Children under 4 are not admitted.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Disney On Ice: Magic In The Stars",
      event_id: "VV1aZ9v1015TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1015TM",
      category: "Family",
      subcategory: "Children & Family",
      subgenre: "Children & Family",
      main_performer: "Disney On Ice Performers",
      lineup: ["Disney On Ice Performers"],
      supporting_acts: [],
      image_url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_presale: true
    },
    date_time: {
      exact_date: "2026-08-22",
      day_of_week: "Saturday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Saturday, Aug 22, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Crypto.com Arena",
      venue_url: "https://www.ticketmaster.com/venue/los-angeles",
      city: "Los Angeles",
      state: "CA",
      country: "United States",
      full_address: "1111 S Figueroa St, Los Angeles, CA 90015",
      parking_info: "On-site parking garages and valet options available at Crypto.com Arena.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 20000
    },
    pricing: {
      currency: "USD",
      min_price: 35.0,
      max_price: 140.0
    },
    description: {
      "full_description": "Experience Disney On Ice: Magic In The Stars live at Crypto.com Arena in Los Angeles, CA. World-class ice skating, beloved characters, and dazzling acrobatics.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "Family event. Children 2 and older require a ticket.",
      "entry_requirements": "Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited."
    }
  },
  {
    identity: {
      event_title: "Monster Jam World Finals",
      event_id: "VV1aZ9v1016TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1016TM",
      category: "Family",
      subcategory: "Motorsports / Family",
      subgenre: "Motorsports / Family",
      main_performer: "Grave Digger",
      lineup: ["Grave Digger", "Max-D", "El Toro Loco"],
      supporting_acts: ["Max-D", "El Toro Loco"],
      image_url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_resale: false
    },
    date_time: {
      exact_date: "2026-09-03",
      day_of_week: "Thursday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Thursday, Sep 03, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "Sphere",
      venue_url: "https://www.ticketmaster.com/venue/las-vegas",
      city: "Las Vegas",
      state: "NV",
      country: "United States",
      full_address: "255 Sands Ave, Las Vegas, NV 89109",
      parking_info: "On-site parking garages and valet options available at Sphere.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 18600
    },
    pricing: {
      currency: "USD",
      min_price: 30.0,
      max_price: 120.0
    },
    description: {
      "full_description": "Experience Monster Jam World Finals live at Sphere in Las Vegas, NV. 12,000-pound monster trucks soaring in freestyle stunts, racing, and high-energy excitement.",
      "special_notices": "Ear protection is strongly advised for attendees of all ages. Hearing protection available on concourses.",
      "age_restrictions": "All ages welcome. Children under 2 free on lap.",
      "entry_requirements": "Clear bag policy strictly enforced. Outside food/beverage and air horns are prohibited."
    }
  },
  {
    identity: {
      event_title: "PAW Patrol Live!: Heroes Unite",
      event_id: "VV1aZ9v1017TM",
      event_url: "https://www.ticketmaster.com/event/VV1aZ9v1017TM",
      category: "Family",
      subcategory: "Children's Theater",
      subgenre: "Children's Theater",
      main_performer: "PAW Patrol Live Performers",
      lineup: ["PAW Patrol Live Performers"],
      supporting_acts: [],
      image_url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
      is_featured: false,
      is_selling_fast: true
    },
    date_time: {
      exact_date: "2026-09-07",
      day_of_week: "Monday",
      start_time: "20:55:04",
      end_time: "Unspecified",
      time_zone: "EST",
      doors_time: "20:00:00",
      full_date_display: "Monday, Sep 07, 2026 • 08:55 PM"
    },
    location: {
      venue_name: "United Center",
      venue_url: "https://www.ticketmaster.com/venue/chicago",
      city: "Chicago",
      state: "IL",
      country: "United States",
      full_address: "1901 W Madison St, Chicago, IL 60612",
      parking_info: "On-site parking garages and valet options available at United Center.",
      accessibility_info: "ADA accessible seating, wheelchair companion seats, and assistive listening devices provided upon request.",
      capacity: 23500
    },
    pricing: {
      currency: "USD",
      min_price: 25.0,
      max_price: 95.0
    },
    description: {
      "full_description": "Experience PAW Patrol Live!: Heroes Unite live at United Center in Chicago, IL. An interactive live stage show with Chase, Marshall, Skye, and the pup pack.",
      "special_notices": "All attendees must possess a valid mobile entry ticket. Re-entry is strictly prohibited once validated.",
      "age_restrictions": "Family show. Every attendee regardless of age must have a ticket.",
      "entry_requirements": "Clear bag policy strictly enforced. Stroller parking provided at main entrance."
    }
  }
];

export const VENUES_LIST = [
  "All Venues",
  "TD Garden (Boston, MA)",
  "Madison Square Garden (New York, NY)",
  "Crypto.com Arena (Los Angeles, CA)",
  "Sphere (Las Vegas, NV)",
  "United Center (Chicago, IL)",
  "Kaseya Center (Miami, FL)"
];

export const CITIES_LIST = [
  "All Cities",
  "Boston, MA",
  "New York, NY",
  "Los Angeles, CA",
  "Las Vegas, NV",
  "Chicago, IL",
  "Miami, FL"
];

export const CATEGORIES_LIST = [
  { id: 'all', name: 'All Events', icon: 'Sparkles' },
  { id: 'Concerts', name: 'Concerts', icon: 'Music' },
  { id: 'Sports', name: 'Sports', icon: 'Trophy' },
  { id: 'Arts & Theater', name: 'Arts & Theater', icon: 'Mask' },
  { id: 'Family', name: 'Family', icon: 'Smile' }
];

export const SEAT_ZONES_PRESETS: Record<string, SeatZone[]> = {
  default: [
    {
      id: 'zone-vip',
      name: 'VIP Front Stage & Club Lounge',
      code: 'VIP-100',
      tier: 'VIP',
      color: '#ffb932',
      hoverColor: '#f59e0b',
      price: 495,
      availableCount: 14,
      totalCount: 40,
      description: 'First 5 rows closest to stage. Includes dedicated VIP bar access and exclusive merchandise bundle.',
      perks: ['Exclusive Tour Poster', 'Early Venue Entry', 'Complimentary Drink Voucher', 'Dedicated VIP Host'],
      centerPos: { x: 300, y: 150 }
    },
    {
      id: 'zone-floor',
      name: 'General Admission Floor (GA Pit)',
      code: 'GA-PIT',
      tier: 'Floor',
      color: '#024ddf',
      hoverColor: '#0139a7',
      price: 245,
      availableCount: 42,
      totalCount: 150,
      description: 'Standing room area directly in front of the main stage. High-energy concert atmosphere.',
      perks: ['Up-close performer view', 'Direct stage access'],
      centerPos: { x: 300, y: 240 }
    },
    {
      id: 'zone-lower-101',
      name: 'Lower Bowl - Section 101-104 (Center)',
      code: 'SEC-102',
      tier: 'Lower',
      color: '#00875a',
      hoverColor: '#059669',
      price: 185,
      availableCount: 68,
      totalCount: 220,
      description: 'Prime elevated center-court/center-stage sightlines with unobstructed acoustic coverage.',
      perks: ['Padded arena seating', 'In-seat mobile food ordering'],
      centerPos: { x: 170, y: 280 }
    },
    {
      id: 'zone-lower-105',
      name: 'Lower Bowl - Section 105-108 (Sides)',
      code: 'SEC-106',
      tier: 'Lower',
      color: '#10b981',
      hoverColor: '#047857',
      price: 145,
      availableCount: 95,
      totalCount: 260,
      description: 'Excellent side elevated viewpoint close to venue concourse amenities and exits.',
      perks: ['Fast concourse access', 'Excellent angle of production stage'],
      centerPos: { x: 430, y: 280 }
    },
    {
      id: 'zone-upper-201',
      name: 'Upper Tier - Section 201-208 (Mid-Level)',
      code: 'SEC-204',
      tier: 'Upper',
      color: '#6366f1',
      hoverColor: '#4f46e5',
      price: 85,
      availableCount: 140,
      totalCount: 400,
      description: 'Panoramic arena view with full view of light shows and large LED screens.',
      perks: ['Great value', 'Panoramic light show visuals'],
      centerPos: { x: 300, y: 380 }
    },
    {
      id: 'zone-upper-301',
      name: 'Upper Balcony - Section 301-314',
      code: 'SEC-308',
      tier: 'Upper',
      color: '#8b5cf6',
      hoverColor: '#7c3aed',
      price: 55,
      availableCount: 180,
      totalCount: 500,
      description: 'Budget-friendly arena seats with clear central line of sight to main stage screens.',
      perks: ['Most affordable entry', 'Direct elevator access'],
      centerPos: { x: 300, y: 440 }
    }
  ]
};
