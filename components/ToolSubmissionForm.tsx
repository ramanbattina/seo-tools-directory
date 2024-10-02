'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CategoryType } from '@/lib/seoTools'

interface ToolSubmissionFormProps {
  onSubmitSuccess: () => void
}

export default function ToolSubmissionForm({ onSubmitSuccess }: ToolSubmissionFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [category, setCategory] = useState<CategoryType>('Keyword Research')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, link, category }),
      })

      const data = await response.json()
      console.log('Submission response:', data)

      if (response.ok) {
        setMessage('Tool submitted successfully!')
        setName('')
        setDescription('')
        setLink('')
        setCategory('Keyword Research')
        onSubmitSuccess() // Call this function to refresh tools
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error submitting tool:', error)
      setMessage('An error occurred while submitting the tool.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tool Name"
        required
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <Input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link"
        type="url"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as CategoryType)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="Keyword Research">Keyword Research</option>
        <option value="On-Page SEO">On-Page SEO</option>
        <option value="Link Building">Link Building</option>
        <option value="Technical SEO">Technical SEO</option>
        <option value="Local SEO">Local SEO</option>
      </select>
      <Button type="submit">Submit Tool</Button>
    </form>
  )
}