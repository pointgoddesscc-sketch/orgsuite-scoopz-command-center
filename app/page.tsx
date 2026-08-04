'use client';

import { useState } from 'react';
import OrgsuiteScoopzTrackerCard from './components/OrgsuiteScoopzTrackerCard';

const CONNECTORS = [
  { name: 'Google Calendar', icon: '📅' },
  { name: 'Calendly', icon: '🔗' },
  { name: 'Linear', icon: '📋' },
  { name: 'Outlook', icon: '📧' },
  { name: 'Microsoft Teams', icon: '👥' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Notion', icon: '📝' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Gmail', icon: '✉️' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'Stripe', icon: '💳' },
  { name: 'Canva', icon: '🖌️' },
];

export default function Home() {
  const [form, setForm] = useState({ followers: '', posts: '', circles: '', videoViews: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      followers: Number(form.followers) || 0,
      posts: Number(form.posts) || 0,
      circles: Number(form.circles) || 0,
      videoViews: Number(form.videoViews) || 0,
    };
    localStorage.setItem('orgsuite_scoopz_manual_entry', JSON.stringify(data));
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    window.dispatchEvent(new CustomEvent('scoopz-stats-update', { detail: data }));
  };

  return (
    <main style={{ padding: '32px 20px', maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ marginBottom: 40, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#1e293b', padding: '10px 20px', borderRadius: 999, border: '1px solid #334155', marginBottom: 16 }}>
          <span style={{ fontSize: 20 }}>🏢</span>
          <span style={{ fontWeight: 700, fontSize: 15 }}>ORGSUITE</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Command Center</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 560, margin: '0 auto 12px' }}>
          Unified AI workplace for business marketing & website development.<br />
          Scoopz growth • All connectors live • Hosted in our workspace
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', fontSize: 13, color: '#64748b' }}>
          <span>@orgsuite_51bc9</span>
          <span>•</span>
          <span>Chicago, IL</span>
          <span>•</span>
          <span>point Goddess cc</span>
        </div>
      </header>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>All Connectors Active</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {CONNECTORS.map((c) => (
            <div key={c.name} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{c.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</span>
              </div>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 3px #10B98133' }} />
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 48 }}>
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 24, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Enter Scoopz Stats</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ fontSize: 13, color: '#94a3b8' }}>Followers
              <input type="number" min="0" value={form.followers} onChange={(e) => setForm({ ...form, followers: e.target.value })}
                style={{ width: '100%', marginTop: 4, padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9' }} />
            </label>
            <label style={{ fontSize: 13, color: '#94a3b8' }}>Posts
              <input type="number" min="0" value={form.posts} onChange={(e) => setForm({ ...form, posts: e.target.value })}
                style={{ width: '100%', marginTop: 4, padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9' }} />
            </label>
            <label style={{ fontSize: 13, color: '#94a3b8' }}>Circles
              <input type="number" min="0" value={form.circles} onChange={(e) => setForm({ ...form, circles: e.target.value })}
                style={{ width: '100%', marginTop: 4, padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9' }} />
            </label>
            <label style={{ fontSize: 13, color: '#94a3b8' }}>Video Views
              <input type="number" min="0" value={form.videoViews} onChange={(e) => setForm({ ...form, videoViews: e.target.value })}
                style={{ width: '100%', marginTop: 4, padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9' }} />
            </label>
            <button type="submit" style={{ marginTop: 8, padding: '12px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14 }}>
              {submitted ? 'Saved ✓' : 'Save Scoopz Stats'}
            </button>
          </form>
        </div>

        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Scoopz Growth Tracker</h2>
          <OrgsuiteScoopzTrackerCard profile="@orgsuite_51bc9" />
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 48 }}>
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 20, border: '1px solid #334155' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>📅 Calendar</h3>
          <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>Kickoff event created for tomorrow 10:00 AM CT</p>
          <a href="https://www.google.com/calendar/event?eid=czZvbnRya3ZjNTVhcTc2amQyMWJ1NGc1MzAgcG9pbnRnb2RkZXNzY2NAbQ" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#3B82F6' }}>Open in Google Calendar →</a>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 20, border: '1px solid #334155' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>💳 Stripe Status</h3>
          <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>No customers yet — ready for Creator Fund / monetization setup</p>
          <span style={{ fontSize: 12, color: '#10B981' }}>● Connected & healthy</span>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 20, border: '1px solid #334155' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>🎨 Figma</h3>
          <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>Ready for design files & branding assets</p>
          <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#3B82F6' }}>Open Figma →</a>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 20, border: '1px solid #334155' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>📝 Notion Workspace</h3>
          <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>Workplace page created with all links</p>
          <a href="https://app.notion.com/p/3b285f332b428139bb08eaf9e97094b6" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#3B82F6' }}>Open Notion Page →</a>
        </div>
      </section>

      <section style={{ background: '#1e293b', borderRadius: 16, padding: 24, border: '1px solid #334155' }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Our Workplace Links</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href="https://github.com/pointgoddesscc-sketch/orgsuite-scoopz-command-center" target="_blank" rel="noopener noreferrer" style={{ background: '#0f172a', color: '#f1f5f9', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: '1px solid #334155' }}>GitHub</a>
          <a href="https://linear.app/pse-management/project/orgsuite-scoopz-command-center-a43a3fef1fe4" target="_blank" rel="noopener noreferrer" style={{ background: '#0f172a', color: '#f1f5f9', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: '1px solid #334155' }}>Linear</a>
          <a href="https://app.notion.com/p/3b285f332b428139bb08eaf9e97094b6" target="_blank" rel="noopener noreferrer" style={{ background: '#0f172a', color: '#f1f5f9', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: '1px solid #334155' }}>Notion</a>
          <a href="http://scoopzapk.com" target="_blank" rel="noopener noreferrer" style={{ background: '#3B82F6', color: 'white', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Scoopz APK</a>
          <a href="https://vercel.com/pse-sent" target="_blank" rel="noopener noreferrer" style={{ background: '#3B82F6', color: 'white', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Vercel</a>
        </div>
      </section>

      <footer style={{ marginTop: 64, textAlign: 'center', color: '#64748b', fontSize: 13 }}>
        Orgsuite Command Center · point Goddess cc · Chicago · Business marketing & website development · 2026
      </footer>
    </main>
  );
}
