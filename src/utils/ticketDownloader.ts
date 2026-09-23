import { jsPDF } from 'jspdf';
import { PurchasedTicket } from '../types';
import { getTicketmasterLogoDataUrl, TICKETMASTER_SVG_PATH } from '../components/Common/TicketmasterLogo';

/**
 * Draw authentic Code 128 / SafeTix style barcode bars using vector rectangles
 */
function drawBarcode(doc: jsPDF, x: number, y: number, width: number, height: number, seed: string) {
  // Pattern of bar widths derived deterministically from barcode seed
  const barPattern: number[] = [];
  let numSeed = 0;
  for (let i = 0; i < seed.length; i++) {
    numSeed = (numSeed * 31 + seed.charCodeAt(i)) % 100000;
  }
  
  const baseSequence = [2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3, 2, 1, 2, 4, 1, 3, 1, 2, 2, 1, 3, 1, 4, 2, 1, 2, 3, 1, 1, 3, 2, 4, 1];
  for (let i = 0; i < 65; i++) {
    const val = baseSequence[(i + numSeed) % baseSequence.length];
    barPattern.push(val);
  }

  const totalUnits = barPattern.reduce((acc, curr) => acc + curr, 0);
  const unitWidth = width / totalUnits;

  doc.setFillColor(18, 18, 18);
  let curX = x;
  barPattern.forEach((w, idx) => {
    const barW = w * unitWidth;
    if (idx % 2 === 0) {
      doc.rect(curX, y, barW, height, 'F');
    }
    curX += barW;
  });
}

/**
 * Generate a single page for a purchased ticket in jsPDF document
 */
