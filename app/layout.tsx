import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Orgsuite Command Center | Scoopz Tracker + Full Connectors',
  description: 'Unified AI org hub for business marketing, website development, and Scoopz growth tracking. All connectors live.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
