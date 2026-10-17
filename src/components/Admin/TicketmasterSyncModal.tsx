import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Search, 
  Sliders, 
  Key, 
  Layers, 
  X, 
  ShieldCheck, 
  Database,
  ArrowRight,
  Info,
  Check,
  Globe,
  Radio
} from 'lucide-react';
import { 
  fetchSyncStatus, 
  triggerManualSync, 
  updateSyncSettings, 
  fetchSyncHistory,
  SyncStatus, 
  SyncStats,
  SyncConfig
} from '../../services/eventSyncService';
import { EventItem } from '../../types';

interface TicketmasterSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EventItem[];
  onEventsUpdated: (events: EventItem[]) => void;
}

export const TicketmasterSyncModal: React.FC<TicketmasterSyncModalProps> = ({
  isOpen,
  onClose,
  events,
  onEventsUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'markets' | 'setup'>('overview');
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [history, setHistory] = useState<SyncStats[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Search & Filter for Synced Events
  const [eventSearch, setEventSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Config Form State
  const [editInterval, setEditInterval] = useState<number>(30);
  const [editCities, setEditCities] = useState<string[]>([]);
  const [newCityInput, setNewCityInput] = useState('');
  const [editAutoSync, setEditAutoSync] = useState(true);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load Status and History
  const loadData = async () => {
    setIsLoading(true);
    try {
      const currentStatus = await fetchSyncStatus();
      if (currentStatus) {
        setStatus(currentStatus);
        setEditInterval(currentStatus.config.intervalMinutes);
        setEditCities(currentStatus.config.cities || []);
        setEditAutoSync(currentStatus.config.enabled);
      }
      const historyLogs = await fetchSyncHistory();
      setHistory(historyLogs);
    } catch (e) {
      console.error('Error loading sync status:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Manual Sync
  const handleTriggerSync = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await triggerManualSync();
      if (res.success && res.stats) {
        setSyncFeedback({
          type: 'success',
          message: `Synchronisation completed! ${res.stats.importedCount} new imported, ${res.stats.updatedCount} updated (${res.stats.durationMs}ms).`
        });
        // Reload status and events
        await loadData();
        // Refresh app events
        const updatedRes = await fetch('/api/events');
        if (updatedRes.ok) {
          const data = await updatedRes.json();
          if (data.events) onEventsUpdated(data.events);
        }
      } else {
        setSyncFeedback({
          type: 'error',
          message: res.error || res.stats?.errorMessage || 'Synchronisation encountered an issue. Check API key settings.'
        });
      }
    } catch (err: any) {
      setSyncFeedback({
        type: 'error',
        message: err.message || 'Failed to trigger synchronisation'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Handle Save Config
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    setSaveSuccess(false);
    try {
      const updates: Partial<SyncConfig> = {
        enabled: editAutoSync,
        intervalMinutes: Number(editInterval),
        cities: editCities
      };
      if (apiKeyInput.trim() !== '') {
        updates.apiKeyOverride = apiKeyInput.trim();
      }

      const res = await updateSyncSettings(updates);
      if (res.success) {
        setSaveSuccess(true);
        setApiKeyInput('');
        await loadData();
        setTimeout(() => setSaveSuccess(false), 2500);
      }
    } catch (err) {
      console.error('Save config error:', err);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleAddCity = () => {
    if (newCityInput.trim() && !editCities.includes(newCityInput.trim())) {
      setEditCities([...editCities, newCityInput.trim()]);
      setNewCityInput('');
    }
  };

  const handleRemoveCity = (cityToRemove: string) => {
    setEditCities(editCities.filter(c => c !== cityToRemove));
  };

  // Filtered Events for the Events tab
  const filteredEvents = events.filter(evt => {
    const titleMatch = evt.identity.event_title.toLowerCase().includes(eventSearch.toLowerCase()) ||
                       evt.location.venue_name.toLowerCase().includes(eventSearch.toLowerCase()) ||
                       evt.location.city.toLowerCase().includes(eventSearch.toLowerCase()) ||
                       (evt.sync_metadata?.tm_event_id || '').toLowerCase().includes(eventSearch.toLowerCase());

    const eventStatus = (evt.sync_metadata?.event_status || evt.identity.status || 'onsale').toLowerCase();
    const statusMatch = statusFilter === 'all' || eventStatus === statusFilter.toLowerCase();

    return titleMatch && statusMatch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#121214] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white font-averta">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#18181b]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#026cdf]/20 border border-[#026cdf]/40 flex items-center justify-center text-[#026cdf]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Ticketmaster Event Synchronisation
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800/40">
                  Discovery API v2
                </span>
              </div>
              <p className="text-xs text-white/60">
                Official automated multi-market event sync & scheduled background runner
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-white/10 flex gap-1 bg-[#141416]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-[#026cdf] text-white'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Sync Control & Health</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'events'
                ? 'border-[#026cdf] text-white'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Synced Events Database ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('markets')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'markets'
                ? 'border-[#026cdf] text-white'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Markets & Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'setup'
                ? 'border-[#026cdf] text-white'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>API Key & Vercel Cron</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW & HEALTH */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Feedback Alert */}
              {syncFeedback && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  syncFeedback.type === 'success' 
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' 
                    : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                }`}>
                  {syncFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs">
                    <p className="font-bold">{syncFeedback.type === 'success' ? 'Synchronisation Complete' : 'Notice / Error'}</p>
                    <p className="mt-0.5 opacity-90">{syncFeedback.message}</p>
                  </div>
                </div>
              )}

              {/* Status Banner */}
              <div className="bg-[#1c1c20] p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      status?.isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`} />
                    <h3 className="text-sm font-bold text-white">
                      {status?.isConfigured 
                        ? 'Ticketmaster Discovery API v2 Connected' 
                        : 'Discovery API v2 Key Required'}
                    </h3>
                  </div>
                  <p className="text-xs text-white/60">
                    {status?.isConfigured 
                      ? `Active Consumer Key (${status.apiKeyMasked}). Automatic 30-minute background runner enabled.`
                      : 'Set TICKETMASTER_API_KEY in server environment settings or in the setup tab below.'}
                  </p>
                </div>

                <button
                  onClick={handleTriggerSync}
                  disabled={isSyncing}
                  className="px-5 py-2.5 rounded-xl bg-[#026cdf] hover:bg-[#0056e0] disabled:bg-white/10 disabled:text-white/40 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Synchronising Events...' : 'Sync Events Now'}</span>
                </button>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#18181c] p-4 rounded-xl border border-white/5">
                  <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Total Stored</p>
                  <p className="text-2xl font-black text-white mt-1">{events.length}</p>
                  <p className="text-[10px] text-white/40 mt-1">Events in database</p>
                </div>

                <div className="bg-[#18181c] p-4 rounded-xl border border-white/5">
                  <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Last Run Result</p>
                  <p className="text-2xl font-black text-emerald-400 mt-1">
                    +{status?.lastSync?.importedCount || 0}
                  </p>
                  <p className="text-[10px] text-white/40 mt-1">
                    {status?.lastSync?.updatedCount || 0} updated existing
                  </p>
                </div>

                <div className="bg-[#18181c] p-4 rounded-xl border border-white/5">
                  <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Interval</p>
                  <p className="text-2xl font-black text-white mt-1">
                    {status?.intervalMinutes || 30}m
                  </p>
                  <p className="text-[10px] text-emerald-400/80 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Auto-sync active
                  </p>
                </div>

                <div className="bg-[#18181c] p-4 rounded-xl border border-white/5">
                  <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Last Sync</p>
                  <p className="text-xs font-bold text-white mt-2 truncate">
                    {status?.lastSync?.finishedAt ? new Date(status.lastSync.finishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Pending initial run'}
                  </p>
                  <p className="text-[10px] text-white/40 mt-1">
                    {status?.lastSync?.trigger ? `Triggered via ${status.lastSync.trigger}` : 'Default seed'}
                  </p>
                </div>
              </div>

              {/* Sync Logs History */}
              <div className="bg-[#18181c] p-4 rounded-xl border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#026cdf]" />
                    Recent Synchronisation History
                  </h4>
                  <span className="text-[11px] text-white/40">{history.length} records</span>
                </div>

                {history.length === 0 ? (
                  <p className="text-xs text-white/40 py-4 text-center">
                    No synchronization runs logged yet. Click "Sync Events Now" to initiate.
                  </p>
                ) : (
                  <div className="divide-y divide-white/5 max-h-48 overflow-y-auto">
                    {history.slice(0, 5).map((log, i) => (
                      <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${
                            log.status === 'success' ? 'bg-emerald-400' :
                            log.status === 'partial' ? 'bg-amber-400' : 'bg-rose-400'
                          }`} />
                          <div>
                            <p className="font-semibold text-white">
                              {new Date(log.finishedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                            </p>
                            <p className="text-[10px] text-white/50">
                              Trigger: <span className="text-white/80">{log.trigger}</span> • {log.durationMs}ms
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] font-bold text-emerald-400">
                            +{log.importedCount} new
                          </span>
                          <span className="text-[11px] text-white/40 ml-2">
                            {log.updatedCount} updated
                          </span>
                          {log.errorMessage && (
                            <p className="text-[10px] text-rose-400 max-w-xs truncate" title={log.errorMessage}>
                              {log.errorMessage}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SYNCED EVENTS LIST */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              {/* Search & Filter Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={eventSearch}
                    onChange={(e) => setEventSearch(e.target.value)}
                    placeholder="Search by title, artist, venue, ID..."
                    className="w-full bg-[#1c1c20] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#026cdf]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-white/50 shrink-0">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#1c1c20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#026cdf] w-full sm:w-auto"
                  >
                    <option value="all">All Events ({events.length})</option>
                    <option value="onsale">On Sale</option>
                    <option value="rescheduled">Rescheduled</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>

              {/* Events Table */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#18181c]">
                <div className="max-h-[380px] overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1f1f24] text-white/60 sticky top-0 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-2.5 px-4">Event & Artist</th>
                        <th className="py-2.5 px-3">Date & Time</th>
                        <th className="py-2.5 px-3">Location</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredEvents.map((evt, idx) => {
                        const statusVal = evt.sync_metadata?.event_status || evt.identity.status || 'onsale';
                        return (
                          <tr key={evt.identity.event_id || idx} className="hover:bg-white/5 transition">
                            <td className="py-2.5 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={evt.identity.image_url}
                                  alt=""
                                  className="w-10 h-10 rounded-lg object-cover bg-white/5 shrink-0"
                                />
                                <div>
                                  <p className="font-bold text-white line-clamp-1">
                                    {evt.identity.event_title}
                                  </p>
                                  <p className="text-[10px] text-white/50 flex items-center gap-1.5 mt-0.5">
                                    <span>ID: {evt.identity.event_id}</span>
                                    <span>•</span>
                                    <span className="text-blue-400">{evt.identity.category}</span>
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <p className="text-white font-medium">{evt.date_time.exact_date}</p>
                              <p className="text-[10px] text-white/50">{evt.date_time.start_time}</p>
                            </td>

                            <td className="py-2.5 px-3">
                              <p className="text-white line-clamp-1">{evt.location.venue_name}</p>
                              <p className="text-[10px] text-white/50">{evt.location.city}, {evt.location.state}</p>
                            </td>

                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                statusVal === 'onsale' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' :
                                statusVal === 'rescheduled' ? 'bg-amber-950 text-amber-400 border border-amber-800/40' :
                                statusVal === 'cancelled' ? 'bg-rose-950 text-rose-400 border border-rose-800/40' :
                                'bg-white/10 text-white/60'
                              }`}>
                                {statusVal}
                              </span>
                            </td>

                            <td className="py-2.5 px-3 text-right whitespace-nowrap">
                              <a
                                href={evt.identity.event_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#026cdf] hover:text-blue-300 transition"
                              >
                                <span>Get Tickets</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MARKETS & CONFIGURATION */}
          {activeTab === 'markets' && (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              {saveSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Market coverage and synchronisation settings updated successfully!</span>
                </div>
              )}

              {/* Automatic Sync & Interval */}
              <div className="bg-[#18181c] p-4 rounded-xl border border-white/5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/70">
                  Execution Schedule & Background Runner
                </h4>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Enable Automatic Background Sync</p>
                    <p className="text-[11px] text-white/50">
                      Synchronises events continuously even when the site is closed
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={editAutoSync}
                    onChange={(e) => setEditAutoSync(e.target.checked)}
                    className="w-5 h-5 accent-[#026cdf] rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Synchronisation Interval (Minutes)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 60, 120].map((interval) => (
                      <button
                        type="button"
                        key={interval}
                        onClick={() => setEditInterval(interval)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                          editInterval === interval
                            ? 'bg-[#026cdf] border-[#026cdf] text-white'
                            : 'bg-[#1c1c20] border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        {interval} Minutes
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-white/40 mt-1">
                    Vercel Cron standard schedule: every 30 minutes (<code className="text-blue-400">*/30 * * * *</code>)
                  </p>
                </div>
              </div>

              {/* Covered Cities / Markets */}
              <div className="bg-[#18181c] p-4 rounded-xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/70">
                    Configured Markets & Geographic Coverage
                  </h4>
                  <span className="text-[11px] text-white/40">{editCities.length} Cities Covered</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCityInput}
                    onChange={(e) => setNewCityInput(e.target.value)}
                    placeholder="Enter city name (e.g., Seattle, London, Miami)..."
                    className="flex-1 bg-[#1c1c20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#026cdf]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCity}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition cursor-pointer"
                  >
                    Add City
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {editCities.map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1 rounded-full bg-[#1c1c20] border border-white/10 text-xs text-white flex items-center gap-2"
                    >
                      <MapPin className="w-3 h-3 text-[#026cdf]" />
                      <span>{city}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCity(city)}
                        className="text-white/40 hover:text-rose-400 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* API Key Override (Optional) */}
              <div className="bg-[#18181c] p-4 rounded-xl border border-white/5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/70">
                  Ticketmaster API Key Override (Server Managed)
                </h4>
                <p className="text-[11px] text-white/50">
                  Current active key: <span className="font-mono text-blue-400">{status?.apiKeyMasked || 'None configured'}</span>
                </p>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Paste new Ticketmaster Consumer Key to update..."
                  className="w-full bg-[#1c1c20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#026cdf]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSavingConfig}
                  className="px-6 py-2.5 rounded-xl bg-[#026cdf] hover:bg-[#0056e0] text-white font-bold text-xs shadow-lg transition active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isSavingConfig ? 'Saving Settings...' : 'Save Configuration'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: SETUP GUIDE & VERCEL CRON */}
          {activeTab === 'setup' && (
            <div className="space-y-5 text-xs text-white/80 leading-relaxed">
              <div className="bg-[#18181c] p-5 rounded-xl border border-white/5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#026cdf]" />
                  <span>How to Register for a Ticketmaster API Key</span>
                </h3>

                <ol className="list-decimal pl-5 space-y-2 text-white/70">
                  <li>
                    Go to the official developer portal:{' '}
                    <a
                      href="https://developer.ticketmaster.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline font-semibold inline-flex items-center gap-1"
                    >
                      developer.ticketmaster.com <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>Click <strong>Sign In</strong> or <strong>Register</strong> to create a free account.</li>
                  <li>Go to <strong>My Apps</strong> &rarr; <strong>Add New App</strong>.</li>
                  <li>Enter an application name (e.g. <em>Ticketmaster Web Sync</em>).</li>
                  <li>
                    Copy your <strong>Consumer Key</strong>. This is your <code className="text-blue-300 bg-white/5 px-1 py-0.5 rounded">TICKETMASTER_API_KEY</code>.
                  </li>
                </ol>
              </div>

              <div className="bg-[#18181c] p-5 rounded-xl border border-white/5 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Server Environment Variables</span>
                </h3>
                <p className="text-white/60">
                  Add these variables to your production environment or <code className="text-white">.env</code>:
                </p>

                <div className="bg-black/50 p-3 rounded-lg border border-white/10 font-mono text-[11px] text-white/90 space-y-1">
                  <p><span className="text-blue-400">TICKETMASTER_API_KEY</span>="your_consumer_key_here"</p>
                  <p><span className="text-blue-400">CRON_SECRET</span>="your_random_secret_token"</p>
                  <p><span className="text-blue-400">SYNC_INTERVAL_MINUTES</span>=30</p>
                </div>
              </div>

              <div className="bg-[#18181c] p-5 rounded-xl border border-white/5 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Vercel Cron Configuration</span>
                </h3>
                <p className="text-white/60">
                  This project includes <code className="text-white">vercel.json</code> configured for automated execution:
                </p>

                <pre className="bg-black/50 p-3 rounded-lg border border-white/10 font-mono text-[11px] text-emerald-300 overflow-x-auto">
{`{
  "crons": [
    {
      "path": "/api/sync/cron",
      "schedule": "*/30 * * * *"
    }
  ]
}`}
                </pre>
                <p className="text-[11px] text-white/50">
                  Protected with <code className="text-white">CRON_SECRET</code> header validation. Rejecting unauthorized requests ensures only your scheduler can trigger runs.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#141416] flex items-center justify-between text-xs text-white/50">
          <span>Official Ticketmaster Discovery API v2 & SafeTix™ Integration</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
