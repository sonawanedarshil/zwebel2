import { Metadata } from 'next'
import ServicesDetail from '@/components/ServicesDetail'

export const metadata: Metadata = {
  title: 'Services - Zwiebel AI',
  description: 'Comprehensive AI, ML, Web, Mobile, Cloud, DevOps, Cybersecurity, Blockchain, AR/VR, and Enterprise solutions.',
}

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              End-to-end technology solutions for your business needs
            </p>
          </div>
        </div>
      </section>
      <ServicesDetail />
    </div>
  )
}
