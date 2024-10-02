'use client'

import SEODirectory from '@/components/SEODirectory'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">SEO Tools Directory</h1>
      <SEODirectory />
      <Link href="/submit" className="mt-4 p-2 bg-blue-500 text-white rounded inline-block">
        Submit a New Tool
      </Link>
    </main>
  )
}