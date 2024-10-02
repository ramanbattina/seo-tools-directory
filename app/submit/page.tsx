'use client'

import ToolSubmissionForm from '@/components/ToolSubmissionForm'
import { useRouter } from 'next/navigation'

export default function SubmitPage() {
  const router = useRouter()

  const handleSubmitSuccess = () => {
    // Optionally, you can add a delay before redirecting
    // setTimeout(() => {
    //   router.push('/')
    // }, 2000)

    // Or redirect immediately
    router.push('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Submit a New SEO Tool</h1>
      <ToolSubmissionForm onSubmitSuccess={handleSubmitSuccess} />
    </div>
  )
}