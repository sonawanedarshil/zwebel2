'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import awardsData from '@/data/awards.json'
import { Award, Trophy, Star, Medal, Shield, CheckCircle, Lock, Cloud } from 'lucide-react'

const iconMap: Record<string, any> = {
  Award,
  Trophy,
  Star,
  Medal,
  Shield,
  CheckCircle,
  Lock,
  Cloud,
}

export default function AwardsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Awards & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Recognized for excellence and commitment to quality
          </p>
        </motion.div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Awards</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awardsData.awards.map((award, index) => {
              const Icon = iconMap[award.icon] || Award
              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    {award.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {award.organization}
                  </p>
                  <p className="text-xs text-primary font-medium">{award.year}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awardsData.certifications.map((cert, index) => {
              const Icon = iconMap[cert.icon] || Shield
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-success/10">
                      <Icon className="w-8 h-8 text-success" />
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cert.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
