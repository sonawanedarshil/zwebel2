'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'What services does Zwiebel AI offer?',
    answer: 'Zwiebel AI offers comprehensive AI, ML, Web, Mobile, Cloud, DevOps, Cybersecurity, Blockchain, AR/VR, Data Engineering, and Enterprise solutions. We provide end-to-end technology services tailored to your business needs.',
  },
  {
    id: 2,
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A simple web application might take 2-4 weeks, while enterprise AI solutions can take 3-6 months. We provide detailed timelines during our initial consultation.',
  },
  {
    id: 3,
    question: 'Do you offer support after project completion?',
    answer: 'Yes, we offer 24/7 support and maintenance services. Our support packages include monitoring, updates, security patches, and performance optimization to ensure your systems run smoothly.',
  },
  {
    id: 4,
    question: 'What industries do you serve?',
    answer: 'We serve diverse industries including EdTech, FinTech, E-Commerce, Healthcare, Logistics, Real Estate, Manufacturing, Government, Startups, Enterprises, NGOs, and Media & Entertainment.',
  },
  {
    id: 5,
    question: 'Can you integrate with our existing systems?',
    answer: 'Absolutely! We specialize in integrating new solutions with existing enterprise systems. Our team ensures seamless integration while maintaining data security and system stability.',
  },
  {
    id: 6,
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing models including fixed-price projects, time and materials, and retainer agreements. Pricing depends on project scope, complexity, and requirements. Contact us for a customized quote.',
  },
  {
    id: 7,
    question: 'Do you provide AI consulting services?',
    answer: 'Yes, we offer comprehensive AI consulting to help businesses identify opportunities, develop strategies, and implement AI solutions that drive real business value.',
  },
  {
    id: 8,
    question: 'How do I get started?',
    answer: 'Simply contact us through our contact form, schedule a consultation, or reach out via email or phone. We\'ll discuss your requirements and provide a tailored solution proposal.',
  },
]

export default function FAQContent() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFAQ === faq.id
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(isOpen ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
