'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { CategoryType } from '@/lib/seoTools'

export default function SEODirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All')
  const [tools, setTools] = useState([])

  useEffect(() => {
    fetch('/api/get-tools')
      .then(response => response.json())
      .then(data => setTools(data))
      .catch(error => console.error('Error fetching tools:', error))
  }, [])

  const filteredTools = tools.flatMap(category => 
    category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || category.category === selectedCategory)
    )
  )

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
          {seoTools.map(category => (
            <option key={category.category} value={category.category}>{category.category}</option>
          ))}
        </select>
      </div>
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
    </div>
  )
}