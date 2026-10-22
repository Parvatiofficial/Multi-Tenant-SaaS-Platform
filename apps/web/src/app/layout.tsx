import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DocuMind AI — Multi-Tenant Knowledge Assistant',
  description: 'Production Multi-Tenant SaaS with AI Document Ingestion and Vector Search',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
