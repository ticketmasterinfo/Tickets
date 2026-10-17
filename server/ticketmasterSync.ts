import fs from 'fs';
import path from 'path';

// Define event data directory and files
const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events-store.json');
const CONFIG_FILE = path.join(DATA_DIR, 'sync-config.json');
const HISTORY_FILE = path.join(DATA_DIR, 'sync-history.json');

// Types for Ticketmaster Sync Engine
export interface SyncConfig {
  enabled: boolean;
  intervalMinutes: number;
  countryCode: string;
  cities: string[];
  classifications: string[];
  maxPagesPerSync: number;
  pageSize: number;
  markPastEvents: boolean;
  apiKeyOverride?: string;
}

export interface SyncStats {
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  status: 'success' | 'failed' | 'partial' | 'skipped';
  importedCount: number;
  updatedCount: number;
  skippedCount: number;
  failedCount: number;
  totalEventsInDb: number;
  trigger: 'cron' | 'manual' | 'scheduler' | 'initial';
  errorMessage?: string | null;
}

export interface SyncStatusResponse {
  isConfigured: boolean;
  apiKeyMasked: string | null;
  enabled: boolean;
  isSyncing: boolean;
  intervalMinutes: number;
  lastSync: SyncStats | null;
  nextScheduledSync: string | null;
  totalEvents: number;
  config: SyncConfig;
}

const DEFAULT_CONFIG: SyncConfig = {
  enabled: true,
  intervalMinutes: 30,
  countryCode: 'US',
  cities: ['Los Angeles', 'New York', 'Chicago', 'Boston', 'San Francisco', 'Las Vegas', 'Miami', 'Austin'],
  classifications: ['Music', 'Sports', 'Arts & Theatre'],
  maxPagesPerSync: 3,
  pageSize: 20,
  markPastEvents: true
};

