'use client'

import SEODirectory from '@/components/SEODirectory'
import ToolSubmissionForm from '@/components/ToolSubmissionForm'
import { useState } from 'react'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSubmitSuccess = () => {
    setRefreshKey(prevKey => prevKey + 1)
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">SEO Tools Directory</h1>
      <SEODirectory key={refreshKey} />
      <ToolSubmissionForm onSubmitSuccess={handleSubmitSuccess} />
    </main>
  )
}