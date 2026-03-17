'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import servicesData from '@/data/services.json'
import {
  Brain,
  Cpu,
  Link as LinkIcon,
  Glasses,
  Globe,
  Smartphone,
  Monitor,
  Cloud,
  Database,
  Shield,
  Palette,
  TrendingUp,
  Headphones,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

const iconMap: Record<string, any> = {
  Brain,
  Cpu,
  Link: LinkIcon,
  Glasses,
  Globe,
  Smartphone,
  Monitor,
  Cloud,
  Database,
  Shield,
  Palette,
  TrendingUp,
  Headphones,
}

export default function ServicesDetail() {
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const serviceCategories = [
    { title: 'Core Technology Services', data: servicesData.coreTechnology },
    { title: 'Development Services', data: servicesData.development },
    { title: 'Cloud & Infrastructure', data: servicesData.cloud },
    { title: 'Data & Analytics', data: servicesData.data },
    { title: 'Security & Compliance', data: servicesData.security },
    { title: 'Design & Product', data: servicesData.design },
    { title: 'Digital & Growth Services', data: servicesData.digital },
    { title: 'Support & Maintenance', data: servicesData.support },
  ]

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {serviceCategories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: catIndex * 0.1, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              {category.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.data.services.map((service, index) => {
                const Icon = iconMap[service.icon] || Globe
                const isExpanded = expandedService === service.id
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: (catIndex * 0.1) + (index * 0.05), duration: 0.6 }}
                    className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary transition-colors">
                          <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedService(isExpanded ? null : service.id)
                      }
                      className="w-full flex items-center justify-between text-primary font-medium hover:text-secondary transition-colors"
                    >
                      <span>{isExpanded ? 'Show Less' : 'View Features'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
