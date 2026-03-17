'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import clientsData from '@/data/clients.json'

export default function ClientsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Leading Companies</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {clientsData.clients.map((client, index) => (
            <ClientLogo key={client.name} client={client} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ClientLogo({ client, index, inView }: { client: { name: string; logo: string }; index: number; inView: boolean }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-14 w-28 md:h-16 md:w-32 flex items-center justify-center opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
    >
      {!imgError ? (
        <img
          src={client.logo}
          alt={client.name}
          className="h-10 w-auto max-w-[100px] md:h-12 md:max-w-[120px] object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-lg font-bold text-gray-400 dark:text-gray-500" title={client.name}>
          {client.name}
        </span>
      )}
    </motion.div>
  )
}