function renderTicketPage(doc: jsPDF, ticket: PurchasedTicket, isNewPage = false) {
  if (isNewPage) {
    doc.addPage();
  }

  const pageWidth = 210; // A4 standard width (mm)

  // Background subtle fill
  doc.setFillColor(247, 248, 250);
  doc.rect(0, 0, pageWidth, 297, 'F');

  // Top Ticketmaster Brand Bar (#024DDF)
  doc.setFillColor(2, 77, 223);
  doc.rect(0, 0, pageWidth, 32, 'F');

  // Gold accent line (#FFB932)
  doc.setFillColor(255, 185, 50);
  doc.rect(0, 32, pageWidth, 2.5, 'F');

  // Authentic Ticketmaster Brand Logo (matching homepage brand style)
  const whiteLogoDataUrl = getTicketmasterLogoDataUrl('#ffffff', 8);
  if (whiteLogoDataUrl) {
    try {
      doc.addImage(whiteLogoDataUrl, 'PNG', 18, 10, 48, 8.53);
    } catch {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text('ticketmaster', 18, 21);
    }
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('ticketmaster', 18, 21);
  }

  // SafeTix Verified Pill
  doc.setFillColor(18, 18, 18);
  doc.roundedRect(pageWidth - 68, 11, 50, 12, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('VERIFIED SAFETIX', pageWidth - 65, 19);

  // Main Ticket Container Card (White with clean shadow border)
  const cardX = 15;
  const cardY = 44;
  const cardW = 180;
  const cardH = 236;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(218, 222, 229);
  doc.setLineWidth(0.6);
  doc.roundedRect(cardX, cardY, cardW, cardH, 6, 6, 'FD');

  // Event Category & Tour Badge
  doc.setFillColor(2, 77, 223);
  doc.roundedRect(cardX + 12, cardY + 12, 32, 6, 1.5, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.event.identity.category.toUpperCase(), cardX + 15, cardY + 16.5);

  doc.setTextColor(110, 118, 130);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Official Verified Mobile Pass • Order #${ticket.orderId}`, cardX + 48, cardY + 16.5);

  // Event Title (Wrapped if long)
  doc.setTextColor(18, 18, 18);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  const splitTitle = doc.splitTextToSize(ticket.event.identity.event_title, cardW - 24);
  doc.text(splitTitle, cardX + 12, cardY + 28);
  const titleOffset = (splitTitle.length - 1) * 7;

  // Main Performer / Lineup
  doc.setTextColor(2, 77, 223);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.event.identity.main_performer, cardX + 12, cardY + 37 + titleOffset);

  // Divider line
  doc.setDrawColor(235, 238, 242);
  doc.setLineWidth(0.5);
  doc.line(cardX + 12, cardY + 43 + titleOffset, cardX + cardW - 12, cardY + 43 + titleOffset);

  // Date, Time & Venue Grid (2 Columns)
  const infoY = cardY + 52 + titleOffset;

  // Left Column: Date & Doors
  doc.setTextColor(110, 118, 130);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('DATE & TIME', cardX + 12, infoY);

  doc.setTextColor(18, 18, 18);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.event.date_time.full_date_display, cardX + 12, infoY + 6);

  doc.setTextColor(110, 118, 130);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Doors open: ${ticket.event.date_time.doors_time} PM • Time Zone: ${ticket.event.date_time.time_zone}`, cardX + 12, infoY + 11);

  // Right Column: Venue & Location
  doc.setTextColor(110, 118, 130);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('VENUE & LOCATION', cardX + 100, infoY);

  doc.setTextColor(18, 18, 18);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.event.location.venue_name, cardX + 100, infoY + 6);

  doc.setTextColor(110, 118, 130);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`${ticket.event.location.city}, ${ticket.event.location.state} • ${ticket.event.location.full_address}`, cardX + 100, infoY + 11);

  // SEATING MATRIX BADGE (Dark high-contrast banner with Gold accents)
  const seatY = cardY + 75 + titleOffset;
  doc.setFillColor(18, 18, 18);
  doc.roundedRect(cardX + 12, seatY, cardW - 24, 38, 4, 4, 'F');

  // 4 Columns: Section, Row, Seat, Gate/Entry
  const colW = (cardW - 24) / 4;

  // Section
  doc.setTextColor(160, 168, 180);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION', cardX + 12 + colW * 0.5, seatY + 12, { align: 'center' });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.section, cardX + 12 + colW * 0.5, seatY + 24, { align: 'center' });

  // Row
  doc.setTextColor(160, 168, 180);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('ROW', cardX + 12 + colW * 1.5, seatY + 12, { align: 'center' });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.row, cardX + 12 + colW * 1.5, seatY + 24, { align: 'center' });

  // Seat
  doc.setTextColor(160, 168, 180);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('SEAT', cardX + 12 + colW * 2.5, seatY + 12, { align: 'center' });
  doc.setTextColor(255, 185, 50); // Gold
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const seatNumOnly = ticket.seatNumber.includes('Seat') ? ticket.seatNumber.split('Seat')[1].trim() : ticket.seatNumber;
  doc.text(seatNumOnly, cardX + 12 + colW * 2.5, seatY + 24, { align: 'center' });

  // Tier / Gate
  doc.setTextColor(160, 168, 180);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('ENTRY GATE', cardX + 12 + colW * 3.5, seatY + 12, { align: 'center' });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(ticket.gate || 'Gate 1 / Main', cardX + 12 + colW * 3.5, seatY + 23, { align: 'center' });

  // Zone Name Tag
  doc.setTextColor(2, 77, 223);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`Zone: ${ticket.zoneName}`, cardX + 16, seatY + 34);

  // TICKETMASTER SAFETIX BARCODE AREA
  const barcodeY = seatY + 46;
  doc.setFillColor(247, 249, 252);
  doc.setDrawColor(220, 224, 230);
  doc.setLineWidth(0.5);
  doc.roundedRect(cardX + 12, barcodeY, cardW - 24, 52, 4, 4, 'FD');

  // Barcode Header with Authentic Ticketmaster Brand Logo
  const blueLogoDataUrl = getTicketmasterLogoDataUrl('#024ddf', 8);
  const cardCenterX = cardX + 12 + (cardW - 24) / 2;
  if (blueLogoDataUrl) {
    try {
      // Vector logo 24mm wide x 4.26mm high (proportional 135:24)
      doc.addImage(blueLogoDataUrl, 'PNG', cardCenterX - 45, barcodeY + 4, 24, 4.26);
      doc.setTextColor(2, 77, 223);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.text('SAFETIX™ • TURNSTILE SCANNER CODE', cardCenterX - 18, barcodeY + 7.5);
    } catch {
      doc.setTextColor(2, 77, 223);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('TICKETMASTER SAFETIX™ • TURNSTILE SCANNER CODE', cardCenterX, barcodeY + 8, { align: 'center' });
    }
  } else {
    doc.setTextColor(2, 77, 223);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('TICKETMASTER SAFETIX™ • TURNSTILE SCANNER CODE', cardCenterX, barcodeY + 8, { align: 'center' });
  }

  // Render authentic barcode bars
  drawBarcode(doc, cardX + 24, barcodeY + 12, cardW - 48, 22, ticket.barcode);

  // Barcode Digits
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9.5);
  doc.setFont('courier', 'bold');
  const spacedBarcode = ticket.barcode.replace(/(\d{4})/g, '$1 ').trim();
  doc.text(spacedBarcode, cardX + 12 + (cardW - 24) / 2, barcodeY + 40, { align: 'center' });

  // Security line
  doc.setTextColor(0, 135, 90); // Green
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('✔ Verified Authentic SafeTix Barcode • Valid for Venue Entry', cardX + 12 + (cardW - 24) / 2, barcodeY + 46, { align: 'center' });

  // ATTENDEE & PRICING FOOTER (Inside Card)
  const orderFooterY = barcodeY + 58;

  doc.setTextColor(110, 118, 130);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Ticket ID: ${ticket.ticketId}`, cardX + 14, orderFooterY);
  doc.text(`Purchaser: ${ticket.attendeeName} (${ticket.attendeeEmail})`, cardX + 14, orderFooterY + 5);
  doc.text(`Purchased On: ${ticket.purchaseDate}`, cardX + 14, orderFooterY + 10);

  doc.setFont('helvetica', 'bold');
  doc.text(`Face Value: $${ticket.price.toFixed(2)}`, cardX + 115, orderFooterY);
  doc.setTextColor(2, 77, 223);
  doc.text(`Total Paid: $${ticket.totalPaid.toFixed(2)}`, cardX + 115, orderFooterY + 5);
  doc.setTextColor(110, 118, 130);
  doc.setFont('helvetica', 'normal');
  doc.text('Status: Active & Confirmed', cardX + 115, orderFooterY + 10);

  // IMPORTANT ENTRY POLICIES (Bottom of page)
  const policyY = cardY + cardH + 7;
  doc.setTextColor(130, 138, 150);
  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'normal');
  doc.text('IMPORTANT EVENT INSTRUCTIONS & POLICIES:', cardX, policyY);
  doc.text('• Please have this mobile pass or printed e-ticket ready before approaching the venue turnstiles. Turn screen brightness to max.', cardX, policyY + 4);
  doc.text('• Clear Bag Policy: Venue strictly enforces clear vinyl, PVC, or plastic bags no larger than 12" x 6" x 12".', cardX, policyY + 7.5);
  doc.text('• Re-entry is strictly prohibited. No outside food, drinks, professional cameras, or recording equipment.', cardX, policyY + 11);
  doc.text('• Powered by Ticketmaster SafeTix Technology. All sales are subject to Ticketmaster Purchase Policy.', cardX, policyY + 14.5);
}

