'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Eye, Lightbulb } from 'lucide-react'

export default function MissionVision() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              To empower businesses worldwide with cutting-edge AI technology solutions that drive
              innovation, efficiency, and growth. We strive to make advanced AI accessible and
              practical for organizations of all sizes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              To be the global leader in AI technology solutions, recognized for innovation,
              excellence, and transformative impact. We envision a future where AI seamlessly
              integrates into every aspect of business operations.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg bg-success/10">
              <Lightbulb className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Values</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Innovation & Excellence',
              'Client-Centric Approach',
              'Integrity & Transparency',
              'Continuous Learning',
            ].map((value, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
