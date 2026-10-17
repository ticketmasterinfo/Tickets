import { EventItem } from '../types';
import { EVENTS_DATA } from '../data/eventsData';

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

export interface SyncStatus {
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

export async function fetchLiveEvents(filters?: {
  category?: string;
  city?: string;
  search?: string;
  status?: string;
  sort?: string;
}): Promise<{ events: EventItem[]; total: number; lastSyncedAt: string | null }> {
  try {
    const params = new URLSearchParams();
    if (filters?.category && filters.category !== 'all') params.set('category', filters.category);
    if (filters?.city && filters.city !== 'all') params.set('city', filters.city);
    if (filters?.search && filters.search.trim() !== '') params.set('search', filters.search);
    if (filters?.status && filters.status !== 'all') params.set('status', filters.status);
    if (filters?.sort) params.set('sort', filters.sort);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`/api/events${query}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch events: HTTP ${res.status}`);
    }
    const data = await res.json();
    if (data.events && Array.isArray(data.events) && data.events.length > 0) {
      return {
        events: data.events,
        total: data.total || data.events.length,
        lastSyncedAt: data.lastSyncedAt || null
      };
    }
    return { events: EVENTS_DATA, total: EVENTS_DATA.length, lastSyncedAt: null };
  } catch (error) {
    console.warn('[SyncService] Using fallback seed events due to fetch issue:', error);
    return { events: EVENTS_DATA, total: EVENTS_DATA.length, lastSyncedAt: null };
  }
}

export async function fetchSyncStatus(): Promise<SyncStatus | null> {
  try {
    const res = await fetch('/api/sync/status');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('[SyncService] Failed to fetch sync status:', err);
    return null;
  }
}

export async function triggerManualSync(): Promise<{ success: boolean; stats?: SyncStats; error?: string }> {
  try {
    const res = await fetch('/api/sync/manual', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, error: err.message || 'Network request failed' };
  }
}

export async function updateSyncSettings(updates: Partial<SyncConfig>): Promise<{ success: boolean; config?: SyncConfig; error?: string }> {
  try {
    const res = await fetch('/api/sync/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function fetchSyncHistory(): Promise<SyncStats[]> {
  try {
    const res = await fetch('/api/sync/history');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.history || [];
  } catch (err) {
    console.error('[SyncService] Failed to fetch history:', err);
    return [];
  }
}

export async function testCronEndpoint(secret?: string): Promise<{ status: number; ok: boolean; data: any }> {
  const headers: Record<string, string> = {};
  if (secret) {
    headers['Authorization'] = `Bearer ${secret}`;
  }
  const res = await fetch('/api/sync/cron', {
    method: 'GET',
    headers
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}
