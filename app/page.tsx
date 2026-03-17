import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import IndustriesSection from '@/components/IndustriesSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ClientsSection from '@/components/ClientsSection'
import StatsSection from '@/components/StatsSection'
import Newsletter from '@/components/Newsletter'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesGrid />
      <IndustriesSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <ClientsSection />
      <Newsletter />
      <CTA />
    </>
  )
}
