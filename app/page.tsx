'use client';

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

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Scoopz Growth Tracker</h2>
          <OrgsuiteScoopzTrackerCard profile="@orgsuite_51bc9" />
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 24, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Our Workplace</h2>
          <ul style={{ listStyle: 'none', color: '#94a3b8', fontSize: 14, lineHeight: 1.9 }}>
            <li>✅ Live on Vercel (production)</li>
            <li>✅ GitHub: pointgoddesscc-sketch/orgsuite-scoopz-command-center</li>
            <li>✅ Linear Project: Orgsuite Scoopz Command Center</li>
            <li>✅ Scoopz profile: @orgsuite_51bc9 • Chicago</li>
            <li>✅ Scoopz resources: <a href="http://scoopzapk.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3B82F6' }}>scoopzapk.com</a></li>
            <li>✅ Offline queue + localStorage + toasts</li>
            <li>✅ All 12 connectors status monitored</li>
            <li>✅ Business marketing + JS documentation ready</li>
          </ul>

          <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="https://github.com/pointgoddesscc-sketch/orgsuite-scoopz-command-center" target="_blank" rel="noopener noreferrer" style={{ background: '#0f172a', color: '#f1f5f9', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: '1px solid #334155' }}>GitHub</a>
            <a href="https://linear.app/pse-management/project/orgsuite-scoopz-command-center-a43a3fef1fe4" target="_blank" rel="noopener noreferrer" style={{ background: '#0f172a', color: '#f1f5f9', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: '1px solid #334155' }}>Linear</a>
            <a href="http://scoopzapk.com" target="_blank" rel="noopener noreferrer" style={{ background: '#3B82F6', color: 'white', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Scoopz APK</a>
            <a href="https://vercel.com/pse-sent" target="_blank" rel="noopener noreferrer" style={{ background: '#3B82F6', color: 'white', padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Vercel</a>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: 64, textAlign: 'center', color: '#64748b', fontSize: 13 }}>
        Orgsuite Command Center · point Goddess cc · Chicago · Business marketing & website development · 2026
      </footer>
    </main>
  );
}
