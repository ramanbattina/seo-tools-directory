import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
  try {
    const categories = ['Keyword Research', 'On-Page SEO', 'Link Building', 'Technical SEO', 'Local SEO']
    const tools = []

    for (const category of categories) {
      const toolKeys = await kv.smembers(`category:${category}`)
      console.log(`Tools for ${category}:`, toolKeys);
      const categoryTools = await Promise.all(toolKeys.map(key => kv.get(key)))
      tools.push({ category, tools: categoryTools })
    }

    console.log('All tools:', tools);
    return NextResponse.json(tools)
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}