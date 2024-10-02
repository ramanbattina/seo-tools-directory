import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

interface Tool {
  name: string;
  description: string;
  link: string;
  category: string;
}

type CategoryTools = {
  category: string;
  tools: Tool[];
}

export async function GET() {
  try {
    const categories = ['Keyword Research', 'On-Page SEO', 'Link Building', 'Technical SEO', 'Local SEO']
    const tools: CategoryTools[] = []

    for (const category of categories) {
      console.log(`Fetching tools for category: ${category}`)
      const toolKeys = await kv.smembers(`category:${category}`)
      console.log(`Keys for ${category}:`, toolKeys)

      const categoryTools = await Promise.all(toolKeys.map(async key => {
        try {
          const tool = await kv.get(key) as Tool | null
          console.log(`Tool for key ${key}:`, tool)
          return tool
        } catch (error) {
          console.error(`Error fetching tool for key ${key}:`, error)
          return null
        }
      }))

      tools.push({ category, tools: categoryTools.filter((tool): tool is Tool => tool !== null) })
    }

    console.log('All tools:', JSON.stringify(tools, null, 2))
    
    // Add cache control headers
    const response = NextResponse.json(tools)
    response.headers.set('Cache-Control', 'no-store, max-age=0')
    return response
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}