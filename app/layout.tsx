import type { Metadata } from 'next';
import Script from "next/script";
import ClientSessionProvider from './components/ClientSessionProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          {children}
          <Script
            type="module"
            src="https://unpkg.com/@splinetool/viewer@1.10.33/build/spline-viewer.js"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        </ClientSessionProvider>
      </body>
    </html>
  )
}
