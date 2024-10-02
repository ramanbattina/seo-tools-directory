import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, link, category } = body

    console.log('Received tool submission:', { name, description, link, category })

    // Validate the input
    if (!name || !description || !link || !category) {
      console.log('Missing required fields')
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create a unique key for the tool
    const toolKey = `tool:${Date.now()}:${name.toLowerCase().replace(/\s+/g, '-')}`

    console.log('Storing tool with key:', toolKey)

    // Store the tool in Vercel KV
    await kv.set(toolKey, { name, description, link, category })

    // Add the tool key to the category list
    await kv.sadd(`category:${category}`, toolKey)

    // Log and return the stored data
    const storedTool = await kv.get(toolKey)
    const categoryTools = await kv.smembers(`category:${category}`)
    console.log('Stored tool:', storedTool)
    console.log('Category tools:', categoryTools)

    return NextResponse.json({ 
      message: 'Tool added successfully',
      storedTool,
      categoryTools
    }, { status: 200 })
  } catch (error) {
    console.error('Error adding tool:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}