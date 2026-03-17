import { Metadata } from 'next'
import BlogList from '@/components/BlogList'

export const metadata: Metadata = {
  title: 'Blog - Zwiebel AI',
  description: 'Latest insights, trends, and updates on AI, Machine Learning, Cloud Computing, and Enterprise Technology.',
}

export default function BlogPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Latest insights, trends, and updates on AI and technology
            </p>
          </div>
        </div>
      </section>
      <BlogList />
    </div>
  )
}
