import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import LiveChat from '@/components/LiveChat'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Zwiebel AI - Enterprise AI Technology Solutions',
  description: 'Leading AI technology company providing comprehensive solutions including AI, ML, Web, Mobile, Cloud, DevOps, Cybersecurity, Blockchain, AR/VR, and Enterprise Solutions.',
  keywords: 'AI, Machine Learning, Web Development, Mobile Apps, Cloud Solutions, Blockchain, AR/VR, Enterprise Technology',
  authors: [{ name: 'Zwiebel AI' }],
  creator: 'Zwiebel AI',
  publisher: 'Zwiebel AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zwiebelai.com',
    siteName: 'Zwiebel AI',
    title: 'Zwiebel AI - Enterprise AI Technology Solutions',
    description: 'Leading AI technology company providing comprehensive enterprise solutions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zwiebel AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zwiebel AI - Enterprise AI Technology Solutions',
    description: 'Leading AI technology company providing comprehensive enterprise solutions',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Chatbot />
          <LiveChat />
        </ThemeProvider>
      </body>
    </html>
  )
}
