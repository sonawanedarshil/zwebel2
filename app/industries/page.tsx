import { Metadata } from 'next'
import IndustriesDetail from '@/components/IndustriesDetail'

export const metadata: Metadata = {
  title: 'Industries - Zwiebel AI',
  description: 'Tailored AI and technology solutions for EdTech, FinTech, E-Commerce, Healthcare, Logistics, Real Estate, Manufacturing, and more.',
}

export default function IndustriesPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Industries We <span className="gradient-text">Serve</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tailored solutions for diverse industries worldwide
            </p>
          </div>
        </div>
      </section>
      <IndustriesDetail />
    </div>
  )
}
