import React, { useState } from 'react';
import { X, CheckCircle, MessageSquare, Star } from 'lucide-react';

export const FeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [category, setCategory] = useState('Ticketing Experience');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setRating(null);
      setComments('');
    }, 2500);
  };

  return (
    <>
      {/* Floating Trigger Button on bottom-right */}
      <div className="fixed bottom-4 right-6 z-40">
        <button
          type="button"
          id="tm-floating-feedback-btn"
          onClick={() => setIsOpen(true)}
          className="bg-[#121212] hover:bg-[#222222] active:bg-[#000000] text-white px-3.5 py-2 rounded-full shadow-2xl border border-gray-700 flex items-center space-x-2 text-xs font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Provide Website Feedback"
        >
          {/* Ticketmaster italicized signature 't' icon */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="shrink-0"
          >
            <path 
              d="M10.736 15.86c0-.522.08-.993.159-1.307l1.286-5.88h3.154l.554-2.562h-3.155l.87-4-3.785 1.23-.606 2.77H6.667l-.556 2.561h2.552l-.998 4.55c-.237 1.07-.45 2.09-.45 3.135 0 2.59 1.682 3.532 4.073 3.532.607 0 1.288-.186 1.895-.316l.604-2.72a4.716 4.716 0 0 1-1.71.314c-.789 0-1.34-.496-1.34-1.307z" 
              fill="#ffffff" 
            />
          </svg>
          <span>Feedback</span>
        </button>
      </div>

      {/* Feedback Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-dialog-title"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">Thank You!</h3>
                <p className="text-xs text-gray-600 max-w-xs mx-auto">
                  Your feedback helps us continuously improve the Ticketmaster ticketing and event discovery experience.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 bg-[#024ddf] text-white rounded-full flex items-center justify-center font-black italic text-xs">
                    t
                  </div>
                  <div>
                    <h3 id="feedback-dialog-title" className="text-base font-extrabold text-gray-900 leading-tight">
                      Share Your Experience
                    </h3>
                    <p className="text-xs text-gray-500">Ticketmaster Fan Feedback</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    How was your experience today?
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          rating && rating >= star
                            ? 'bg-amber-50 border-amber-300 text-amber-500'
                            : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${rating && rating >= star ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                    {rating && (
                      <span className="text-xs font-bold text-gray-700 ml-2">
                        {rating === 5 ? 'Excellent' : rating === 4 ? 'Very Good' : rating === 3 ? 'Average' : 'Could be better'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Feedback Topic Category */}
                <div>
                  <label htmlFor="feedback-category-select" className="block text-xs font-bold text-gray-700 mb-1">
                    What are you providing feedback on?
                  </label>
                  <select
                    id="feedback-category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#024ddf] outline-none"
                  >
                    <option value="Ticketing Experience">Ticketing Experience & Seat Selection</option>
                    <option value="Search & Discovery">Search, Omnibox & Filters</option>
                    <option value="Pricing & Fees">Pricing Transparency & All-In Fees</option>
                    <option value="Mobile App & SafeTix">Mobile Passes & Transfer</option>
                    <option value="General Suggestion">General Suggestion / Other</option>
                  </select>
                </div>

                {/* Comments text */}
                <div>
                  <label htmlFor="feedback-comments-input" className="block text-xs font-bold text-gray-700 mb-1">
                    Tell us more (optional)
                  </label>
                  <textarea
                    id="feedback-comments-input"
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="What did you like, or what can we improve?"
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#024ddf] outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3.5 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#024ddf] hover:bg-[#0139a7] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-xs"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
