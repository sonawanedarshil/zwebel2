import { Metadata } from 'next'
import CareersContent from '@/components/CareersContent'

export const metadata: Metadata = {
  title: 'Careers - Zwiebel AI',
  description: 'Join Zwiebel AI and be part of a team that\'s shaping the future of AI technology. Explore open positions and career opportunities.',
}

export default function CareersPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Build the future of AI technology with us
            </p>
          </div>
        </div>
      </section>
      <CareersContent />
    </div>
  )
}
