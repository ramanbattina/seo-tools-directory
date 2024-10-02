import { kv } from '@vercel/kv'
import { notFound } from 'next/navigation'

interface Tool {
  name: string;
  description: string;
  link: string;
  category: string;
  slug: string;
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const toolKey = `tool:${params.slug}`
  const tool = await kv.get(toolKey) as Tool | null

  if (!tool) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{tool.name}</h1>
      <p className="mb-4">{tool.description}</p>
      <p className="mb-4">Category: {tool.category}</p>
      <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        Visit Tool
      </a>
    </div>
  )
}