// Safe directory creation
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Atomic file writer to prevent corruption during sync
function safeWriteJson(filePath: string, data: any) {
  ensureDataDir();
  const tempPath = `${filePath}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, filePath);
}

// Read JSON with fallback
function safeReadJson<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return fallback;
  }
}

// Sync Config Management
export function getSyncConfig(): SyncConfig {
  return safeReadJson<SyncConfig>(CONFIG_FILE, DEFAULT_CONFIG);
}

export function updateSyncConfig(newConfig: Partial<SyncConfig>): SyncConfig {
  const current = getSyncConfig();
  const updated: SyncConfig = {
    ...current,
    ...newConfig
  };
  safeWriteJson(CONFIG_FILE, updated);
  return updated;
}

// Sync History Management
export function getSyncHistory(): SyncStats[] {
  return safeReadJson<SyncStats[]>(HISTORY_FILE, []);
}

function appendSyncHistory(stats: SyncStats) {
  const history = getSyncHistory();
  // Keep last 50 sync runs
  const updated = [stats, ...history].slice(0, 50);
  safeWriteJson(HISTORY_FILE, updated);
}

// API Key Resolver
export function getTicketmasterApiKey(): string | null {
  const config = getSyncConfig();
  if (config.apiKeyOverride && config.apiKeyOverride.trim() !== '') {
    return config.apiKeyOverride.trim();
  }
  const envKey = process.env.TICKETMASTER_API_KEY;
  if (envKey && envKey.trim() !== '' && !envKey.includes('MY_TICKETMASTER_API_KEY')) {
    return envKey.trim();
  }
  return null;
}

export function maskApiKey(key: string | null): string | null {
  if (!key) return null;
  if (key.length <= 8) return '****';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

// Database Store for Events
export function getStoredEvents(): any[] {
  return safeReadJson<any[]>(EVENTS_FILE, []);
}

export function saveStoredEvents(events: any[]) {
  safeWriteJson(EVENTS_FILE, events);
}

// Seed Database with initial events if empty
export function initEventsDatabase(seedEvents: any[]) {
  ensureDataDir();
  if (!fs.existsSync(EVENTS_FILE)) {
    console.log(`[TM-SYNC] Initializing events database with ${seedEvents.length} initial events.`);
    const initializedEvents = seedEvents.map(e => ({
      ...e,
      sync_metadata: {
        tm_event_id: e.identity?.event_id || `SEED-${Date.now()}`,
        source: 'Initial Database Seed',
        first_imported_at: new Date().toISOString(),
        last_updated_at: new Date().toISOString(),
        last_synced_at: new Date().toISOString(),
        event_status: 'onsale',
        is_manual: true
      }
    }));
    saveStoredEvents(initializedEvents);
  }
}

// Category Mapper: converts TM classification to app categories
function mapClassificationToCategory(classifications?: any[]): 'Concerts' | 'Sports' | 'Arts & Theater' | 'Family' {
  if (!classifications || classifications.length === 0) return 'Concerts';
  const primary = classifications[0];
  const segName = (primary?.segment?.name || '').toLowerCase();
  const genreName = (primary?.genre?.name || '').toLowerCase();

  if (segName.includes('music') || genreName.includes('music') || genreName.includes('rock') || genreName.includes('pop')) {
    return 'Concerts';
  }
  if (segName.includes('sport') || genreName.includes('basketball') || genreName.includes('football') || genreName.includes('soccer')) {
    return 'Sports';
  }
  if (segName.includes('arts') || segName.includes('theatre') || segName.includes('theater') || genreName.includes('comedy') || genreName.includes('broadway')) {
    return 'Arts & Theater';
  }
  if (segName.includes('family') || genreName.includes('children') || genreName.includes('ice show')) {
    return 'Family';
  }
  return 'Concerts';
}

function getDayOfWeek(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Friday';
    return d.toLocaleDateString('en-US', { weekday: 'long' });
  } catch {
    return 'Friday';
  }
}

function formatFullDateDisplay(dateStr: string, timeStr: string, timeZone: string): string {
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = dateObj.getDate();
    const year = dateObj.getFullYear();

    // Format time
    let formattedTime = '07:30 PM';
    if (timeStr) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const h12 = hours % 12 || 12;
      const mStr = String(minutes || 0).padStart(2, '0');
      formattedTime = `${String(h12).padStart(2, '0')}:${mStr} ${ampm}`;
    }

    return `${dayName}, ${monthName} ${dayNum}, ${year} • ${formattedTime}`;
  } catch {
    return `${dateStr} • 07:30 PM`;
  }
}

// Select the best image from Ticketmaster images array
function pickBestImages(images?: any[]): { hero: string; banner: string } {
  const fallbackHero = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80';
  const fallbackBanner = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80';

  if (!images || images.length === 0) {
    return { hero: fallbackHero, banner: fallbackBanner };
  }

  // Sort by width descending
  const sorted = [...images].sort((a, b) => (b.width || 0) - (a.width || 0));

  // Find 16:9 ratio image with width > 1000 for banner
  const bannerImg = sorted.find(img => img.ratio === '16_9' && (img.width || 0) >= 1000) || sorted[0];
  // Find 4:3 or 3:2 or standard hero image
  const heroImg = sorted.find(img => img.ratio === '3_2' || img.ratio === '4_3') || sorted[1] || sorted[0];

  return {
    hero: heroImg?.url || fallbackHero,
    banner: bannerImg?.url || fallbackBanner
  };
}

// Convert a single Ticketmaster Discovery v2 API event into our application's EventItem
export function transformTicketmasterEvent(tmEvent: any): any {
  const venue = tmEvent._embedded?.venues?.[0] || {};
  const attractions = tmEvent._embedded?.attractions || [];
  const primaryAttraction = attractions[0] || {};
  const supporting = attractions.slice(1).map((a: any) => a.name).filter(Boolean);
  const lineup = attractions.map((a: any) => a.name).filter(Boolean);
  if (lineup.length === 0 && tmEvent.name) {
    lineup.push(tmEvent.name);
  }

  const { hero, banner } = pickBestImages(tmEvent.images);
  const localDate = tmEvent.dates?.start?.localDate || new Date().toISOString().split('T')[0];
  const localTime = tmEvent.dates?.start?.localTime || '19:30:00';
  const timezone = tmEvent.dates?.timezone || 'America/Los_Angeles';

  const category = mapClassificationToCategory(tmEvent.classifications);
  const subcategory = tmEvent.classifications?.[0]?.genre?.name || category;
  const subgenre = tmEvent.classifications?.[0]?.subGenre?.name || subcategory;

  const minPrice = tmEvent.priceRanges?.[0]?.min ?? 55.0;
  const maxPrice = tmEvent.priceRanges?.[0]?.max ?? (minPrice * 3);
  const currency = tmEvent.priceRanges?.[0]?.currency || 'USD';

  const statusCode = tmEvent.dates?.status?.code || 'onsale';

  const cityName = venue.city?.name || 'Los Angeles';
  const stateCode = venue.state?.stateCode || venue.state?.name || 'CA';
  const countryName = venue.country?.name || 'United States';
  const addressLine = venue.address?.line1 || '';
  const postalCode = venue.postalCode || '';
  const fullAddress = [addressLine, cityName, stateCode, postalCode].filter(Boolean).join(', ');

  const doorsTime = tmEvent.doorsTimes?.localDoorTime || '18:30:00';

  return {
    identity: {
      event_title: tmEvent.name,
      event_id: tmEvent.id, // Ticketmaster ID as external unique ID
      event_url: tmEvent.url || `https://www.ticketmaster.com/event/${tmEvent.id}`,
      category,
      subcategory,
      subgenre,
      main_performer: primaryAttraction.name || tmEvent.name,
      lineup,
      supporting_acts: supporting,
      image_url: hero,
      banner_url: banner,
      is_featured: tmEvent.promoter?.id ? true : false,
      is_presale: statusCode === 'presale',
      is_resale: false,
      is_selling_fast: true,
      source: 'Ticketmaster Discovery API v2',
      status: statusCode
    },
    date_time: {
      exact_date: localDate,
      day_of_week: getDayOfWeek(localDate),
      start_time: localTime,
      end_time: 'Unspecified',
      time_zone: timezone,
      doors_time: doorsTime,
      full_date_display: formatFullDateDisplay(localDate, localTime, timezone)
    },
    location: {
      venue_name: venue.name || 'Official Venue',
      venue_url: venue.url || `https://www.ticketmaster.com/venue/${venue.id || ''}`,
      city: cityName,
      state: stateCode,
      country: countryName,
      full_address: fullAddress || `${venue.name || 'Venue'}, ${cityName}, ${stateCode}`,
      parking_info: venue.parkingDetail || 'Venue parking available. Public transit recommended.',
      accessibility_info: venue.accessibleSeatingDetail || 'Official ADA accessible seating available via Ticketmaster.',
      capacity: 18500
    },
    pricing: {
      currency,
      min_price: Math.round(minPrice),
      max_price: Math.round(maxPrice)
    },
    description: {
      full_description: tmEvent.info || tmEvent.pleaseNote || `Experience ${tmEvent.name} live in ${cityName}. Official Ticketmaster verified ticketing with SafeTix encrypted mobile barcode.`,
      special_notices: tmEvent.pleaseNote || 'Official Ticketmaster SafeTix mobile ticketing enabled. Screenshot passes are not accepted at venue gate.',
      age_restrictions: tmEvent.ageRestrictions?.legalAgeEnforced ? `Age restricted: ${tmEvent.ageRestrictions.legalAgeEnforced}` : 'All ages welcome unless otherwise specified by venue.',
      entry_requirements: 'Mobile barcode tickets only. Government-issued ID may be required.'
    },
    sync_metadata: {
      tm_event_id: tmEvent.id,
      source: 'Ticketmaster Discovery API v2',
      first_imported_at: new Date().toISOString(),
      last_updated_at: new Date().toISOString(),
      last_synced_at: new Date().toISOString(),
      event_status: statusCode,
      is_manual: false
    }
  };
}

