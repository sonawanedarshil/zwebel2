import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions - Zwiebel AI',
  description: 'Terms and Conditions for Zwiebel AI website and services.',
}

export default function TermsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Terms & <span className="gradient-text">Conditions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using Zwiebel AI services, you agree to be bound by these Terms and
              Conditions.
            </p>

            <h2>Services</h2>
            <p>
              Zwiebel AI provides AI, ML, Web, Mobile, Cloud, and Enterprise technology solutions.
              Services are provided subject to project-specific agreements.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content, features, and functionality of our services are owned by Zwiebel AI and
              are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Zwiebel AI shall not be liable for any indirect, incidental, special, or consequential
              damages arising from your use of our services.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about these Terms, contact us at contact@zwiebelai.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
