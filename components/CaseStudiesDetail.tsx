'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import caseStudiesData from '@/data/caseStudies.json'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CaseStudiesDetail() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {caseStudiesData.caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              id={study.id.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium">
                  {study.industry}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {study.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Client:</strong> {study.client}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {study.description}
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Key Results:</h4>
                  <div className="space-y-2">
                    {Object.entries(study.results).map(([key, value], idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gradient-button text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
