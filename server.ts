import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { 
  initEventsDatabase, 
  getStoredEvents, 
  getSyncConfig, 
  updateSyncConfig, 
  getSyncHistory, 
  runTicketmasterSync, 
  getIsSyncing, 
  getNextScheduledSyncTime, 
  updateNextScheduledSyncTime,
  getTicketmasterApiKey,
  maskApiKey
} from './server/ticketmasterSync';
import { EVENTS_DATA } from './src/data/eventsData';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize persistent event database with existing seed events on boot
try {
  initEventsDatabase(EVENTS_DATA);
} catch (e) {
  console.error('[SERVER] Failed to seed events database:', e);
}

// =========================================================================
// API ROUTES FOR EVENTS & TICKETMASTER SYNCHRONISATION
// =========================================================================

// 1. GET /api/events - Retrieve events from the database with filtering and sorting
app.get('/api/events', (req: Request, res: Response) => {
  try {
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    let events = getStoredEvents();
    if (!events || events.length === 0) {
      events = EVENTS_DATA;
    }

    const { category, city, search, status, sort, limit } = req.query;

    let result = [...events];

    // Filter by Category
    if (category && category !== 'all') {
      const catLower = String(category).toLowerCase();
      result = result.filter(e => e.identity?.category?.toLowerCase() === catLower);
    }

    // Filter by City
    if (city && city !== 'all') {
      const cityLower = String(city).toLowerCase();
      result = result.filter(e => e.location?.city?.toLowerCase().includes(cityLower));
    }

    // Filter by Status (onsale, rescheduled, cancelled, past, all)
    if (status && status !== 'all') {
      const statusLower = String(status).toLowerCase();
      result = result.filter(e => {
        const evStatus = (e.sync_metadata?.event_status || e.identity?.status || 'onsale').toLowerCase();
        return evStatus === statusLower;
      });
    }

    // Filter by Search Query
    if (search && String(search).trim() !== '') {
      const q = String(search).toLowerCase();
      result = result.filter(e => 
        e.identity?.event_title?.toLowerCase().includes(q) ||
        e.identity?.main_performer?.toLowerCase().includes(q) ||
        e.location?.venue_name?.toLowerCase().includes(q) ||
        e.location?.city?.toLowerCase().includes(q) ||
        e.identity?.subcategory?.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === 'date_desc') {
      result.sort((a, b) => new Date(b.date_time?.exact_date || 0).getTime() - new Date(a.date_time?.exact_date || 0).getTime());
    } else if (sort === 'price_asc') {
      result.sort((a, b) => (a.pricing?.min_price || 0) - (b.pricing?.min_price || 0));
    } else if (sort === 'price_desc') {
      result.sort((a, b) => (b.pricing?.min_price || 0) - (a.pricing?.min_price || 0));
    } else {
      // Default: date_asc
      result.sort((a, b) => new Date(a.date_time?.exact_date || 0).getTime() - new Date(b.date_time?.exact_date || 0).getTime());
    }

    const total = result.length;
    if (limit) {
      const l = parseInt(String(limit), 10);
      if (!isNaN(l) && l > 0) {
        result = result.slice(0, l);
      }
    }

    const history = getSyncHistory();
    const lastSuccessSync = history.find(h => h.status === 'success' || h.status === 'partial');

    res.json({
      success: true,
      total,
      events: result,
      lastSyncedAt: lastSuccessSync?.finishedAt || null,
      source: 'Ticketmaster Discovery API v2 & Database Store'
    });
  } catch (err: any) {
    console.error('[API] /api/events error:', err);
    res.status(500).json({ success: false, error: err.message, events: EVENTS_DATA });
  }
});

// 2. GET /api/events/:id - Get single event detail
app.get('/api/events/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const events = getStoredEvents();
    const event = events.find(e => 
      e.identity?.event_id === id || 
      e.sync_metadata?.tm_event_id === id
    );

    if (!event) {
      // Try seed events
      const seed = EVENTS_DATA.find(e => e.identity?.event_id === id);
      if (seed) return res.json({ success: true, event: seed });
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    res.json({ success: true, event });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. GET /api/sync/status - Returns synchronisation status, metrics, and masked credentials
app.get('/api/sync/status', (req: Request, res: Response) => {
  try {
    const config = getSyncConfig();
    const apiKey = getTicketmasterApiKey();
    const history = getSyncHistory();
    const lastSync = history[0] || null;
    const events = getStoredEvents();

    res.json({
      success: true,
      isConfigured: Boolean(apiKey),
      apiKeyMasked: maskApiKey(apiKey),
      enabled: config.enabled,
      isSyncing: getIsSyncing(),
      intervalMinutes: config.intervalMinutes,
      lastSync,
      nextScheduledSync: getNextScheduledSyncTime(),
      totalEvents: events.length,
      config: {
        enabled: config.enabled,
        intervalMinutes: config.intervalMinutes,
        countryCode: config.countryCode,
        cities: config.cities,
        classifications: config.classifications,
        maxPagesPerSync: config.maxPagesPerSync,
        pageSize: config.pageSize,
        markPastEvents: config.markPastEvents
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. POST /api/sync/manual - Trigger immediate manual synchronisation
app.post('/api/sync/manual', async (req: Request, res: Response) => {
  try {
    console.log('[API] Manual sync initiated by administrator');
    const stats = await runTicketmasterSync('manual');
    res.json({
      success: stats.status !== 'failed',
      stats
    });
  } catch (err: any) {
    console.error('[API] /api/sync/manual error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Synchronization failed'
    });
  }
});

// 5. GET/POST /api/sync/cron - Scheduled Vercel Cron or Cloud Scheduler endpoint
const handleCronSync = async (req: Request, res: Response) => {
  try {
    const cronSecret = process.env.CRON_SECRET;
    
    // Check Authorization if CRON_SECRET is configured
    if (cronSecret && cronSecret.trim() !== '' && !cronSecret.includes('MY_CRON_SECRET')) {
      const authHeader = req.headers['authorization'];
      const xSecret = req.headers['x-cron-secret'];
      const providedSecret = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : xSecret;

      if (providedSecret !== cronSecret) {
        console.warn('[API] /api/sync/cron unauthorized access attempt');
        return res.status(401).json({ success: false, error: 'Unauthorized: Invalid cron secret' });
      }
    }

    console.log('[API] Scheduled Cron sync triggered');
    const stats = await runTicketmasterSync('cron');
    return res.json({
      success: stats.status !== 'failed',
      stats
    });
  } catch (err: any) {
    console.error('[API] /api/sync/cron error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

app.get('/api/sync/cron', handleCronSync);
app.post('/api/sync/cron', handleCronSync);

// 6. GET /api/sync/config & POST /api/sync/config - Read & update configuration
app.get('/api/sync/config', (req: Request, res: Response) => {
  const config = getSyncConfig();
  res.json({
    success: true,
    config: {
      ...config,
      apiKeyOverride: config.apiKeyOverride ? maskApiKey(config.apiKeyOverride) : undefined
    }
  });
});

app.post('/api/sync/config', (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const currentConfig = getSyncConfig();

    // Sanitize updates
    const cleanUpdates: any = {};
    if (typeof updates.enabled === 'boolean') cleanUpdates.enabled = updates.enabled;
    if (typeof updates.intervalMinutes === 'number' && updates.intervalMinutes >= 5) {
      cleanUpdates.intervalMinutes = updates.intervalMinutes;
    }
    if (typeof updates.countryCode === 'string') cleanUpdates.countryCode = updates.countryCode.trim();
    if (Array.isArray(updates.cities)) {
      cleanUpdates.cities = updates.cities.map((c: any) => String(c).trim()).filter(Boolean);
    }
    if (Array.isArray(updates.classifications)) {
      cleanUpdates.classifications = updates.classifications.map((c: any) => String(c).trim()).filter(Boolean);
    }
    if (typeof updates.apiKeyOverride === 'string') {
      cleanUpdates.apiKeyOverride = updates.apiKeyOverride.trim();
    }

    const newConfig = updateSyncConfig(cleanUpdates);

    // Reschedule background timer if interval changed
    if (cleanUpdates.intervalMinutes && cleanUpdates.intervalMinutes !== currentConfig.intervalMinutes) {
      restartBackgroundScheduler(newConfig.intervalMinutes);
    }

    res.json({ success: true, config: newConfig });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. GET /api/sync/history - Retrieve recent synchronisation logs
app.get('/api/sync/history', (req: Request, res: Response) => {
  const history = getSyncHistory();
  res.json({ success: true, history });
});

// =========================================================================
// BACKGROUND SCHEDULED SYNCHRONISATION (Node.js in-process timer)
// Keeps synchronising automatically even when no user has the browser open!
// =========================================================================

let schedulerTimer: NodeJS.Timeout | null = null;

function restartBackgroundScheduler(intervalMinutes: number) {
  if (schedulerTimer) {
    clearInterval(schedulerTimer);
  }
  updateNextScheduledSyncTime(intervalMinutes);
  const ms = intervalMinutes * 60 * 1000;
  console.log(`[SCHEDULER] Automatic Ticketmaster synchronisation scheduled every ${intervalMinutes} minutes.`);

  schedulerTimer = setInterval(async () => {
    try {
      console.log('[SCHEDULER] Periodic synchronisation timer fired.');
      await runTicketmasterSync('scheduler');
    } catch (err) {
      console.error('[SCHEDULER] Error during periodic synchronisation:', err);
    }
  }, ms);
}

// Initial scheduler boot with configured interval
const initialConfig = getSyncConfig();
restartBackgroundScheduler(initialConfig.intervalMinutes || 30);

// =========================================================================
// VITE OR STATIC FRONTEND SERVING
// =========================================================================

async function startServer() {
  const httpServer = http.createServer(app);

  if (!isProd) {
    // Development mode: mount Vite middlewares with attached HTTP server
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: { server: httpServer }
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve built assets from dist
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER] Fullstack Ticketmaster application running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[SERVER] Failed to start server:', err);
});