// Fetch helper with retry and exponential backoff
async function fetchWithRetry(url: string, retries = 3, backoffMs = 1000): Promise<Response> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'TicketmasterAppSyncEngine/2.0'
        }
      });

      // If rate limited (429), respect rate limit header or wait
      if (response.status === 429) {
        const retryAfter = response.headers.get('Rate-Limit-Reset') || response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : backoffMs * Math.pow(2, attempt);
        console.warn(`[TM-SYNC] Rate limited (429). Retrying in ${waitTime}ms (attempt ${attempt + 1}/${retries})...`);
        await new Promise(res => setTimeout(res, waitTime));
        attempt++;
        continue;
      }

      if (response.status >= 500 && attempt < retries - 1) {
        console.warn(`[TM-SYNC] Server error (${response.status}). Retrying in ${backoffMs}ms...`);
        await new Promise(res => setTimeout(res, backoffMs * Math.pow(2, attempt)));
        attempt++;
        continue;
      }

      return response;
    } catch (error: any) {
      attempt++;
      if (attempt >= retries) throw error;
      console.warn(`[TM-SYNC] Network fetch error (${error.message}). Retrying in ${backoffMs}ms...`);
      await new Promise(res => setTimeout(res, backoffMs * Math.pow(2, attempt)));
    }
  }
  throw new Error(`Failed to fetch from Ticketmaster API after ${retries} attempts.`);
}

