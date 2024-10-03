import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CategoryType, Tool, Category } from '@/lib/seoTools'

export async function GET() {
  try {
    const categories: CategoryType[] = ['Keyword Research', 'On-Page SEO', 'Link Building', 'Technical SEO', 'Local SEO']
    const tools: Category[] = []

    for (const category of categories) {
      console.log(`Fetching tools for category: ${category}`)
      const toolKeys = await kv.smembers(`category:${category}`)
      console.log(`Keys for ${category}:`, toolKeys)

      const categoryTools = await Promise.all(toolKeys.map(async key => {
        try {
          const tool = await kv.get(key) as Tool | null
          console.log(`Tool for key ${key}:`, tool)
          if (tool && !tool.slug) {
            tool.slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            await kv.set(key, tool)  // Update the tool with the new slug
          }
          return tool
        } catch (error) {
          console.error(`Error fetching tool for key ${key}:`, error)
          return null
        }
      }))

      tools.push({ category, tools: categoryTools.filter((tool): tool is Tool => tool !== null) })
    }

    console.log('All tools:', JSON.stringify(tools, null, 2))
    
    const response = NextResponse.json(tools)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}