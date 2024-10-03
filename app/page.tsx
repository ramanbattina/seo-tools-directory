import SEODirectory from '@/components/SEODirectory'
import Link from 'next/link'
import { kv } from '@vercel/kv'

export const revalidate = 0 // This ensures the page is not cached

async function getTools() {
  const categories = ['Keyword Research', 'On-Page SEO', 'Link Building', 'Technical SEO', 'Local SEO']
  const tools = []

  for (const category of categories) {
    const toolKeys = await kv.smembers(`category:${category}`)
    const categoryTools = await Promise.all(toolKeys.map(key => kv.get(key)))
    tools.push({ category, tools: categoryTools.filter(Boolean) })
  }

  return tools
}

export default async function Home() {
  const initialTools = await getTools()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">SEO Tools Directory</h1>
      <SEODirectory initialTools={initialTools} />
      <Link href="/submit" className="mt-4 p-2 bg-blue-500 text-white rounded inline-block">
        Submit a New Tool
      </Link>
    </main>
  )
}