import { Metadata } from 'next'
import CaseStudiesDetail from '@/components/CaseStudiesDetail'

export const metadata: Metadata = {
  title: 'Case Studies - Zwiebel AI',
  description: 'Explore our success stories and see how we\'ve helped companies transform their business with AI and technology solutions.',
}

export default function CaseStudiesPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Case <span className="gradient-text">Studies</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real results from real clients
            </p>
          </div>
        </div>
      </section>
      <CaseStudiesDetail />
    </div>
  )
}
