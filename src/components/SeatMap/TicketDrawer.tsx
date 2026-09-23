import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  ShieldCheck, 
  Tag, 
  ChevronRight, 
  Sparkles, 
  HelpCircle,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { EventItem, SeatZone, SelectedTicketGroup } from '../../types';

interface TicketDrawerProps {
  event: EventItem;
  selectedZone: SeatZone | null;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  selectedSeats: string[];
  onProceedToCheckout: (ticketGroup: SelectedTicketGroup) => void;
  onClose?: () => void;
  availableZones?: SeatZone[];
  onSelectZone?: (zone: SeatZone) => void;
}

export const TicketDrawer: React.FC<TicketDrawerProps> = ({
  event,
  selectedZone,
  quantity,
  onQuantityChange,
  selectedSeats,
  onProceedToCheckout,
  availableZones,
  onSelectZone
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [showAllInPricing, setShowAllInPricing] = useState(true);

  // Price calculations
  const unitPrice = selectedZone ? selectedZone.price : event.pricing.min_price;
  const subtotalBase = unitPrice * quantity;
  const discountAmount = subtotalBase * appliedDiscount;
  const discountedSubtotal = subtotalBase - discountAmount;
  
  // Standard Ticketmaster transparent fee breakdown
  const serviceFeePerTicket = Math.round(unitPrice * 0.15 * 100) / 100;
  const totalServiceFees = serviceFeePerTicket * quantity;
  const facilityChargePerTicket = 6.00;
  const totalFacilityCharges = facilityChargePerTicket * quantity;
  const orderProcessingFee = 4.50;
  const estimatedTaxes = Math.round((discountedSubtotal + totalServiceFees) * 0.065 * 100) / 100;
  
  const grandTotal = discountedSubtotal + totalServiceFees + totalFacilityCharges + orderProcessingFee + estimatedTaxes;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'FANFIRST') {
      setAppliedDiscount(0.15); // 15% off
      setPromoSuccess('15% Fan First Presale discount applied!');
    } else if (cleanCode === 'VIP2026') {
      setAppliedDiscount(0.20); // 20% off
      setPromoSuccess('20% VIP Pass discount applied!');
    } else if (cleanCode === '') {
      setPromoError('Please enter a valid code');
    } else {
      setPromoError('Invalid presale or promo code. Try "FANFIRST"');
    }
  };

  const handleCheckoutClick = () => {
    const group: SelectedTicketGroup = {
      zoneId: selectedZone ? selectedZone.id : 'general',
      zoneName: selectedZone ? selectedZone.name : 'Standard Entry',
      section: selectedZone ? selectedZone.code : 'GA',
      row: 'F',
      quantity,
      unitPrice,
      serviceFee: totalServiceFees,
      facilityFee: totalFacilityCharges,
      processingFee: orderProcessingFee,
      selectedSeats: selectedSeats.length ? selectedSeats : [`Sec ${selectedZone?.code || 'GA'} Row F Seat 1-${quantity}`]
    };
    onProceedToCheckout(group);
  };

  return (
    <div 
      id="ticket-selection-drawer"
      className="bg-white rounded-2xl border border-gray-200 shadow-xl p-4 sm:p-6 flex flex-col justify-between space-y-6"
    >
      {/* Drawer Header */}
      <div className="space-y-3 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <span className="type-snowdon text-[#024ddf] bg-blue-50 px-2.5 py-1 rounded">
            Ticket Selection
          </span>
          {/* All-in Pricing Switcher */}
          <button
            onClick={() => setShowAllInPricing(!showAllInPricing)}
            className="text-xs font-semibold text-gray-600 hover:text-[#024ddf] flex items-center space-x-1"
            title="Toggle All-in pricing including fees"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showAllInPricing ? 'All-in Pricing: ON' : 'Show Base Only'}</span>
          </button>
        </div>

        <div>
          <h3 className="type-kilimanjaro text-gray-900 font-bold leading-snug">
            {selectedZone ? selectedZone.name : 'Select a Seating Zone'}
          </h3>
          <p className="type-etna text-gray-500 mt-1">
            {selectedZone ? selectedZone.description : 'Click any section on the map to configure your seats and pricing.'}
          </p>
        </div>

        {/* Real-time Zone & Price Switcher if availableZones passed */}
        {availableZones && availableZones.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
              Available Sections & Prices
            </span>
            <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {availableZones.map((zone) => {
                const isSelected = selectedZone?.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => onSelectZone && onSelectZone(zone)}
                    className={`text-left p-2 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected 
                        ? 'border-[#024ddf] bg-blue-50/70 shadow-xs' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: zone.color }}
                      />
                      <div className="truncate">
                        <span className="text-xs font-bold text-gray-900 block truncate">
                          {zone.name}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {zone.availableCount} seats left &bull; Row {zone.rowRange}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <span className="text-xs font-black text-[#024ddf]">
                        ${showAllInPricing ? zone.priceWithFees : zone.basePrice}
                      </span>
                      {showAllInPricing && (
                        <span className="text-[9px] text-gray-400 block">incl. fees</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Zone Perks */}
        {selectedZone?.perks && selectedZone.perks.length > 0 && (
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5">
            <span className="type-snowdon text-amber-900 block mb-1 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Included Perks:</span>
            </span>
            <ul className="text-xs text-amber-900 space-y-0.5 pl-4 list-disc">
              {selectedZone.perks.map((perk, i) => (
                <li key={i}>{perk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Ticket Quantity Selector */}
      <div className="space-y-2">
        <label className="type-snowdon text-gray-700 block">
          Number of Tickets
        </label>
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
          <div>
            <span className="text-sm font-bold text-gray-900 block">
              {quantity} {quantity === 1 ? 'Ticket' : 'Tickets'}
            </span>
            <span className="text-xs text-gray-500">
              ${unitPrice} each {showAllInPricing ? '(fees itemized below)' : ''}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="ticket-qty-minus-btn"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease ticket quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-black text-gray-900">
              {quantity}
            </span>
            <button
              id="ticket-qty-plus-btn"
              onClick={() => onQuantityChange(Math.min(8, quantity + 1))}
              disabled={quantity >= 8}
              className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase ticket quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Selected Seats Tag Chips */}
      {selectedSeats.length > 0 && (
        <div className="space-y-1.5">
          <label className="type-snowdon text-gray-700 block">
            Selected Specific Seats ({selectedSeats.length})
          </label>
          <div className="flex flex-wrap gap-1.5">
            {selectedSeats.map((seat) => (
              <span
                key={seat}
                className="bg-[#024ddf] text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center space-x-1"
              >
                <CheckCircle2 className="w-3 h-3 text-[#ffb932]" />
                <span>{seat}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Presale & Promo Code Form */}
      <div className="space-y-2 pt-1">
        <label className="type-snowdon text-gray-700 block flex items-center space-x-1">
          <Tag className="w-3.5 h-3.5 text-[#024ddf]" />
          <span>Presale Code / Promo Code</span>
        </label>
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <input
            id="promo-code-input"
            type="text"
            placeholder="Try code: FANFIRST"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 uppercase placeholder:normal-case placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#024ddf]"
          />
          <button
            type="submit"
            className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
          >
            Apply
          </button>
        </form>
        {promoSuccess && (
          <p className="text-xs text-green-600 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{promoSuccess}</span>
          </p>
        )}
        {promoError && (
          <p className="text-xs text-red-600 font-semibold flex items-center space-x-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{promoError}</span>
          </p>
        )}
      </div>

      {/* Itemized Price & Fee Calculation */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2 text-xs text-gray-600">
        <div className="flex justify-between font-medium">
          <span>Tickets ({quantity}x ${unitPrice.toFixed(2)})</span>
          <span className="font-bold text-gray-900">${subtotalBase.toFixed(2)}</span>
        </div>

        {appliedDiscount > 0 && (
          <div className="flex justify-between text-green-600 font-bold">
            <span>Special Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="flex items-center space-x-1">
            <span>Service Fee (${serviceFeePerTicket.toFixed(2)}/ea)</span>
            <HelpCircle className="w-3 h-3 text-gray-400" title="Includes venue maintenance and customer support" />
          </span>
          <span>${totalServiceFees.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Facility Charge (${facilityChargePerTicket.toFixed(2)}/ea)</span>
          <span>${totalFacilityCharges.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Order Processing Fee</span>
          <span>${orderProcessingFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Taxes (State & Local)</span>
          <span>${estimatedTaxes.toFixed(2)}</span>
        </div>

        {/* Grand Total */}
        <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between text-gray-900">
          <div>
            <span className="type-blanc font-bold block">Grand Total</span>
            <span className="text-[10px] text-gray-400">All fees and taxes included</span>
          </div>
          <span className="type-kilimanjaro font-black text-[#024ddf]">
            ${grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout Action Button & Trust Guarantee */}
      <div className="space-y-3 pt-2">
        <button
          id="drawer-checkout-cta-btn"
          onClick={handleCheckoutClick}
          className="w-full bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white type-fiji font-bold py-3.5 px-6 rounded-xl flex items-center justify-between shadow-lg transition-transform active:scale-98"
        >
          <span>Continue to Checkout</span>
          <div className="flex items-center space-x-1.5">
            <span>${grandTotal.toFixed(2)}</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>

        {/* 100% Buyer Guarantee Badge */}
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 pt-1">
          <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
          <span>100% Buyer Guarantee &bull; Verified Authentic Tickets</span>
        </div>
      </div>

    </div>
  );
};
