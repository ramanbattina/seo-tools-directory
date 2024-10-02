'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { CategoryType } from '@/lib/seoTools'

// Define the shape of a tool
interface Tool {
  name: string;
  description: string;
  link: string;
  category: CategoryType;
}

// Define the shape of a category
interface Category {
  category: CategoryType;
  tools: Tool[];
}

export default function SEODirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All')
  const [tools, setTools] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTools = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/get-tools', { 
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tools');
      }
      const data = await response.json();
      console.log('Fetched tools:', JSON.stringify(data, null, 2));
      setTools(data);
    } catch (error) {
      console.error('Error fetching tools:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const filteredTools = tools.flatMap(category => 
    (category.tools || []).filter(tool => 
      tool && tool.name && tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || category.category === selectedCategory)
    )
  )

  const debugTools = async () => {
    try {
      const response = await fetch('/api/debug-kv')
      const data = await response.json()
      console.log('Debug KV data:', JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error debugging KV:', error)
    }
  }

  const refreshTools = () => {
    setIsLoading(true)
    fetch('/api/get-tools', { cache: 'no-store' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tools')
        }
        return response.json()
      })
      .then(data => {
        console.log('Refreshed tools:', JSON.stringify(data, null, 2))
        setTools(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error refreshing tools:', error)
        setError(error.message)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    refreshTools()
  }, [])

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <Input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as CategoryType | 'All')}
          className="p-2 border rounded"
        >
          <option value="All">All Categories</option>
          {tools.map(category => (
            <option key={category.category} value={category.category}>{category.category}</option>
          ))}
        </select>
      </div>
      {isLoading && <p>Loading tools...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <>
          <p>Total categories: {tools.length}</p>
          <p>Total tools: {tools.reduce((sum, category) => sum + (category.tools ? category.tools.length : 0), 0)}</p>
          {filteredTools.length === 0 && <p>No tools found.</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map(tool => (
              <Card key={tool.name}>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/tools/${tool.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:underline">
                      {tool.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                  <div className="mt-4 flex justify-end">
                    <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Visit Tool
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <button onClick={debugTools} className="mt-4 p-2 bg-gray-200 rounded">Debug KV</button>
          <button onClick={fetchTools} className="mt-4 p-2 bg-blue-500 text-white rounded">Refresh Tools</button>
        </>
      )}
    </div>
  )
}