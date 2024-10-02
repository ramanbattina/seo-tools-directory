import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, link, category } = body

    // Validate the input
    if (!name || !description || !link || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create a unique key for the tool
    const toolKey = `tool:${Date.now()}:${name.toLowerCase().replace(/\s+/g, '-')}`

    // Store the tool in Vercel KV
    await kv.set(toolKey, { name, description, link, category })

    // Add the tool key to the category list
    await kv.sadd(`category:${category}`, toolKey)

    return NextResponse.json({ message: 'Tool added successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error adding tool:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}