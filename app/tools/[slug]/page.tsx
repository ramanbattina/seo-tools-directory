import { seoTools } from '@/lib/seoTools'
import { notFound } from 'next/navigation'

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = seoTools.flatMap(category => category.tools).find(tool => tool.name.toLowerCase().replace(/\s+/g, '-') === params.slug)

  if (!tool) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{tool.name}</h1>
      <p className="mb-4">{tool.description}</p>
      <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        Visit Tool
      </a>
    </div>
  )
}

export async function generateStaticParams() {
  const tools = seoTools.flatMap(category => category.tools)
  return tools.map(tool => ({
    slug: tool.name.toLowerCase().replace(/\s+/g, '-'),
  }))
}