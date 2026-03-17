import { Metadata } from 'next'
import Image from 'next/image'
import TeamSection from '@/components/TeamSection'
import MissionVision from '@/components/MissionVision'
import AwardsSection from '@/components/AwardsSection'

export const metadata: Metadata = {
  title: 'About Us - Zwiebel AI',
  description: 'Learn about Zwiebel AI, our mission, vision, team, and commitment to delivering cutting-edge AI technology solutions.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">Zwiebel AI</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Leading the future of AI technology solutions
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Founded with a vision to democratize AI technology, Zwiebel AI has grown into a
                leading provider of enterprise AI solutions. Under the leadership of Director
                <strong> Dr. Rajendra Patil</strong>, we combine cutting-edge research with
                practical business applications.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Our team of experts brings decades of combined experience in artificial intelligence,
                machine learning, cloud computing, and enterprise software development. We've helped
                hundreds of companies transform their operations with intelligent automation and
                data-driven insights.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Today, Zwiebel AI stands at the forefront of AI innovation, delivering solutions
                that drive real business value for clients across industries worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MissionVision />
      <TeamSection />
      <AwardsSection />
    </div>
  )
}
