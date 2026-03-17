import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - Zwiebel AI',
  description: 'Get in touch with Zwiebel AI. Schedule a consultation, discuss your project, or learn more about our services.',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Let's discuss how we can help transform your business
            </p>
          </div>
        </div>
      </section>
      <ContactForm />
    </div>
  )
}
