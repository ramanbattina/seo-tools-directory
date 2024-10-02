import { kv } from '@vercel/kv'
import { notFound } from 'next/navigation'

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tools = await kv.smembers('category:Keyword Research')
  const tool = await Promise.all(tools.map(async (key) => {
    const data = await kv.get(key)
    if (data && data.name.toLowerCase().replace(/\s+/g, '-') === params.slug) {
      return data
    }
    return null
  })).then(results => results.find(Boolean))

  if (!tool) {
    notFound()
  }

  return (
    <div>
      <h1>{tool.name}</h1>
      <p>{tool.description}</p>
      <a href={tool.link} target="_blank" rel="noopener noreferrer">Visit Tool</a>
    </div>
  )
}