// Synchronization Lock to prevent overlapping jobs
let isSyncing = false;
let nextScheduledSyncTime: string | null = null;

export function getIsSyncing(): boolean {
  return isSyncing;
}

export function getNextScheduledSyncTime(): string | null {
  return nextScheduledSyncTime;
}

export function updateNextScheduledSyncTime(intervalMinutes: number) {
  const next = new Date(Date.now() + intervalMinutes * 60 * 1000);
  nextScheduledSyncTime = next.toISOString();
}

/**
 * Main Synchronization Engine Function
 * Retrieves events across configured cities, handles pagination, deduplicates against existing records,
 * and performs atomic database updates.
 */
export async function runTicketmasterSync(trigger: 'cron' | 'manual' | 'scheduler' = 'manual'): Promise<SyncStats> {
  const startedAt = new Date().toISOString();
  const startTime = Date.now();

  if (isSyncing) {
    console.log(`[TM-SYNC] Sync already in progress, skipping trigger '${trigger}'.`);
    const history = getSyncHistory();
    return history[0] || {
      startedAt,
      finishedAt: new Date().toISOString(),
      durationMs: 0,
      status: 'skipped',
      importedCount: 0,
      updatedCount: 0,
      skippedCount: 0,
      failedCount: 0,
      totalEventsInDb: getStoredEvents().length,
      trigger,
      errorMessage: 'Synchronization is currently in progress by another job'
    };
  }

  isSyncing = true;
  const config = getSyncConfig();
  const apiKey = getTicketmasterApiKey();

  let importedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  let syncStatus: 'success' | 'failed' | 'partial' | 'skipped' = 'success';
  let syncError: string | null = null;

  try {
    if (!config.enabled && trigger !== 'manual') {
      console.log('[TM-SYNC] Automatic synchronisation is disabled in configuration.');
      isSyncing = false;
      const stats: SyncStats = {
        startedAt,
        finishedAt: new Date().toISOString(),
        durationMs: Date.now() - startTime,
        status: 'skipped',
        importedCount: 0,
        updatedCount: 0,
        skippedCount: 0,
        failedCount: 0,
        totalEventsInDb: getStoredEvents().length,
        trigger,
        errorMessage: 'Automatic synchronisation disabled in config'
      };
      appendSyncHistory(stats);
      return stats;
    }

    if (!apiKey) {
      syncStatus = 'failed';
      syncError = 'TICKETMASTER_API_KEY is not configured. Please register for a free API key at https://developer.ticketmaster.com and set TICKETMASTER_API_KEY in server environment settings.';
      console.warn(`[TM-SYNC] ${syncError}`);
      const stats: SyncStats = {
        startedAt,
        finishedAt: new Date().toISOString(),
        durationMs: Date.now() - startTime,
        status: syncStatus,
        importedCount: 0,
        updatedCount: 0,
        skippedCount: 0,
        failedCount: 0,
        totalEventsInDb: getStoredEvents().length,
        trigger,
        errorMessage: syncError
      };
      appendSyncHistory(stats);
      isSyncing = false;
      return stats;
    }

    console.log(`[TM-SYNC] Starting synchronisation (trigger: ${trigger}, key: ${maskApiKey(apiKey)})...`);

    // Load existing events from storage (Never overwrite or wipe existing events on failure!)
    const existingEvents = getStoredEvents();
    // Index existing events by external Ticketmaster Event ID and internal ID for O(1) lookup
    const eventsMap = new Map<string, any>();
    for (const evt of existingEvents) {
      const tmId = evt.sync_metadata?.tm_event_id || evt.identity?.event_id;
      if (tmId) {
        eventsMap.set(tmId, evt);
      }
    }

    // Now loop through configured cities and fetch from Ticketmaster Discovery API v2
    // Base URL: https://app.ticketmaster.com/discovery/v2/events.json
    const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
    const citiesToFetch = config.cities && config.cities.length > 0 ? config.cities.slice(0, 4) : ['Los Angeles', 'New York'];

    // Today in ISO format
    const startDateTime = new Date().toISOString().split('.')[0] + 'Z';

    for (const city of citiesToFetch) {
      console.log(`[TM-SYNC] Fetching upcoming events for city: ${city}...`);
      
      for (let page = 0; page < config.maxPagesPerSync; page++) {
        try {
          const params = new URLSearchParams({
            apikey: apiKey,
            city,
            countryCode: config.countryCode || 'US',
            startDateTime,
            sort: 'date,asc',
            size: String(config.pageSize || 20),
            page: String(page)
          });

          const url = `${baseUrl}?${params.toString()}`;
          const response = await fetchWithRetry(url, 2, 800);

          if (!response.ok) {
            const errText = await response.text();
            console.error(`[TM-SYNC] Ticketmaster API HTTP ${response.status} for city ${city} page ${page}:`, errText.slice(0, 200));
            if (response.status === 401 || response.status === 403) {
              throw new Error(`Ticketmaster API authentication failed (HTTP ${response.status}). Please check that TICKETMASTER_API_KEY is valid.`);
            }
            failedCount++;
            continue;
          }

          const data: any = await response.json();
          const tmEvents = data._embedded?.events || [];
          const totalPages = data.page?.totalPages || 0;

          if (tmEvents.length === 0) {
            // No more events in this city
            break;
          }

          for (const rawTmEvent of tmEvents) {
            try {
              if (!rawTmEvent.id || !rawTmEvent.name) {
                skippedCount++;
                continue;
              }

              const transformed = transformTicketmasterEvent(rawTmEvent);
              const tmId = rawTmEvent.id;

              if (eventsMap.has(tmId)) {
                // Event already exists -> UPDATE existing record rather than creating duplicate
                const existing = eventsMap.get(tmId);
                
                // If existing event was marked manual, preserve manual descriptions/title
                const isManual = existing.sync_metadata?.is_manual === true;
                
                const updatedEvent = {
                  ...existing,
                  // Keep identity basics, update dynamic fields
                  identity: {
                    ...existing.identity,
                    event_title: isManual ? existing.identity.event_title : transformed.identity.event_title,
                    event_url: transformed.identity.event_url,
                    category: isManual ? existing.identity.category : transformed.identity.category,
                    subcategory: transformed.identity.subcategory,
                    subgenre: transformed.identity.subgenre,
                    image_url: transformed.identity.image_url || existing.identity.image_url,
                    banner_url: transformed.identity.banner_url || existing.identity.banner_url,
                    status: transformed.identity.status
                  },
                  date_time: {
                    ...existing.date_time,
                    exact_date: transformed.date_time.exact_date,
                    start_time: transformed.date_time.start_time,
                    time_zone: transformed.date_time.time_zone,
                    full_date_display: transformed.date_time.full_date_display
                  },
                  location: {
                    ...existing.location,
                    venue_name: transformed.location.venue_name,
                    venue_url: transformed.location.venue_url,
                    city: transformed.location.city,
                    state: transformed.location.state,
                    country: transformed.location.country,
                    full_address: transformed.location.full_address
                  },
                  pricing: {
                    ...existing.pricing,
                    min_price: transformed.pricing.min_price || existing.pricing.min_price,
                    max_price: transformed.pricing.max_price || existing.pricing.max_price,
                    currency: transformed.pricing.currency
                  },
                  description: {
                    ...existing.description,
                    full_description: isManual ? existing.description.full_description : transformed.description.full_description,
                    special_notices: transformed.description.special_notices
                  },
                  sync_metadata: {
                    ...existing.sync_metadata,
                    tm_event_id: tmId,
                    source: 'Ticketmaster Discovery API v2',
                    last_updated_at: new Date().toISOString(),
                    last_synced_at: new Date().toISOString(),
                    event_status: transformed.identity.status,
                    is_manual: isManual
                  }
                };

                eventsMap.set(tmId, updatedEvent);
                updatedCount++;
              } else {
                // NEW QUALIFYING EVENT -> Insert
                eventsMap.set(tmId, transformed);
                importedCount++;
              }
            } catch (err: any) {
              console.error(`[TM-SYNC] Error transforming event ${rawTmEvent.id}:`, err);
              failedCount++;
            }
          }

          // If reached last page for this city, exit city page loop
          if (page >= totalPages - 1) {
            break;
          }

          // Polite pacing: small delay between pages to respect API quota
          await new Promise(r => setTimeout(r, 200));
        } catch (cityPageErr: any) {
          console.error(`[TM-SYNC] Error during city ${city} page ${page}:`, cityPageErr.message);
          failedCount++;
          if (cityPageErr.message.includes('authentication failed')) {
            throw cityPageErr;
          }
        }
      }
    }

    // Mark past events if configured
    const nowIso = new Date().toISOString().split('T')[0];
    const finalEventsList = Array.from(eventsMap.values());

    if (config.markPastEvents) {
      for (const evt of finalEventsList) {
        if (evt.date_time?.exact_date && evt.date_time.exact_date < nowIso) {
          if (evt.identity) {
            evt.identity.status = 'past';
          }
        }
      }
    }

    // Persist to database atomically
    saveStoredEvents(finalEventsList);
    console.log(`[TM-SYNC] Sync complete! Imported: ${importedCount}, Updated: ${updatedCount}, Total in store: ${finalEventsList.length}`);

    if (failedCount > 0 && importedCount === 0 && updatedCount === 0) {
      syncStatus = 'partial';
    }
  } catch (error: any) {
    console.error('[TM-SYNC] Fatal error during synchronisation:', error);
    syncStatus = 'failed';
    syncError = error.message || 'Unknown synchronisation error';
  } finally {
    isSyncing = false;
    updateNextScheduledSyncTime(config.intervalMinutes);

    const stats: SyncStats = {
      startedAt,
      finishedAt: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      status: syncStatus,
      importedCount,
      updatedCount,
      skippedCount,
      failedCount,
      totalEventsInDb: getStoredEvents().length,
      trigger,
      errorMessage: syncError
    };

    appendSyncHistory(stats);
    return stats;
  }
}
