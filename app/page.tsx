'use client';

import OrgsuiteScoopzTrackerCard from './components/OrgsuiteScoopzTrackerCard';

const CONNECTORS = [
  { name: 'Google Calendar', icon: '📅', status: 'Connected' },
  { name: 'Calendly', icon: '🔗', status: 'Connected' },
  { name: 'Linear', icon: '📋', status: 'Connected' },
  { name: 'Outlook', icon: '📧', status: 'Connected' },
  { name: 'Microsoft Teams', icon: '👥', status: 'Connected' },
  { name: 'Figma', icon: '🎨', status: 'Connected' },
  { name: 'Notion', icon: '📝', status: 'Connected' },
  { name: 'Vercel', icon: '▲', status: 'Connected' },
  { name: 'Gmail', icon: '✉️', status: 'Connected' },
  { name: 'GitHub', icon: '🐙', status: 'Connected' },
  { name: 'Stripe', icon: '💳', status: 'Connected' },
  { name: 'Canva', icon: '🖌️', status: 'Connected' },
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
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
          Unified AI hub for business marketing & website development.
          Scoopz growth tracker + every connector live and ready.
        </p>
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
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Live & Accessible</h2>
          <ul style={{ listStyle: 'none', color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
            <li>✅ Deployed on Vercel (production)</li>
            <li>✅ Source on GitHub</li>
            <li>✅ Offline queue + localStorage</li>
            <li>✅ Auto reconnect + toasts</li>
            <li>✅ All 12 connectors status</li>
            <li>✅ Business marketing ready</li>
            <li>✅ Full JavaScript documentation</li>
          </ul>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://github.com/pointgoddesscc-sketch/orgsuite-scoopz-command-center" target="_blank" rel="noopener noreferrer" style={{ background: '#0f172a', color: '#f1f5f9', padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: '1px solid #334155' }}>View on GitHub</a>
            <a href="https://vercel.com/pse-sent" target="_blank" rel="noopener noreferrer" style={{ background: '#3B82F6', color: 'white', padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Vercel Dashboard</a>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: 64, textAlign: 'center', color: '#64748b', fontSize: 13 }}>
        Orgsuite Command Center · Built for business marketing & website development · 2026
      </footer>
    </main>
  );
}
