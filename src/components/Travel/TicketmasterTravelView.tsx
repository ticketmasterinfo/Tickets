import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  HelpCircle, 
  Globe, 
  Building2, 
  Ticket, 
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import { EventItem } from '../../types';

interface TicketmasterTravelViewProps {
  onBackToHome: () => void;
  onSelectEvent?: (event: EventItem) => void;
  events?: EventItem[];
}

export const TicketmasterTravelView: React.FC<TicketmasterTravelViewProps> = ({
  onBackToHome,
  onSelectEvent,
  events = []
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'hotels'>('events');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All cities');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedDeal, setSelectedDeal] = useState<{
    title: string;
    artist: string;
    city: string;
    venue: string;
    image: string;
    savings: string;
    price: number;
    description: string;
  } | null>(null);

  const hotDeals = [
    {
      id: 'jeezy-vegas',
      title: 'Jeezy Live with 4-Star Strip Hotel',
      artist: 'Jeezy',
      city: 'Las Vegas, NV',
      venue: 'The Colosseum at Caesars Palace',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/7PXyPC39yZ2jLRdd_LatestDealsJeezyDynamic_22Aug2026_DesktopBC.png?auto=format,compress',
      savings: 'Up to 38% Bundle Savings',
      price: 249,
      description: 'Experience hip-hop heavyweight Jeezy in Las Vegas paired with luxury accommodations just steps away.'
    },
    {
      id: 'raiders-vegas',
      title: 'Las Vegas Raiders Game + Stadium Hotel',
      artist: 'Las Vegas Raiders',
      city: 'Las Vegas, NV',
      venue: 'Allegiant Stadium',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/cCIG-Qqm2FqV8vN7_LatestDeals_LasVegasRaiders_Dynamic_20Aug2026_MobileBC.png?auto=format,compress',
      savings: 'Official NFL Game Package',
      price: 389,
      description: 'Cheer on the Raiders at Allegiant Stadium with convenient hotel walking distance and tailgate access.'
    },
    {
      id: 'sphere-oz',
      title: 'The Wizard of Oz at Sphere Las Vegas',
      artist: 'The Wizard of Oz',
      city: 'Las Vegas, NV',
      venue: 'Sphere',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/adPGL5GXnQHGZSR5_LatestDeals_Wizardofoz_Dynamic_30March2026_DesktopB.png?auto=format,compress',
      savings: 'Exclusive Immersive Bundle',
      price: 299,
      description: 'Groundbreaking 16K visual experience inside Sphere combined with premier Las Vegas resort stay.'
    },
    {
      id: 'marc-anthony-vegas',
      title: 'Marc Anthony Live + Resort Stay',
      artist: 'Marc Anthony',
      city: 'Las Vegas, NV',
      venue: 'Michelob ULTRA Arena',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/l_j5Mxyox7dUMjoC_LatestDeals_MarcAnthony_Lasvegas_Dynamic__July242024_DesktopB.png?auto=format,compress',
      savings: 'Up to 42% Bundle Savings',
      price: 219,
      description: 'Salsa legend Marc Anthony live in concert with discounted hotel stays for music fans.'
    },
    {
      id: 'jonas-brothers',
      title: 'Jonas Brothers Arena Tour Package',
      artist: 'Jonas Brothers',
      city: 'Los Angeles, CA',
      venue: 'Kia Forum',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/MMB80KUiYIVNLB6m_LatestDeals_JonasBorthers_Dynamic_Aug2026_DesktopC.png?auto=format,compress',
      savings: 'Fan Preferred Rate',
      price: 185,
      description: 'Sing along to all five albums with verified concert seats and boutique hotel reservations.'
    },
    {
      id: 'awakening-vegas',
      title: 'Awakening at Wynn Las Vegas',
      artist: 'Awakening',
      city: 'Las Vegas, NV',
      venue: 'Wynn Las Vegas',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/IkmpyCewhrpzgIb5_LatestDeals_Awakening_Dynamic_22May2026_MobileBC.png?auto=format,compress',
      savings: 'Luxury Resort Bundle',
      price: 320,
      description: 'Spectacular 360-degree theatrical adventure inside the custom-designed theater at Wynn.'
    },
    {
      id: 'cdco',
      title: 'CDCO Classical & Orchestral Nights',
      artist: 'CDCO',
      city: 'New York, NY',
      venue: 'Lincoln Center',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/XcjrMFjlQbC7FrsH_LatestDeals_CDCO_Dynamic_Aug2026_DesktopC.png?auto=format,compress',
      savings: 'Culture & Stay Discount',
      price: 160,
      description: 'World-renowned orchestral performances with Manhattan hotel deals.'
    },
    {
      id: 'phil-wickham',
      title: 'Phil Wickham Worship Tour + Stay',
      artist: 'Phil Wickham',
      city: 'Dallas, TX',
      venue: 'American Airlines Center',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/SgOV8RkkrgHNQcVV_LatestDeals_PhilWickham_Dynamic_Oct2026_Desktop.png?auto=format,compress',
      savings: 'Group & Family Friendly',
      price: 135,
      description: 'Inspirational night of live worship with central hotel suites.'
    },
    {
      id: 'don-toliver',
      title: 'Don Toliver Psycho Tour Package',
      artist: 'Don Toliver',
      city: 'Chicago, IL',
      venue: 'United Center',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/5w8OAOj75fgdqh6Q_LatestDeals_DonToliver_Dynamic_Aug2026_Desktop.png?auto=format,compress',
      savings: 'Up to 30% Off Hotel',
      price: 175,
      description: 'High-energy arena show with nearby downtown Chicago hotel.'
    }
  ];

  const destinations = [
    {
      city: 'Las Vegas',
      state: 'NV',
      discount: 'Up to 51% OFF',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/23211de7-9ae5-4f16-945c-258a46c2d1c6_Hotel_Deals_Las+Vegas_01Nov2023_Desktop.png?auto=format,compress',
      alt: 'Las Vegas Strip hotels'
    },
    {
      city: 'Atlanta',
      state: 'GA',
      discount: 'Up to 45% OFF',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/d53cc14d-3078-4f6a-beaa-27bc425ac3f9_Hotel_Deals_Atlanta_01Nov2023_Desktop.png?auto=format,compress',
      alt: 'Downtown Atlanta hotels'
    },
    {
      city: 'Chicago',
      state: 'IL',
      discount: 'Up to 32% OFF',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/32b86a9e-86e0-45a2-83cd-4b3909152798_Hotel_Deals_Chicago_01Nov2023_Desktop.png?auto=format,compress',
      alt: 'Chicago skyline hotels'
    },
    {
      city: 'Charlotte',
      state: 'NC',
      discount: 'Up to 28% OFF',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/21248367-9618-4e8a-82f6-a21bb0c500f0_Hotel_Deals_Charlotte_03Nov2023_Desktop.png?auto=format,compress',
      alt: 'Charlotte NC hotels'
    },
    {
      city: 'Boston',
      state: 'MA',
      discount: 'Up to 27% OFF',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/f6d80831-7110-484f-90dc-7ec1930d63f3_Hotel_Deals_Boston_03Nov2023_Desktop+B.png?auto=format,compress',
      alt: 'Boston historic center hotels'
    },
    {
      city: 'Nashville',
      state: 'TN',
      discount: 'Up to 24% OFF',
      image: 'https://images.prismic.io/ticketmaster-travel-exp/176381c4-f301-409f-bb11-167c71006849_Hotel_Deals_Nashville_03Nov2023_Desktop.png?auto=format,compress',
      alt: 'Nashville Music City hotels'
    }
  ];

  const faqs = [
    {
      q: 'When will I receive my hotel confirmation number?',
      a: 'The primary ticket holder will receive the hotel confirmation number via email upon purchase. If you have not received your hotel confirmation number within 24 hours, please contact Ticketmaster Fan Support.'
    },
    {
      q: 'Can I make changes to my hotel reservation?',
      a: 'The primary ticket holder must contact Ticketmaster Fan Support to discuss any changes or requests. Please note that changes may not be made to room type and all hotel bookings are subject to the property’s individual cancellation policies, which may include non-refundable and non-transferable conditions. Please review the cancellation policies carefully.'
    },
    {
      q: 'Is airfare included in my Travel Package?',
      a: 'No, airfare is not included in Travel Packages. Packages include verified event tickets and reserved hotel stays near the venue.'
    },
    {
      q: 'I have a question that has not been answered here. Who do I contact?',
      a: 'If you have further questions or need immediate assistance with an upcoming event within 48 hours, please reach out to Ticketmaster Fan Support or call our dedicated travel line at (855) 232-1403.'
    }
  ];

  const galleryImagesRow1 = [
    'https://images.prismic.io/ticketmaster-travel-exp/797be6e5-beef-4730-a8b2-04438a5104b7_T+Travel_Gallery+Carousel_Image+3_1198x1011.png?auto=format,compress&w=600',
    'https://images.prismic.io/ticketmaster-travel-exp/0a9caa1f-e806-439d-a010-b36a101a075d_T+Travel_Gallery+Carousel_Image+10_1198x1011.png?auto=format,compress&w=600',
    'https://images.prismic.io/ticketmaster-travel-exp/7b3590e9-1bc2-45b4-a235-99c5f30aee32_T+Travel_Gallery+Carousel_Image+9_1198x1011.png?auto=format,compress&w=600',
    'https://images.prismic.io/ticketmaster-travel-exp/1a827de0-2a6e-4765-9449-0ad8eda8fe81_T+Travel_Gallery+Carousel_Image+6_1198x1011.png?auto=format,compress&w=600',
    'https://images.prismic.io/ticketmaster-travel-exp/b8322681-24da-45cb-a5cc-b5b1f9f09e97_T+Travel_Gallery+Carousel_Image+2_1198x1011.png?auto=format,compress&w=600',
    'https://images.prismic.io/ticketmaster-travel-exp/16a78fba-490d-456a-8532-d284ca98d620_T+Travel_Gallery+Carousel_Image+8_1198x1011.png?auto=format,compress&w=600'
  ];

  const galleryImagesRow2 = [
    'https://images.prismic.io/ticketmaster-travel-exp/cea3b0c7-2adb-49b8-89ee-290328bb8cd2_T+Travel_Gallery+Carousel_Image+11_1198x1011.png?auto=format,compress&w=600',
    'https://images.prismic.io/ticketmaster-travel-exp/b16f1e34-66b1-47f1-aeb9-afe48c920632_T+Travel_Gallery+Carousel_Image+1_1198x1011.png?auto=format,compress&w=600',
    'https://images.prismic.io/ticketmaster-travel-exp/908bb297-2e59-49a9-b7bf-e3a1ec4cfccd_T+Travel_Gallery+Carousel_Image+7_1198x1011.png?auto=format,compress&w=600',
    'https://images.prismic.io/ticketmaster-travel-exp/92b62e54-da74-492c-a18e-a3d4c6fb9359_T+Travel_Gallery+Carousel_Image+4_1198x1011.png?auto=format,compress&w=600',
    'https://images.prismic.io/ticketmaster-travel-exp/fb54944f-47bc-46b2-a28c-83039c4fd4f5_T+Travel_Gallery+Carousel_Image+5_1198x1011.png?auto=format,compress&w=600'
  ];

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="ticketmaster-travel-page" className="min-h-screen bg-[#121212] text-white flex flex-col font-['Averta',sans-serif]">
      
      {/* 1. TRAVEL HEADER BAR */}
      <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3 flex items-center justify-between">
        
        {/* Left: Brand Logo & Back Action */}
        <div className="flex items-center space-x-4">
          <button 
            id="travel-back-to-home-btn"
            onClick={onBackToHome}
            className="flex items-center space-x-1.5 text-xs text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-semibold">Back to Ticketmaster</span>
          </button>

          {/* Ticketmaster Travel Vector Brand Logo */}
          <div className="flex items-center space-x-2">
            <svg width="108" height="32" viewBox="0 0 88 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.69857 19.7823H0.558594V18.7812H9.94141V19.7823H5.75053V31.9986H4.69857V19.7823Z" fill="white"></path>
              <path d="M19.9674 31.9986L16.3194 26.654H13.3332V31.9986H12.2812V18.7812H16.7945C19.7638 18.7812 21.0363 20.461 21.0363 22.7007C21.0363 25.093 19.628 26.3147 17.558 26.6031L21.2908 32.0156H19.9674V31.9986ZM13.3162 25.6529H16.4382C18.9493 25.6529 19.9165 24.3634 19.9165 22.6837C19.9165 20.7325 18.7118 19.7823 16.7266 19.7823H13.3162V25.6699V25.6529Z" fill="white"></path>
              <path d="M32.168 28.5034H25.7714L24.448 31.9986H23.3281L28.3843 18.7812H29.4872L34.5943 31.9986H33.4745L32.151 28.5034H32.168ZM31.7947 27.5024L28.9612 20.0538H28.9442L26.1447 27.5024H31.7947Z" fill="white"></path>
              <path d="M45.3503 18.7812L40.3111 31.9986H39.327L34.3047 18.7812H35.4415L39.802 30.4377H39.836L44.2135 18.7812H45.3503Z" fill="white"></path>
              <path d="M47.7461 18.7812H55.6358V19.7823H48.7981V24.9233H54.482V25.9244H48.7981V31.0146H56.0261V32.0156H47.7461V18.7982V18.7812Z" fill="white"></path>
              <path d="M58.4492 18.7812H59.5012V30.9976H66.4238V31.9986H58.4492V18.7812Z" fill="white"></path>
              <path d="M0.322375 3.59928H1.81548L2.15482 1.97043L4.36055 1.25781L3.8685 3.61624H5.70095L5.37858 5.12632H3.54613L2.79958 8.57064C2.74867 8.74032 2.69777 9.04572 2.69777 9.33416C2.69777 9.80924 3.02015 10.0977 3.49523 10.0977C3.8685 10.0977 4.24178 10.0298 4.47932 9.92801L4.13998 11.506C3.80064 11.5738 3.39342 11.6756 3.02015 11.6756C1.62884 11.6756 0.644751 11.1327 0.644751 9.62261C0.644751 8.99482 0.763521 8.40097 0.916225 7.79016L1.49311 5.10935H0L0.322375 3.59928Z" fill="#21FFF2"></path>
              <path d="M6.55084 3.59655H8.60386L6.92412 11.4863H4.87109L6.55084 3.59655Z" fill="#21FFF2"></path>
              <path d="M14.7959 5.39653C14.4057 5.12506 13.8457 5.00629 13.2858 5.00629C11.657 5.00629 10.7408 6.5503 10.7408 8.02644C10.7408 9.04446 11.0801 10.0795 12.4714 10.0795C12.9635 10.0795 13.6082 9.92675 14.1342 9.68921L13.9136 11.3181C13.2858 11.6235 12.6071 11.6913 11.9285 11.6913C9.89241 11.6913 8.58594 10.334 8.58594 8.29791C8.58594 5.54924 10.4184 3.44531 13.2519 3.44531C14.0154 3.44531 14.762 3.59802 15.3049 3.75072L14.8129 5.4135L14.7959 5.39653Z" fill="#21FFF2"></path>
              <path d="M17.0513 0H19.1043L17.747 6.46448H17.7639L20.6483 3.59703H23.2952L19.5285 7.19406L21.8869 11.5037H19.5794L17.5433 7.31283H17.5264L16.6271 11.5037H14.625L17.0513 0Z" fill="#21FFF2"></path>
              <path d="M30.0156 6.41724C30.0156 4.41512 28.7261 3.41406 26.7918 3.41406C24.1959 3.41406 22.3125 5.77249 22.3125 8.21576C22.3125 10.659 23.8565 11.6601 26.1131 11.6601C26.9615 11.6601 27.8268 11.4565 28.6243 11.2189L28.8957 9.5901C28.1322 9.92944 27.3178 10.167 26.4694 10.167C25.163 10.167 24.3825 9.6919 24.2807 8.4533V8.18183C24.2807 7.60494 24.3995 7.09593 24.6031 6.60388C24.9933 5.58586 25.5532 4.8902 26.7579 4.8902C27.6232 4.8902 28.0644 5.36528 28.0644 6.19667C28.0644 6.36634 28.0474 6.53601 28.0135 6.73962H25.2139C25.0442 7.3674 24.9933 7.77461 24.9933 8.14789H29.8289C29.9477 7.57101 30.0325 7.01109 30.0325 6.41724H30.0156Z" fill="#21FFF2"></path>
            </svg>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#21FFF2] bg-[#21FFF2]/10 border border-[#21FFF2]/30 px-2 py-0.5 rounded">
              Travel
            </span>
          </div>
        </div>

        {/* Right: Section Jump Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          <button 
            onClick={() => scrollToId('search-products')}
            className="hover:text-[#21FFF2] transition-colors flex items-center space-x-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
          <button 
            onClick={() => scrollToId('latest-deals')}
            className="hover:text-[#21FFF2] transition-colors"
          >
            Latest Deals
          </button>
          <button 
            onClick={() => scrollToId('faq')}
            className="hover:text-[#21FFF2] transition-colors"
          >
            Help & FAQ
          </button>
          <div className="flex items-center space-x-1.5 text-xs text-gray-400 border border-white/20 px-2.5 py-1 rounded-full">
            <Globe className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-white font-bold">EN - US</span>
          </div>
        </nav>

      </header>

      {/* 2. HERO SPOTLIGHT VIDEO & BILLBOARD */}
      <section className="relative w-full min-h-[580px] md:min-h-[660px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://images.prismic.io/ticketmaster-travel-exp/0be5dd20-2963-44ac-ba44-643d92505372_Concert+Img.png"
        >
          <source src="https://ticketmaster-travel-exp.cdn.prismic.io/ticketmaster-travel-exp/Z8nNIxsAHJWomMhY_TT_cut2.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-[#121212]/40" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-12 pb-16 flex flex-col items-center">
          
          <div className="inline-flex items-center space-x-2 bg-[#21FFF2]/10 border border-[#21FFF2]/40 text-[#21FFF2] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Event + Hotel Packages</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase max-w-3xl drop-shadow-md">
            Your Show, Your Stay
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl font-normal drop-shadow">
            Save Big &amp; Stay Close &mdash; Book verified event tickets with top-rated nearby hotel rooms all in one place.
          </p>

          {/* DUAL-TAB SEARCH CONTROL WIDGET */}
          <div id="search-products" className="w-full max-w-3xl mt-10 bg-[#1f1f1f]/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 shadow-2xl text-left">
            
            {/* Tabs (Ticket + Hotel vs Hotel Deals) */}
            <div className="flex border-b border-white/10 pb-3 mb-4 space-x-4">
              <button
                onClick={() => setActiveTab('events')}
                className={`flex items-center space-x-2 pb-2 text-sm font-bold transition-all relative ${
                  activeTab === 'events' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Ticket className="w-4 h-4 text-[#21FFF2]" />
                <span>Ticket + Hotel</span>
                {activeTab === 'events' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#21FFF2]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('hotels')}
                className={`flex items-center space-x-2 pb-2 text-sm font-bold transition-all relative ${
                  activeTab === 'hotels' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#ffb932]" />
                <span>Hotel Deals</span>
                {activeTab === 'hotels' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffb932]" />
                )}
              </button>
            </div>

            {/* Input Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Query Input */}
              <div className="md:col-span-6 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 flex items-center space-x-2.5 focus-within:border-[#21FFF2] transition-colors">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={activeTab === 'events' ? 'Search artists, venues, or shows' : 'Search destination city or landmark'}
                  className="bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none w-full"
                />
              </div>

              {/* City Selection */}
              <div className="md:col-span-4 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 flex items-center space-x-2.5 focus-within:border-[#21FFF2] transition-colors">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-white text-sm focus:outline-none w-full cursor-pointer"
                >
                  <option value="All cities" className="bg-[#1f1f1f] text-white">All Cities</option>
                  <option value="Las Vegas" className="bg-[#1f1f1f] text-white">Las Vegas, NV</option>
                  <option value="Los Angeles" className="bg-[#1f1f1f] text-white">Los Angeles, CA</option>
                  <option value="New York" className="bg-[#1f1f1f] text-white">New York, NY</option>
                  <option value="Chicago" className="bg-[#1f1f1f] text-white">Chicago, IL</option>
                  <option value="Atlanta" className="bg-[#1f1f1f] text-white">Atlanta, GA</option>
                  <option value="Nashville" className="bg-[#1f1f1f] text-white">Nashville, TN</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="md:col-span-2">
                <button 
                  onClick={() => scrollToId('latest-deals')}
                  className="w-full bg-[#024ddf] hover:bg-[#0139a7] text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Search</span>
                </button>
              </div>

            </div>

            {/* 3 Step Indicator */}
            <div className="flex flex-wrap items-center justify-between text-xs text-gray-400 mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-[11px]">1</span>
                <span>Search for your event</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 hidden md:block" />
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-[11px]">2</span>
                <span>Select your tickets &amp; hotel</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 hidden md:block" />
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#00875a] text-white font-bold flex items-center justify-center text-[11px]">3</span>
                <span>Checkout &amp; save</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. EVENT TICKET + HOTEL PACKAGES (Two Ways to Save) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Event Ticket + Hotel Packages: Two Ways to Save
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
            Choose from our expertly curated packages or create your own custom stay to match your vibe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#1f1f1f] rounded-2xl overflow-hidden border border-white/10 hover:border-[#21FFF2]/50 transition-all hover:shadow-xl group">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src="https://images.prismic.io/ticketmaster-travel-exp/aZ3qdsFoBIGEgvJE_VP1_EN.png?auto=format,compress" 
                alt="Curated Concert Packages" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white">Curated Concert VIP Bundles</h3>
              <p className="text-gray-400 text-xs mt-1">Prime seat tickets bundled with 4 &amp; 5 star hotels near the arena.</p>
              <button 
                onClick={() => scrollToId('latest-deals')}
                className="mt-4 w-full bg-white/10 hover:bg-[#024ddf] text-white text-xs font-bold py-2 rounded-xl transition-colors"
              >
                View Packages
              </button>
            </div>
          </div>

          <div className="bg-[#1f1f1f] rounded-2xl overflow-hidden border border-white/10 hover:border-[#21FFF2]/50 transition-all hover:shadow-xl group">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src="https://images.prismic.io/ticketmaster-travel-exp/aZ3qecFoBIGEgvJH_VP2_EN.png?auto=format,compress" 
                alt="Sports & Game Day Hotel Stays" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white">NFL &amp; Sports Fan Packages</h3>
              <p className="text-gray-400 text-xs mt-1">Stadium-close accommodations with verified game tickets.</p>
              <button 
                onClick={() => scrollToId('latest-deals')}
                className="mt-4 w-full bg-white/10 hover:bg-[#024ddf] text-white text-xs font-bold py-2 rounded-xl transition-colors"
              >
                View Packages
              </button>
            </div>
          </div>

          <div className="bg-[#1f1f1f] rounded-2xl overflow-hidden border border-white/10 hover:border-[#21FFF2]/50 transition-all hover:shadow-xl group">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src="https://images.prismic.io/ticketmaster-travel-exp/aZ3qfMFoBIGEgvJK_VP3_EN.png?auto=format,compress" 
                alt="Theater & Festival Retreats" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white">Las Vegas &amp; Broadway Stays</h3>
              <p className="text-gray-400 text-xs mt-1">Resort credits, early check-in, and world-class live entertainment.</p>
              <button 
                onClick={() => scrollToId('latest-deals')}
                className="mt-4 w-full bg-white/10 hover:bg-[#024ddf] text-white text-xs font-bold py-2 rounded-xl transition-colors"
              >
                View Packages
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SAVE ON PACKAGE DEALS FOR HOT EVENTS (Grid of 9) */}
      <section id="latest-deals" className="max-w-7xl mx-auto px-4 md:px-8 py-12 w-full border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-black uppercase text-[#21FFF2] tracking-wider mb-1">Exclusive Fan Savings</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Save on Package Deals for Hot Events
            </h2>
          </div>
          <span className="text-xs text-gray-400 mt-2 md:mt-0">Showing 9 hand-picked bundles with verified tickets</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotDeals.map((deal) => (
            <div 
              key={deal.id}
              onClick={() => setSelectedDeal(deal)}
              className="bg-[#1c1c1c] rounded-2xl overflow-hidden border border-white/10 hover:border-[#024ddf] transition-all hover:-translate-y-1 cursor-pointer flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#024ddf] text-white text-[11px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                  {deal.savings}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    {deal.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span className="line-clamp-1">{deal.venue} &bull; {deal.city}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {deal.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">From</span>
                    <span className="text-lg font-black text-[#21FFF2]">${deal.price}</span>
                    <span className="text-[10px] text-gray-400 ml-1">/ pkg</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDeal(deal);
                    }}
                    className="bg-[#024ddf] hover:bg-[#0139a7] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
                  >
                    View Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHERE TO NEXT? DESTINATION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 w-full border-t border-white/10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Where to next? Discover some of the hottest destinations for event travel.
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
            We&apos;re the experts in event travel. That&apos;s why we&apos;ve secured the very best hotel deals close to your favorite live events, all year round!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.map((dest) => (
            <div 
              key={dest.city}
              className="bg-[#1f1f1f] rounded-xl overflow-hidden border border-white/10 hover:border-[#ffb932] transition-all hover:scale-102 cursor-pointer group"
              onClick={() => {
                setSelectedCity(dest.city);
                scrollToId('search-products');
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-2 left-2 bg-[#ffb932] text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                  {dest.discount}
                </div>
              </div>
              <div className="p-2.5 text-center">
                <h4 className="text-sm font-bold text-white">{dest.city}</h4>
                <span className="text-[11px] text-gray-400">{dest.state}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => scrollToId('search-products')}
            className="bg-[#024ddf] hover:bg-[#0139a7] text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Find My Hotel Deal
          </button>
        </div>
      </section>

      {/* 6. TICKETMASTER HAS YOU COVERED */}
      <section className="bg-[#1a1a1a] border-y border-white/10 py-12 px-4 md:px-8 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-8">
            Ticketmaster has you covered.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#21FFF2]/10 border border-[#21FFF2]/30 flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-[#21FFF2]" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Trusted tickets.</h3>
                <p className="text-xs text-gray-400 mt-0.5">100% verified tickets directly from venues and performers.</p>
              </div>
            </div>

            <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#21FFF2]/10 border border-[#21FFF2]/30 flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-[#21FFF2]" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">The best hotel deals.</h3>
                <p className="text-xs text-gray-400 mt-0.5">Exclusive fan rates at top hotels walking distance from venues.</p>
              </div>
            </div>

            <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#21FFF2]/10 border border-[#21FFF2]/30 flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-[#21FFF2]" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Unbeatable live experiences.</h3>
                <p className="text-xs text-gray-400 mt-0.5">Seamless single checkout with dedicated Fan First Support.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 md:px-8 py-14 w-full">
        <div className="text-center mb-8">
          <div className="text-xs font-black uppercase text-[#21FFF2] tracking-wider mb-1">Fan First Support</div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-[#1c1c1c] border border-white/10 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left p-4.5 flex items-center justify-between font-bold text-white text-sm md:text-base hover:text-[#21FFF2] transition-colors"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#21FFF2] shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-3" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="px-4.5 pb-4 text-xs md:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. INFINITE SCROLL PHOTO GALLERY CAROUSEL */}
      <section className="py-10 bg-black/40 border-t border-white/10 overflow-hidden w-full">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Unforgettable Memories &bull; Real Fans</p>
        </div>

        {/* Row 1 */}
        <div className="flex space-x-4 overflow-x-auto scrollbar-none py-2 px-4 snap-x">
          {galleryImagesRow1.map((src, i) => (
            <div key={`g1-${i}`} className="w-64 h-44 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
              <img src={src} alt="Event highlight" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex space-x-4 overflow-x-auto scrollbar-none py-2 px-4 mt-3 snap-x">
          {galleryImagesRow2.map((src, i) => (
            <div key={`g2-${i}`} className="w-64 h-44 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
              <img src={src} alt="Hotel highlight" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* 9. TRAVEL FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 py-10 px-4 md:px-8 mt-auto text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center space-x-3">
            <span className="font-bold text-white text-sm">Ticketmaster Travel</span>
            <span className="text-gray-600">&bull;</span>
            <span>By continuing past this page, you agree to our</span>
            <a href="https://travel.ticketmaster.com/en-US/policy?countryCode=us" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Terms of Use</a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="https://privacy.ticketmaster.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="https://privacy.ticketmaster.com/cookie-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cookie Policy</a>
            <button 
              onClick={() => alert('OneTrust: Your cookie preferences are stored and active.')}
              className="hover:text-white transition-colors"
            >
              Manage my cookies
            </button>
            <span className="text-gray-600">&bull;</span>
            <span>&copy; Ticketmaster 2026</span>
          </div>

        </div>
      </footer>

      {/* DEAL DETAILS MODAL */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1f1f1f] border border-white/20 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="relative aspect-video">
              <img src={selectedDeal.image} alt={selectedDeal.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedDeal(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white p-1.5 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-[#024ddf] text-white text-xs font-bold px-3 py-1 rounded-md">
                {selectedDeal.savings}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{selectedDeal.title}</h3>
              <p className="text-xs text-gray-400 mt-1 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <span>{selectedDeal.venue} &bull; {selectedDeal.city}</span>
              </p>

              <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                {selectedDeal.description}
              </p>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Package Starting Price</span>
                  <span className="text-2xl font-black text-[#21FFF2]">${selectedDeal.price}</span>
                  <span className="text-xs text-gray-400 ml-1">/ person</span>
                </div>
                <div className="text-right text-xs text-gray-400">
                  <div className="flex items-center space-x-1 text-green-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Authentic</span>
                  </div>
                  <span>Includes room + tickets</span>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const matchedEvent = events.find(e => e.identity.performer.toLowerCase().includes(selectedDeal.artist.toLowerCase()));
                    setSelectedDeal(null);
                    if (matchedEvent && onSelectEvent) {
                      onBackToHome();
                      onSelectEvent(matchedEvent);
                    } else {
                      alert(`Booking confirmed for ${selectedDeal.title}. Redirecting to secure checkout...`);
                    }
                  }}
                  className="flex-1 bg-[#024ddf] hover:bg-[#0139a7] text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-lg"
                >
                  Book Package
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
