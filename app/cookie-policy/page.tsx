import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - Zwiebel AI',
  description: 'Cookie Policy for Zwiebel AI website.',
}

export default function CookiePolicyPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Cookie <span className="gradient-text">Policy</span>
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
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit our website.
              They help us provide you with a better experience.
            </p>

            <h2>How We Use Cookies</h2>
            <p>
              We use cookies to analyze website traffic, personalize content, and improve user
              experience. We do not use cookies to collect personally identifiable information.
            </p>

            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings. However, disabling
              cookies may affect website functionality.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about our Cookie Policy, contact us at contact@zwiebelai.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
