'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import industriesData from '@/data/industries.json'
import {
  GraduationCap,
  CreditCard,
  ShoppingCart,
  Heart,
  Truck,
  Home,
  Factory,
  Building2,
  Rocket,
  Briefcase,
  HeartHandshake,
  Video,
  ArrowRight,
} from 'lucide-react'

const iconMap: Record<string, any> = {
  GraduationCap,
  CreditCard,
  ShoppingCart,
  Heart,
  Truck,
  Home,
  Factory,
  Building2,
  Rocket,
  Briefcase,
  HandHeart: HeartHandshake,
  HeartHandshake,
  Video,
}

export default function IndustriesDetail() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industriesData.industries.map((industry, index) => {
            const Icon = iconMap[industry.icon] || Building2
            return (
              <motion.div
                key={industry.id}
                id={industry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute top-6 left-6 p-4 rounded-xl bg-white/20 backdrop-blur-md">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{industry.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {industry.description}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
