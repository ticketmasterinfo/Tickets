import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  CheckCircle2, 
  Users, 
  Sparkles,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { EventItem, SeatZone, SeatUnit } from '../../types';
import { SEAT_ZONES_PRESETS } from '../../data/eventsData';

interface InteractiveSeatMapProps {
  event: EventItem;
  selectedZone: SeatZone | null;
  onSelectZone: (zone: SeatZone) => void;
  selectedSeats: string[];
  onToggleSeat: (seatId: string, seatPrice: number) => void;
  ticketQuantity: number;
}

export const InteractiveSeatMap: React.FC<InteractiveSeatMapProps> = ({
  event,
  selectedZone,
  onSelectZone,
  selectedSeats,
  onToggleSeat,
  ticketQuantity
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredZone, setHoveredZone] = useState<SeatZone | null>(null);
  const [isSectionDetailedView, setIsSectionDetailedView] = useState(false);

  const zones = SEAT_ZONES_PRESETS.default;

  // Generate dynamic seat grid for selected section
  const generateSeatsForSection = (zone: SeatZone): SeatUnit[] => {
    const seats: SeatUnit[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 10;
    
    rows.forEach((row, rIdx) => {
      for (let s = 1; s <= seatsPerRow; s++) {
        const id = `${zone.code}-${row}${s}`;
        // Deterministic pseudo-sold pattern
        const isSold = (rIdx * 10 + s) % 4 === 1 || (rIdx === 0 && s > 7);
        const isSelected = selectedSeats.includes(id);
        
        seats.push({
          id,
          zoneId: zone.id,
          section: zone.code,
          row,
          number: s,
          status: isSelected ? 'selected' : isSold ? 'reserved' : 'available',
          price: zone.price,
          x: 40 + s * 34,
          y: 60 + rIdx * 34
        });
      }
    });
    return seats;
  };

  const handleZoneClick = (zone: SeatZone) => {
    onSelectZone(zone);
    setIsSectionDetailedView(true);
    setZoomLevel(1.3);
  };

  return (
    <div className="relative bg-[#1a1a1a] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl p-4 md:p-6 text-white min-h-[560px] flex flex-col justify-between">
      
      {/* Top Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 z-20 pb-3 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#024ddf] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Interactive 3D Seating
            </span>
            <span className="text-xs text-gray-400">
              {event.location.venue_name}
            </span>
          </div>
          <h3 className="type-blanc font-bold text-white mt-1">
            {isSectionDetailedView && selectedZone ? `${selectedZone.name} (${selectedZone.code})` : 'Select a Seating Section on the Map'}
          </h3>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center space-x-2">
          {isSectionDetailedView && (
            <button
              onClick={() => {
                setIsSectionDetailedView(false);
                setZoomLevel(1);
              }}
              className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 border border-gray-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Full Arena View</span>
            </button>
          )}

          <div className="flex items-center bg-gray-900 rounded-lg p-1 border border-gray-800">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
              className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold text-gray-400 px-2">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setIsSectionDetailedView(false);
              }}
              className="p-1.5 hover:bg-gray-800 rounded text-gray-300 hover:text-white ml-1 border-l border-gray-800"
              aria-label="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden py-4 my-2">
        <div 
          className="transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {!isSectionDetailedView ? (
            /* FULL VENUE SVG SEATING DIAGRAM */
            <svg 
              viewBox="0 0 600 520" 
              className="w-full max-w-[560px] h-auto select-none drop-shadow-xl"
            >
              <defs>
                {/* Stage Lighting Gradient */}
                <linearGradient id="stageGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#024ddf" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffb932" stopOpacity="0.2" />
                </linearGradient>
                <radialGradient id="arenaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Arena Floor Glow */}
              <circle cx="300" cy="270" r="230" fill="url(#arenaGlow)" />
              
              {/* Outer Arena Boundary */}
              <ellipse cx="300" cy="280" rx="260" ry="210" fill="#222222" stroke="#333333" strokeWidth="3" />
              <ellipse cx="300" cy="280" rx="210" ry="170" fill="#181818" stroke="#2a2a2a" strokeWidth="2" />

              {/* MAIN STAGE (Proscenium & In-The-Round) */}
              <g id="venue-stage" className="cursor-default">
                <rect 
                  x="200" 
                  y="45" 
                  width="200" 
                  height="65" 
                  rx="10" 
                  fill="#000000" 
                  stroke="#ffb932" 
                  strokeWidth="2.5" 
                />
                <text 
                  x="300" 
                  y="82" 
                  fill="#ffb932" 
                  fontSize="15" 
                  fontWeight="900" 
                  letterSpacing="4" 
                  textAnchor="middle"
                >
                  STAGE
                </text>
                <line x1="210" y1="95" x2="390" y2="95" stroke="#ffb932" strokeWidth="2" strokeDasharray="4 4" />
              </g>

              {/* VIP ZONE (Closest to Stage) */}
              <g 
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleZoneClick(zones[0])}
                onMouseEnter={() => setHoveredZone(zones[0])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <path
                  d="M 210,120 L 390,120 L 375,175 L 225,175 Z"
                  fill={selectedZone?.id === zones[0].id ? '#ffb932' : hoveredZone?.id === zones[0].id ? '#f59e0b' : '#ffb932'}
                  fillOpacity={selectedZone?.id === zones[0].id ? 0.95 : 0.75}
                  stroke="#ffffff"
                  strokeWidth={selectedZone?.id === zones[0].id ? 2.5 : 1}
                  className="transition-all hover:opacity-100"
                />
                <text x="300" y="152" fill="#121212" fontSize="12" fontWeight="800" textAnchor="middle">
                  VIP FRONT ROW ($495)
                </text>
              </g>

              {/* GA FLOOR PIT */}
              <g 
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleZoneClick(zones[1])}
                onMouseEnter={() => setHoveredZone(zones[1])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <rect
                  x="220"
                  y="190"
                  width="160"
                  height="75"
                  rx="6"
                  fill={selectedZone?.id === zones[1].id ? '#024ddf' : hoveredZone?.id === zones[1].id ? '#0139a7' : '#2563eb'}
                  fillOpacity={selectedZone?.id === zones[1].id ? 0.95 : 0.7}
                  stroke="#ffffff"
                  strokeWidth={selectedZone?.id === zones[1].id ? 2.5 : 1}
                />
                <text x="300" y="232" fill="#ffffff" fontSize="12" fontWeight="800" textAnchor="middle">
                  GA FLOOR PIT ($245)
                </text>
              </g>

              {/* LOWER BOWL SECTIONS 101 - 104 (LEFT) */}
              <g 
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleZoneClick(zones[2])}
                onMouseEnter={() => setHoveredZone(zones[2])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <path
                  d="M 110,140 Q 185,160 200,280 L 140,280 Q 120,200 90,160 Z"
                  fill={selectedZone?.id === zones[2].id ? '#00875a' : hoveredZone?.id === zones[2].id ? '#059669' : '#10b981'}
                  fillOpacity={selectedZone?.id === zones[2].id ? 0.95 : 0.7}
                  stroke="#ffffff"
                  strokeWidth={selectedZone?.id === zones[2].id ? 2.5 : 1}
                />
                <text x="145" y="225" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">
                  SEC 101-104
                </text>
              </g>

              {/* LOWER BOWL SECTIONS 105 - 108 (RIGHT) */}
              <g 
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleZoneClick(zones[3])}
                onMouseEnter={() => setHoveredZone(zones[3])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <path
                  d="M 490,140 Q 415,160 400,280 L 460,280 Q 480,200 510,160 Z"
                  fill={selectedZone?.id === zones[3].id ? '#00875a' : hoveredZone?.id === zones[3].id ? '#059669' : '#10b981'}
                  fillOpacity={selectedZone?.id === zones[3].id ? 0.95 : 0.7}
                  stroke="#ffffff"
                  strokeWidth={selectedZone?.id === zones[3].id ? 2.5 : 1}
                />
                <text x="455" y="225" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">
                  SEC 105-108
                </text>
              </g>

              {/* LOWER BOWL CENTER REAR (SEC 110-114) */}
              <g 
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleZoneClick(zones[2])}
                onMouseEnter={() => setHoveredZone(zones[2])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <path
                  d="M 180,290 L 420,290 L 410,340 L 190,340 Z"
                  fill="#00875a"
                  fillOpacity="0.75"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                <text x="300" y="320" fill="#ffffff" fontSize="12" fontWeight="700" textAnchor="middle">
                  LOWER BOWL CENTER ($185)
                </text>
              </g>

              {/* UPPER TIER (SEC 201 - 216) */}
              <g 
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleZoneClick(zones[4])}
                onMouseEnter={() => setHoveredZone(zones[4])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <path
                  d="M 70,180 Q 300,430 530,180 L 550,210 Q 300,470 50,210 Z"
                  fill={selectedZone?.id === zones[4].id ? '#6366f1' : hoveredZone?.id === zones[4].id ? '#4f46e5' : '#4338ca'}
                  fillOpacity={selectedZone?.id === zones[4].id ? 0.95 : 0.7}
                  stroke="#ffffff"
                  strokeWidth={selectedZone?.id === zones[4].id ? 2.5 : 1}
                />
                <text x="300" y="405" fill="#ffffff" fontSize="12" fontWeight="700" textAnchor="middle">
                  UPPER TIER 200-LEVEL ($85)
                </text>
              </g>

              {/* UPPER BALCONY 300 LEVEL */}
              <g 
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleZoneClick(zones[5])}
                onMouseEnter={() => setHoveredZone(zones[5])}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <path
                  d="M 50,230 Q 300,490 550,230 L 565,255 Q 300,515 35,255 Z"
                  fill={selectedZone?.id === zones[5].id ? '#8b5cf6' : hoveredZone?.id === zones[5].id ? '#7c3aed' : '#6d28d9'}
                  fillOpacity={selectedZone?.id === zones[5].id ? 0.95 : 0.7}
                  stroke="#ffffff"
                  strokeWidth={selectedZone?.id === zones[5].id ? 2.5 : 1}
                />
                <text x="300" y="475" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">
                  UPPER BALCONY 300-LEVEL ($55)
                </text>
              </g>

            </svg>
          ) : (
            /* DETAILED SEAT GRID MATRIX */
            <div className="bg-[#121212] p-6 rounded-xl border border-gray-700 shadow-2xl max-w-lg w-full">
              <div className="text-center pb-3 border-b border-gray-800 mb-4">
                <span className="type-snowdon text-[#ffb932] block">STAGE DIRECTION ↑</span>
                <h4 className="type-blanc font-bold text-white mt-1">
                  {selectedZone?.name}
                </h4>
                <p className="text-xs text-gray-400">
                  Click available dots to select your exact seats ({selectedSeats.length} / {ticketQuantity} selected)
                </p>
              </div>

              {/* Seat Matrix */}
              <div className="space-y-2 py-2">
                {['A', 'B', 'C', 'D', 'E'].map((row) => (
                  <div key={row} className="flex items-center justify-center space-x-2">
                    <span className="text-xs font-bold text-gray-500 w-4 text-center">{row}</span>
                    <div className="flex space-x-1.5">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                        const seatId = `${selectedZone?.code || 'SEC'}-${row}${num}`;
                        const isSold = (row === 'A' && num > 7) || (num % 4 === 1);
                        const isSelected = selectedSeats.includes(seatId);

                        return (
                          <button
                            key={num}
                            id={`seat-dot-${seatId}`}
                            disabled={isSold}
                            onClick={() => selectedZone && onToggleSeat(seatId, selectedZone.price)}
                            className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-transform ${
                              isSelected
                                ? 'bg-[#ffb932] text-[#121212] font-black scale-110 ring-2 ring-white shadow-lg'
                                : isSold
                                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                : 'bg-[#024ddf] hover:bg-[#2563eb] text-white hover:scale-110'
                            }`}
                            title={`Row ${row}, Seat ${num} - ${isSold ? 'Sold' : `$${selectedZone?.price}`}`}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xs font-bold text-gray-500 w-4 text-center">{row}</span>
                  </div>
                ))}
              </div>

              {/* Seat Status Legend */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-800 text-xs text-gray-300 mt-4">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#024ddf]"></div>
                  <span>Available (${selectedZone?.price})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ffb932]"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-800 border border-gray-700"></div>
                  <span>Unavailable</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Tooltip Hover Card */}
        {hoveredZone && !isSectionDetailedView && (
          <div className="absolute top-4 right-4 bg-[#1f1f1f] border border-gray-700 rounded-xl p-3.5 shadow-2xl z-30 max-w-xs pointer-events-none animate-in fade-in">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#ffb932]">
                {hoveredZone.tier} Tier
              </span>
              <span className="text-xs bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded">
                {hoveredZone.availableCount} Available
              </span>
            </div>
            <h5 className="type-blanc text-white font-bold mt-1">
              {hoveredZone.name}
            </h5>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {hoveredZone.description}
            </p>
            <div className="mt-2 pt-2 border-t border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-400">Price per ticket:</span>
              <span className="text-base font-black text-white">
                ${hoveredZone.price}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Seating Legend */}
      <div className="pt-3 border-t border-gray-800 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-300">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Tiers:</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ffb932]"></span>
            <span>VIP Front ($495)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#024ddf]"></span>
            <span>Floor Pit ($245)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#00875a]"></span>
            <span>Lower Bowl ($145 - $185)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#6366f1]"></span>
            <span>Upper Tier ($55 - $85)</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-gray-400 text-[11px]">
          <Info className="w-3.5 h-3.5 text-[#024ddf]" />
          <span>Click any zone to select exact seats</span>
        </div>
      </div>

    </div>
  );
};
