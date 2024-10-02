import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

type DebugData = {
  [category: string]: {
    keys: string[];
    tools: any[];
  }
}

export async function GET() {
  try {
    const categories = ['Keyword Research', 'On-Page SEO', 'Link Building', 'Technical SEO', 'Local SEO']
    const debug: DebugData = {}

    for (const category of categories) {
      const keys = await kv.smembers(`category:${category}`)
      debug[category] = {
        keys,
        tools: await Promise.all(keys.map(key => kv.get(key)))
      }
    }

    return NextResponse.json(debug)
  } catch (error) {
    console.error('Error debugging KV:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}