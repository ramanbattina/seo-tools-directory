'use client'

import ToolSubmissionForm from '@/components/ToolSubmissionForm'
import { useRouter } from 'next/navigation'

export default function SubmitPage() {
  const router = useRouter()

  const handleSubmitSuccess = () => {
    router.push('/')
    router.refresh() // This will refresh the page data
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Submit a New SEO Tool</h1>
      <ToolSubmissionForm onSubmitSuccess={handleSubmitSuccess} />
    </div>
  )
}