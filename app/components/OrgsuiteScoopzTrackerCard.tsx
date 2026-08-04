'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
  if (typeof document === 'undefined') return;
  const colors: Record<string, string> = { success: '#10B981', error: '#EF4444', info: '#3B82F6', warning: '#F59E0B' };
  const toast = document.createElement('div');
  toast.style.cssText = `position: fixed; bottom: 24px; right: 24px; z-index: 9999; background: ${colors[type]}; color: white; padding: 12px 20px; border-radius: 10px; font-size: 14px; box-shadow: 0 10px 25px rgba(0,0,0,0.25); max-width: 320px;`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3800);
};

interface Metrics { followers: number; posts: number; circles: number; videoViews: number; lastSync: string | null; lastError: string | null; isOnline: boolean; }

export default function OrgsuiteScoopzTrackerCard({ wsUrl = 'wss://your-orgsuite-backend.example/ws', profile = '@orgsuite_51bc9' }: { wsUrl?: string; profile?: string }) {
  const [metrics, setMetrics] = useState<Metrics>({ followers: 0, posts: 0, circles: 0, videoViews: 0, lastSync: null, lastError: null, isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true });
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const retryCount = useRef(0);
  const maxRetries = 10;
  const baseDelay = 1500;
  const offlineQueue = useRef<any[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('orgsuite_scoopz_metrics');
      if (saved) setMetrics(prev => ({ ...prev, ...JSON.parse(saved) }));
      const queue = localStorage.getItem('orgsuite_scoopz_queue');
      if (queue) offlineQueue.current = JSON.parse(queue);
    } catch (err) { console.warn('[Orgsuite] Failed to load local data', err); }
  }, []);

  const persist = useCallback((newMetrics: Metrics, queue = offlineQueue.current) => {
    try {
      localStorage.setItem('orgsuite_scoopz_metrics', JSON.stringify(newMetrics));
      localStorage.setItem('orgsuite_scoopz_queue', JSON.stringify(queue));
    } catch (err) { console.warn('[Orgsuite] localStorage write failed', err); }
  }, []);

  const toSafeInt = (v: any) => { const n = Number(v); return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0; };

  const handleError = useCallback((message: string, error: any = null) => {
    const errMsg = error?.message || message;
    setMetrics(prev => { const updated = { ...prev, lastError: errMsg }; persist(updated); return updated; });
    showToast(errMsg, 'error');
  }, [persist]);

  const send = useCallback((payload: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try { wsRef.current.send(JSON.stringify(payload)); return true; } catch (err) { handleError('Send failed', err); }
    }
    offlineQueue.current.push(payload);
    persist(metrics, offlineQueue.current);
    return false;
  }, [handleError, metrics, persist]);

  const scheduleReconnect = useCallback(() => {
    if (retryCount.current >= maxRetries) { handleError('Max reconnection attempts reached'); showToast('Connection lost – working offline', 'warning'); return; }
    const delay = baseDelay * Math.pow(2, retryCount.current);
    retryCount.current += 1;
    setTimeout(connect, delay);
  }, [handleError]);

  const connect = useCallback(() => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) return;
    try { wsRef.current = new WebSocket(wsUrl); } catch (err) { handleError('WebSocket constructor failed', err); scheduleReconnect(); return; }
    wsRef.current.onopen = () => {
      retryCount.current = 0;
      setIsConnected(true);
      showToast('Scoopz tracker connected', 'success');
      if (offlineQueue.current.length > 0) { offlineQueue.current.forEach(item => send(item)); offlineQueue.current = []; persist(metrics, []); showToast('Synced offline updates', 'info'); }
      send({ type: 'SCOOPZ_CONNECT', profile, timestamp: new Date().toISOString() });
    };
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.type === 'METRICS_UPDATE' && data.payload) {
          setMetrics(prev => { const updated = { ...prev, ...data.payload, lastError: null }; persist(updated); return updated; });
        }
      } catch (err) { handleError('Failed to parse message', err); }
    };
    wsRef.current.onerror = () => handleError('WebSocket error');
    wsRef.current.onclose = () => { setIsConnected(false); scheduleReconnect(); };
  }, [wsUrl, profile, metrics, persist, send, handleError, scheduleReconnect]);

  const logGrowth = useCallback(({ followers = 0, posts = 0, circles = 0, videoViews = 0 }: Partial<Metrics> = {}) => {
    const safe = { followers: toSafeInt(followers), posts: toSafeInt(posts), circles: toSafeInt(circles), videoViews: toSafeInt(videoViews), lastSync: new Date().toISOString(), lastError: null };
    setMetrics(prev => { const updated = { ...prev, ...safe }; persist(updated); return updated; });
    const payload = { type: 'SCOOPZ_GROWTH', source: 'Scoopz', profile, payload: safe, note: 'Business marketing + JS webdev content' };
    const sent = send(payload);
    if (sent) showToast('Growth metrics synced to Orgsuite', 'success');
    else showToast('Saved offline – will sync when back online', 'warning');
  }, [profile, persist, send]);

  useEffect(() => {
    const goOnline = () => { setMetrics(prev => ({ ...prev, isOnline: true })); connect(); showToast('Back online – syncing…', 'info'); };
    const goOffline = () => { setMetrics(prev => ({ ...prev, isOnline: false })); showToast('You are offline – changes will queue', 'warning'); };
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    connect();
    return () => { window.removeEventListener('online', goOnline); window.removeEventListener('offline', goOffline); if (wsRef.current) wsRef.current.close(1000, 'Component unmount'); };
  }, [connect]);

  return (
    <div style={{ background: '#1e293b', borderRadius: 16, padding: 24, color: '#f1f5f9', maxWidth: 420, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Scoopz Tracker</h3>
        <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: isConnected ? '#10B98133' : '#EF444433', color: isConnected ? '#10B981' : '#EF4444', fontWeight: 500 }}>{isConnected ? '● Live' : '○ Offline'}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <Stat label="Followers" value={metrics.followers} />
        <Stat label="Posts" value={metrics.posts} />
        <Stat label="Circles" value={metrics.circles} />
        <Stat label="Video Views" value={metrics.videoViews} />
      </div>
      <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 16px' }}>Last sync: {metrics.lastSync ? new Date(metrics.lastSync).toLocaleString() : 'Never'}{metrics.lastError && <span style={{ color: '#f87171' }}> · {metrics.lastError}</span>}</p>
      <button onClick={() => logGrowth({ followers: metrics.followers + 1, posts: metrics.posts, circles: metrics.circles, videoViews: metrics.videoViews + 50 })} style={{ width: '100%', padding: '12px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14 }}>Log Test Growth (+1 follower)</button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ background: '#0f172a', padding: 12, borderRadius: 10 }}>
      <div style={{ fontSize: 12, color: '#94a3b8' }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{value.toLocaleString()}</div>
    </div>
  );
}