/**
 * Downloads a single purchased ticket as an authentic Ticketmaster PDF
 */
export function downloadTicketPDF(ticket: PurchasedTicket): void {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    renderTicketPage(doc, ticket, false);

    const safeTitle = ticket.event.identity.event_title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 25);
    const fileName = `Ticketmaster_eTicket_${ticket.orderId}_${safeTitle}_${ticket.ticketId}.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error('Failed to generate ticket PDF:', error);
    alert('Unable to download PDF. Please try opening the printable version.');
  }
}

/**
 * Downloads all purchased tickets in an order as a combined multi-page PDF
 */
export function downloadAllTicketsPDF(tickets: PurchasedTicket[]): void {
  if (!tickets.length) return;

  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    tickets.forEach((ticket, index) => {
      renderTicketPage(doc, ticket, index > 0);
    });

    const orderId = tickets[0].orderId;
    const safeTitle = tickets[0].event.identity.event_title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 25);
    const fileName = `Ticketmaster_All_Tickets_${orderId}_${safeTitle}.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error('Failed to generate multi-ticket PDF:', error);
    alert('Unable to download all tickets PDF. Please try downloading tickets individually.');
  }
}

/**
 * Triggers standard browser print for the ticket with formatted Ticketmaster printable layout
 */
export function printTicket(ticket: PurchasedTicket): void {
  const printWindow = window.open('', '_blank', 'width=850,height=950');
  if (!printWindow) {
    alert('Please allow popups to open the printable ticket.');
    return;
  }

  const printContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Ticketmaster e-Ticket • ${ticket.orderId}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #fff; color: #121212; padding: 24px; }
        .ticket-wrapper { max-width: 680px; margin: 0 auto; border: 2px solid #024ddf; border-radius: 16px; overflow: hidden; }
        .header { background: #024ddf; color: #fff; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; }
        .logo { display: flex; align-items: center; }
        .logo svg { height: 26px; width: auto; }
        .safetix-tag { background: #121212; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; }
        .content { padding: 24px; }
        .event-badge { display: inline-block; background: #024ddf; color: #fff; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px; }
        .event-title { font-size: 24px; font-weight: 900; line-height: 1.2; margin-bottom: 4px; }
        .performer { font-size: 16px; font-weight: 700; color: #024ddf; margin-bottom: 16px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 16px 0; border-top: 1px solid #ebebeb; border-bottom: 1px solid #ebebeb; }
        .info-label { font-size: 11px; font-weight: bold; color: #6b7280; text-transform: uppercase; margin-bottom: 2px; }
        .info-val { font-size: 14px; font-weight: 700; }
        .seating-banner { background: #121212; color: #fff; border-radius: 12px; padding: 16px; display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; margin: 20px 0; }
        .seat-label { font-size: 10px; font-weight: bold; color: #9ca3af; text-transform: uppercase; margin-bottom: 4px; }
        .seat-val { font-size: 20px; font-weight: 900; }
        .seat-gold { color: #ffb932; }
        .barcode-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0; }
        .barcode-bars { height: 60px; display: flex; align-items: center; justify-content: center; gap: 2px; margin: 12px 0; }
        .bar { background: #111827; height: 100%; border-radius: 1px; }
        .barcode-num { font-family: monospace; font-size: 14px; font-weight: bold; letter-spacing: 3px; }
        .footer-details { font-size: 12px; color: #6b7280; line-height: 1.6; border-top: 1px dashed #d1d5db; padding-top: 16px; }
        @media print {
          body { padding: 0; }
          .ticket-wrapper { border: 1px solid #111; }
        }
      </style>
    </head>
    <body>
      <div class="ticket-wrapper">
        <div class="header">
          <div class="logo" aria-label="Ticketmaster">
            <svg viewBox="0 0 135 24" fill="#ffffff" style="height: 26px; width: auto; display: block;">
              <path d="${TICKETMASTER_SVG_PATH}"></path>
            </svg>
          </div>
          <div class="safetix-tag">Verified SafeTix™ Pass</div>
        </div>
        <div class="content">
          <span class="event-badge">${ticket.event.identity.category}</span>
          <h1 class="event-title">${ticket.event.identity.event_title}</h1>
          <div class="performer">${ticket.event.identity.main_performer}</div>

          <div class="info-grid">
            <div>
              <div class="info-label">Date & Time</div>
              <div class="info-val">${ticket.event.date_time.full_date_display}</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Doors: ${ticket.event.date_time.doors_time} PM (${ticket.event.date_time.time_zone})</div>
            </div>
            <div>
              <div class="info-label">Venue & Location</div>
              <div class="info-val">${ticket.event.location.venue_name}</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">${ticket.event.location.city}, ${ticket.event.location.state}</div>
            </div>
          </div>

          <div class="seating-banner">
            <div>
              <div class="seat-label">Section</div>
              <div class="seat-val">${ticket.section}</div>
            </div>
            <div>
              <div class="seat-label">Row</div>
              <div class="seat-val">${ticket.row}</div>
            </div>
            <div>
              <div class="seat-label">Seat</div>
              <div class="seat-val seat-gold">${ticket.seatNumber.includes('Seat') ? ticket.seatNumber.split('Seat')[1].trim() : ticket.seatNumber}</div>
            </div>
            <div>
              <div class="seat-label">Gate</div>
              <div class="seat-val" style="font-size: 14px; margin-top: 4px;">${ticket.gate || 'Main Gate'}</div>
            </div>
          </div>

          <div class="barcode-card">
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 6px;">
              <svg viewBox="0 0 135 24" fill="#024ddf" style="height: 15px; width: auto; display: inline-block; vertical-align: middle;">
                <path d="${TICKETMASTER_SVG_PATH}"></path>
              </svg>
              <span style="font-size: 11px; font-weight: 800; color: #024ddf; text-transform: uppercase; letter-spacing: 0.5px;">SAFETIX™ BARCODE</span>
            </div>
            <div class="barcode-bars">
              ${[3, 1, 4, 2, 5, 2, 1, 4, 3, 2, 6, 2, 1, 4, 3, 2, 5, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4, 2, 3, 1, 5, 2, 4].map(w => `<div class="bar" style="width: ${w * 2.5}px;"></div>`).join('')}
            </div>
            <div class="barcode-num">${ticket.barcode}</div>
            <div style="font-size: 11px; color: #059669; font-weight: bold; margin-top: 6px;">✔ Valid for Official Venue Turnstile Entry</div>
          </div>

          <div class="footer-details">
            <div><strong>Order ID:</strong> ${ticket.orderId} • <strong>Ticket ID:</strong> ${ticket.ticketId}</div>
            <div><strong>Attendee:</strong> ${ticket.attendeeName} (${ticket.attendeeEmail})</div>
            <div><strong>Purchase Date:</strong> ${ticket.purchaseDate} • <strong>Total Paid:</strong> $${ticket.totalPaid.toFixed(2)}</div>
            <div style="margin-top: 8px; font-size: 10px; color: #9ca3af;">
              Clear Bag Policy strictly enforced. Re-entry is prohibited. Powered by Ticketmaster SafeTix Technology.
            </div>
          </div>
        </div>
      </div>
      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(printContent);
  printWindow.document.close();
}
