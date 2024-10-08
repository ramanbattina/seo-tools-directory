import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CategoryType } from '@/lib/seoTools'

type DebugData = {
  [category: string]: {
    keys: string[];
    tools: any[];
  }
}

export async function GET() {
  try {
    const categories: CategoryType[] = ['Keyword Research', 'On-Page SEO', 'Link Building', 'Technical SEO', 'Local SEO']
    const debug: DebugData = {}

    for (const category of categories) {
      const keys = await kv.smembers(`category:${category}`)
      debug[category] = {
        keys,
        tools: await Promise.all(keys.map(key => kv.get(key)))
      }
    }

    console.log('Debug data:', JSON.stringify(debug, null, 2))
    return NextResponse.json(debug)
  } catch (error) {
    console.error('Error debugging KV:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}