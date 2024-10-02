import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
  try {
    const categories = ['Keyword Research', 'On-Page SEO', 'Link Building', 'Technical SEO', 'Local SEO']
    const tools = []

    for (const category of categories) {
      const toolKeys = await kv.smembers(`category:${category}`)
      console.log(`Keys for ${category}:`, toolKeys)

      const categoryTools = await Promise.all(toolKeys.map(async key => {
        const tool = await kv.get(key)
        console.log(`Tool for key ${key}:`, tool)
        return tool
      }))

      tools.push({ category, tools: categoryTools.filter(Boolean) })
    }

    console.log('All tools:', JSON.stringify(tools, null, 2))
    return NextResponse.json(tools)
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}