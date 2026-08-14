import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Ticket
} from 'lucide-react';
import { EventItem, SelectedTicketGroup, PurchasedTicket } from '../../types';

interface CheckoutModalProps {
  event: EventItem;
  ticketGroup: SelectedTicketGroup;
  onClose: () => void;
  onOrderComplete: (newTickets: PurchasedTicket[]) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  event,
  ticketGroup,
  onClose,
  onOrderComplete
}) => {
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes reservation
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'paypal'>('card');
  const [cardName, setCardName] = useState('Alex Morgan');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4829');
  const [cardExpiry, setCardExpiry] = useState('09/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [attendeeName, setAttendeeName] = useState('Alex Morgan');
  const [attendeeEmail, setAttendeeEmail] = useState('ticketmastersincinfo@gmail.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reservation countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const subtotal = ticketGroup.unitPrice * ticketGroup.quantity;
  const grandTotal = subtotal + ticketGroup.serviceFee + ticketGroup.facilityFee + ticketGroup.processingFee + (subtotal * 0.065);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Generate ticket entries
      const orderId = `TM-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const newTickets: PurchasedTicket[] = [];

      for (let i = 1; i <= ticketGroup.quantity; i++) {
        const ticketId = `TIX-${Math.floor(100000 + Math.random() * 900000)}`;
        const seatNum = ticketGroup.selectedSeats && ticketGroup.selectedSeats[i - 1] 
          ? ticketGroup.selectedSeats[i - 1] 
          : `${ticketGroup.section} • Row ${ticketGroup.row} • Seat ${10 + i}`;

        newTickets.push({
          ticketId,
          orderId,
          event,
          zoneName: ticketGroup.zoneName,
          section: ticketGroup.section,
          row: ticketGroup.row,
          seatNumber: seatNum,
          price: ticketGroup.unitPrice,
          totalPaid: grandTotal / ticketGroup.quantity,
          barcode: `49${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          purchaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          attendeeName,
          attendeeEmail
        });
      }

      setTimeout(() => {
        onOrderComplete(newTickets);
      }, 1200);
    }, 1800);
  };

  return (
    <div 
      id="checkout-modal-backdrop" 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div 
        id="checkout-modal-card"
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Top Header with Timer */}
        <div className="bg-[#121212] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black italic uppercase tracking-tighter text-white">
              ticket<span className="text-[#ffb932]">master</span>
            </span>
            <span className="text-xs text-gray-400 font-semibold border-l border-gray-700 pl-2">
              Secure Checkout
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Timer Badge */}
            <div className="flex items-center space-x-1.5 bg-[#1f1f1f] text-[#ffb932] border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{formattedTime} remaining</span>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-lg"
              aria-label="Close Checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="type-kilimanjaro font-black text-gray-900">
              You&apos;re Going to the Show!
            </h2>
            <p className="type-rainier text-gray-600 max-w-md mx-auto">
              Your order for <strong>{event.identity.event_title}</strong> has been confirmed. Mobile tickets with dynamic SafeTix barcodes have been sent to <strong>{attendeeEmail}</strong>.
            </p>
            <div className="pt-4">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#024ddf] px-4 py-2 rounded-lg font-bold text-sm">
                <Ticket className="w-4 h-4" />
                <span>Loading your verified mobile entry passes...</span>
              </div>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 space-y-6">
            
            {/* Event Summary Card */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center space-x-4">
              <img 
                src={event.identity.image_url} 
                alt={event.identity.event_title}
                className="w-16 h-16 rounded-lg object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-[#024ddf] uppercase">
                  {event.identity.category}
                </span>
                <h4 className="type-blanc font-bold text-gray-900 truncate">
                  {event.identity.event_title}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {event.date_time.full_date_display} &bull; {event.location.venue_name}
                </p>
                <div className="text-xs font-semibold text-gray-700 mt-0.5">
                  {ticketGroup.quantity}x Tickets &bull; {ticketGroup.zoneName}
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-gray-500 block">Total</span>
                <span className="type-kilimanjaro font-black text-[#024ddf]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="space-y-2">
              <label className="type-snowdon text-gray-700 block">
                Delivery Method
              </label>
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-[#024ddf]" />
                  <div>
                    <span className="text-sm font-bold text-gray-900 block">
                      Mobile Entry &bull; Ticketmaster SafeTix
                    </span>
                    <span className="text-xs text-gray-600">
                      Delivered instantly to your smartphone. Barcode refreshes automatically.
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black text-green-700 bg-green-100 px-2 py-0.5 rounded">
                  FREE
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="type-snowdon text-gray-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:ring-2 focus:ring-[#024ddf] outline-none"
                />
              </div>
              <div>
                <label className="type-snowdon text-gray-700 block mb-1">
                  Email Address for Tickets
                </label>
                <input
                  type="email"
                  required
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:ring-2 focus:ring-[#024ddf] outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="type-snowdon text-gray-700 block">
                Payment Option
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-lg border text-center transition-all flex items-center justify-center space-x-1.5 ${
                    paymentMethod === 'card' 
                      ? 'bg-blue-50 border-[#024ddf] text-[#024ddf] font-bold shadow-xs' 
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-semibold">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-2.5 rounded-lg border text-center transition-all flex items-center justify-center space-x-1.5 ${
                    paymentMethod === 'applepay' 
                      ? 'bg-blue-50 border-[#024ddf] text-[#024ddf] font-bold shadow-xs' 
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <span className="text-xs font-bold"> Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-2.5 rounded-lg border text-center transition-all flex items-center justify-center space-x-1.5 ${
                    paymentMethod === 'paypal' 
                      ? 'bg-blue-50 border-[#024ddf] text-[#024ddf] font-bold shadow-xs' 
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <span className="text-xs font-bold text-blue-600">PayPal</span>
                </button>
              </div>

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-600 uppercase block mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#024ddf] outline-none"
                      />
                      <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="text-[11px] font-bold text-gray-600 uppercase block mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#024ddf] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-600 uppercase block mb-1">
                        Expires / CVC
                      </label>
                      <input
                        type="text"
                        value={`${cardExpiry} • ${cardCvc}`}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#024ddf] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Buyer Protection and Trust */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 flex items-center space-x-2.5 text-xs text-gray-600">
              <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
              <span>
                By placing this order, you agree to Ticketmaster&apos;s Purchase Policy. All sales are backed by our 100% Buyer Guarantee.
              </span>
            </div>

            {/* Submit Button */}
            <button
              id="checkout-place-order-btn"
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white type-fiji font-bold py-4 rounded-xl shadow-xl transition-transform active:scale-98 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authorizing & Securing Tickets...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order &bull; ${grandTotal.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
