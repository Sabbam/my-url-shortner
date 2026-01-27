import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My URL Shortner - Professional URL Management",
  description: "The premium URL management platform for modern teams.",
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  },
};

import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/context/../components/Navbar';
import Footer from '@/context/../components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#0f172a',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.9rem',
                borderRadius: '0.75rem',
              }
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
              {children}
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
