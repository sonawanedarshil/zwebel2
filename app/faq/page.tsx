import { Metadata } from 'next'
import FAQContent from '@/components/FAQContent'

export const metadata: Metadata = {
  title: 'FAQ - Zwiebel AI',
  description: 'Frequently asked questions about Zwiebel AI services, solutions, and how we can help your business.',
}

export default function FAQPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find answers to common questions about our services
            </p>
          </div>
        </div>
      </section>
      <FAQContent />
    </div>
  )
}
