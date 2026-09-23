import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Star, 
  Check, 
  Ticket, 
  Sparkles, 
  Music, 
  Info, 
  ChevronRight, 
  ExternalLink,
  Search,
  Filter,
  Volume2,
  HelpCircle,
  Play,
  Pause
} from 'lucide-react';
import { ArtistProfile, ArtistTourDate, EventItem } from '../../types';
import { TicketmasterLogo } from '../Common/TicketmasterLogo';

interface ArtistExperienceViewProps {
  artist: ArtistProfile;
  onBack: () => void;
  onSelectEvent: (event: EventItem) => void;
}

export const ArtistExperienceView: React.FC<ArtistExperienceViewProps> = ({
  artist,
  onBack,
  onSelectEvent
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'about' | 'vip' | 'music' | 'faqs'>('events');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  // Derive unique cities from tour dates
  const availableCities = useMemo(() => {
    const set = new Set<string>();
    artist.tourDates.forEach(td => set.add(td.city));
    return Array.from(set);
  }, [artist.tourDates]);

  // Filtered tour dates
  const filteredTourDates = useMemo(() => {
    if (selectedCityFilter === 'all') return artist.tourDates;
    return artist.tourDates.filter(td => td.city === selectedCityFilter);
  }, [artist.tourDates, selectedCityFilter]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const togglePlayTrack = (trackTitle: string) => {
    setPlayingTrack(prev => prev === trackTitle ? null : trackTitle);
  };

  return (
    <div id="artist-page-container" className="bg-[#f6f6f6] min-h-screen text-[#121212] pb-16">
      
      {/* 1. TOP BREADCRUMB & TICKETMASTER URL BAR */}
      <div className="bg-[#121212] text-gray-400 border-b border-gray-800 text-xs py-2.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 flex-wrap">
            <button 
              onClick={onBack}
              className="hover:text-white flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>All Events</span>
            </button>
            <span className="text-gray-600">/</span>
            <span>{artist.genre}</span>
            <span className="text-gray-600">/</span>
            <span>{artist.subgenre}</span>
            <span className="text-gray-600">/</span>
            <span className="text-white font-bold">{artist.name} Tickets</span>
          </div>

          {/* Official Ticketmaster Verified URL Pill */}
          <div className="hidden sm:flex items-center space-x-2 bg-[#1f1f1f] px-3 py-1 rounded-full border border-gray-700">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00875a]" />
            <span className="text-[11px] font-mono text-gray-300">
              ticketmaster.com/{artist.slug}/artist/{artist.id}
            </span>
            <button
              onClick={handleShare}
              className="text-gray-400 hover:text-white ml-1.5 focus:outline-none"
              title="Copy official URL"
            >
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. ARTIST HERO BILLBOARD SECTION */}
      <div className="relative bg-[#0d0d0d] text-white overflow-hidden">
        {/* Background Atmosphere Image with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src={artist.bannerImageUrl || artist.heroImageUrl} 
            alt={artist.name} 
            className="w-full h-full object-cover opacity-25 filter blur-sm scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-[#121212]/90" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            
            {/* Left Info: Avatar + Badges + Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              
              {/* Artist Portrait */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 shrink-0 bg-gray-800">
                <img 
                  src={artist.avatarUrl || artist.heroImageUrl} 
                  alt={artist.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {artist.verified && (
                  <div className="absolute bottom-2 right-2 bg-[#024ddf] text-white p-1 rounded-full shadow" title="Verified Artist">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Title & Metadata */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#024ddf] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {artist.genre}
                  </span>
                  <span className="bg-white/10 text-gray-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-white/10">
                    {artist.subgenre}
                  </span>
                  <span className="flex items-center text-xs text-[#ffb932] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#ffb932] text-[#ffb932] mr-1" />
                    {artist.rating} ({artist.reviewCount.toLocaleString()} Fan Reviews)
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  {artist.name}
                </h1>

                <p className="text-sm md:text-base text-gray-300 font-medium">
                  {artist.tourName}
                </p>

                <div className="flex items-center space-x-3 text-xs text-gray-400 pt-1">
                  <span className="font-semibold text-white">{artist.fanCount}</span>
                  <span>Fans Favorited</span>
                  <span>&bull;</span>
                  <span className="font-semibold text-white">{artist.tourDates.length}</span>
                  <span>Upcoming Shows</span>
                </div>
              </div>
            </div>

            {/* Right CTAs: Favorite & Quick Find Tickets */}
            <div className="flex items-center space-x-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                  isFavorited
                    ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-900/40'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                }`}
                aria-label="Add to favorites"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white text-white' : 'text-gray-300'}`} />
                <span>{isFavorited ? 'Favorited' : 'Favorite'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
                title="Share this artist page"
              >
                {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <a
                href="#upcoming-shows-section"
                className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-[#024ddf] hover:bg-[#0139a7] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                <span>Find Tickets</span>
              </a>
            </div>

          </div>

          {/* Headline Announcement Alert */}
          {artist.headlineNotice && (
            <div className="mt-6 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-600/40 rounded-xl p-3.5 flex items-center space-x-3">
              <Sparkles className="w-4 h-4 text-[#ffb932] shrink-0" />
              <p className="text-xs sm:text-sm text-blue-100 font-medium">
                {artist.headlineNotice}
              </p>
            </div>
          )}

        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-t border-white/10 bg-[#121212]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center space-x-1 sm:space-x-4 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('events')}
              className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'events'
                  ? 'border-[#024ddf] text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              Tour Dates ({artist.tourDates.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'about'
                  ? 'border-[#024ddf] text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              About {artist.name}
            </button>
            <button
              onClick={() => setActiveTab('vip')}
              className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'vip'
                  ? 'border-[#024ddf] text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              VIP Packages ({artist.vipPackages.length})
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'music'
                  ? 'border-[#024ddf] text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              Top Tracks & Setlist
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'faqs'
                  ? 'border-[#024ddf] text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              FAQs & Guidelines
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN TAB CONTENT WRAPPER */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        
        {/* ==================== TAB 1: TOUR DATES & CONCERT SCHEDULE ==================== */}
        {activeTab === 'events' && (
          <section id="upcoming-shows-section" className="space-y-6">
            
            {/* Header & City Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#121212] tracking-tight">
                  Upcoming Tour Dates
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                  Select a date below to view the interactive venue seat map and purchase verified tickets.
                </p>
              </div>

              {/* City Filter Pills */}
              {availableCities.length > 1 && (
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                  <span className="text-xs font-bold text-gray-500 mr-1 flex items-center">
                    <Filter className="w-3 h-3 mr-1" />
                    City:
                  </span>
                  <button
                    onClick={() => setSelectedCityFilter('all')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      selectedCityFilter === 'all'
                        ? 'bg-[#024ddf] text-white shadow-xs'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    All Cities ({artist.tourDates.length})
                  </button>
                  {availableCities.map(city => (
                    <button
                      key={city}
                      onClick={() => setSelectedCityFilter(city)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCityFilter === city
                          ? 'bg-[#024ddf] text-white shadow-xs'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* List of Tour Date Cards */}
            <div className="space-y-3.5">
              {filteredTourDates.map((tourDate, idx) => {
                return (
                  <div
                    key={tourDate.eventId}
                    className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 hover:border-[#024ddf] hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                  >
                    
                    {/* Left: Date Badge + Title + Location */}
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      
                      {/* Date Badge Box */}
                      <div className="bg-[#f0f4ff] border border-blue-100 rounded-xl w-16 sm:w-20 text-center py-2 shrink-0 group-hover:bg-[#024ddf] group-hover:text-white transition-colors">
                        <span className="block text-[11px] font-black uppercase text-[#024ddf] group-hover:text-blue-100 tracking-wider">
                          {tourDate.month}
                        </span>
                        <span className="block text-2xl sm:text-3xl font-black text-[#121212] group-hover:text-white leading-none my-0.5">
                          {tourDate.dayNumber}
                        </span>
                        <span className="block text-[10px] font-semibold text-gray-500 group-hover:text-blue-200">
                          {tourDate.dayOfWeek.slice(0, 3)}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#024ddf] transition-colors truncate">
                            {tourDate.eventTitle}
                          </h3>
                          {tourDate.status === 'Selling Fast' && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                              Selling Fast
                            </span>
                          )}
                          {tourDate.status === 'Few Tickets Left' && (
                            <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                              Few Tickets Left
                            </span>
                          )}
                        </div>

                        {/* Venue & Time */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#024ddf] mr-1 shrink-0" />
                            {tourDate.venueName} &bull; {tourDate.city}, {tourDate.state}
                          </span>
                          <span className="flex items-center text-gray-500">
                            <Clock className="w-3.5 h-3.5 text-gray-400 mr-1 shrink-0" />
                            {tourDate.time} (Doors {tourDate.doorsTime})
                          </span>
                        </div>

                        {/* Badges / Perks preview */}
                        <div className="flex items-center space-x-2 pt-0.5">
                          <span className="inline-flex items-center text-[11px] font-semibold text-[#00875a]">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            SafeTix™ Verified
                          </span>
                          {tourDate.hasVip && (
                            <span className="inline-flex items-center text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                              <Sparkles className="w-3 h-3 mr-1 text-purple-600" />
                              VIP Available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Pricing & Action CTA Button */}
                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto space-x-4 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
                      <div className="text-left md:text-right">
                        <span className="text-[11px] text-gray-500 block uppercase font-bold tracking-wider">
                          Prices From
                        </span>
                        <span className="text-lg sm:text-xl font-black text-[#121212]">
                          ${tourDate.minPrice}
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectEvent(tourDate.eventItem)}
                        className="bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <span>See Tickets</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Guaranteed Purchase Promise Banner */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#00875a] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">100% Buyer Guarantee with Ticketmaster SafeTix</h4>
                  <p className="text-xs text-gray-500">Every ticket is verified authentic and covered by our comprehensive guarantee.</p>
                </div>
              </div>
              <TicketmasterLogo className="h-5 w-auto text-gray-600" color="#024ddf" />
            </div>

          </section>
        )}

        {/* ==================== TAB 2: ABOUT THE ARTIST ==================== */}
        {activeTab === 'about' && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-8">
            <div>
              <h2 className="text-2xl font-black text-[#121212] mb-3">About {artist.name}</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-4xl">
                {artist.biography}
              </p>
            </div>

            {/* Career Highlights */}
            {artist.careerHighlights && artist.careerHighlights.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 text-[#ffb932] mr-2" />
                  Career Milestones & Accolades
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {artist.careerHighlights.map((highlight, i) => (
                    <li key={i} className="flex items-start space-x-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <Check className="w-4 h-4 text-[#00875a] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-800 font-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Tour Specs Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-center">
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold">Tour</span>
                <p className="text-sm font-bold text-gray-900 truncate">{artist.tourName}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold">Genre</span>
                <p className="text-sm font-bold text-gray-900">{artist.genre}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold">Verified Rating</span>
                <p className="text-sm font-bold text-[#024ddf]">★ {artist.rating} / 5.0</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold">Verified Fans</span>
                <p className="text-sm font-bold text-gray-900">{artist.fanCount}</p>
              </div>
            </div>
          </section>
        )}

        {/* ==================== TAB 3: VIP PACKAGES ==================== */}
        {activeTab === 'vip' && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-[#121212] tracking-tight">VIP Experience Packages</h2>
              <p className="text-sm text-gray-600 mt-1">
                Elevate your concert night with exclusive access, hospitality lounges, premium reserved seating, and limited-edition merchandise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artist.vipPackages.map((pkg, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl p-6 border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="bg-purple-100 text-purple-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                        Official VIP
                      </span>
                      <span className="text-xl font-black text-[#121212]">${pkg.price}</span>
                    </div>

                    <h3 className="text-lg font-black text-gray-900">{pkg.title}</h3>

                    <ul className="space-y-2.5 pt-2">
                      {pkg.perks.map((perk, perkIdx) => (
                        <li key={perkIdx} className="flex items-start space-x-2 text-xs text-gray-700">
                          <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-gray-100 mt-6">
                    <button
                      onClick={() => {
                        if (artist.tourDates[0]) {
                          onSelectEvent(artist.tourDates[0].eventItem);
                        }
                      }}
                      className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-xs flex items-center justify-center space-x-1"
                    >
                      <span>Select VIP Tickets</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== TAB 4: TOP TRACKS & MUSIC SETLIST ==================== */}
        {activeTab === 'music' && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-2xl font-black text-[#121212]">Popular Songs & Live Setlist</h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Listen to audio previews of popular anthems performed live on the {artist.tourName}.
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {artist.topTracks.map((track, i) => {
                const isPlaying = playingTrack === track.title;
                return (
                  <div 
                    key={track.title} 
                    className="py-3.5 flex items-center justify-between hover:bg-gray-50 px-3 rounded-xl transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                      
                      <button
                        onClick={() => togglePlayTrack(track.title)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isPlaying 
                            ? 'bg-[#024ddf] text-white shadow-md' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                        aria-label={`Play preview of ${track.title}`}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>

                      <div>
                        <p className="text-sm font-bold text-gray-900">{track.title}</p>
                        <p className="text-xs text-gray-500">{track.album}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-500 font-medium">
                      {track.streams && (
                        <span className="hidden sm:inline-block text-gray-400">{track.streams} streams</span>
                      )}
                      <span>{track.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================== TAB 5: FAQS & ENTRY GUIDELINES ==================== */}
        {activeTab === 'faqs' && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-2xl font-black text-[#121212]">Ticket & Event Guidelines</h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Official answers to frequently asked questions for {artist.name} concerts.
              </p>
            </div>

            <div className="space-y-4">
              {artist.faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 p-4 sm:p-5 rounded-xl border border-gray-100 space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-start">
                    <HelpCircle className="w-4 h-4 text-[#024ddf] mr-2 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 pl-6 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};
