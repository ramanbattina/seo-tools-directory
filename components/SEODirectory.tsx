'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, BarChart, Globe, Link as LinkIcon, FileText, Zap } from "lucide-react"
import Link from "next/link"
import { seoTools, CategoryType } from '@/lib/seoTools'

export default function SEODirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All')

  const filteredTools = seoTools.map(category => ({
    ...category,
    tools: category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    selectedCategory === 'All' || category.category === selectedCategory
  )

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </Button>
          {seoTools.map((category) => (
            <Button
              key={category.category}
              variant={selectedCategory === category.category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.category)}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((category) => (
          <Card key={category.category} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              {category.tools.length > 0 ? (
                <ul className="space-y-2">
                  {category.tools.map((tool) => (
                    <li key={tool.name}>
                      <Link href={tool.link} target="_blank" rel="noopener noreferrer" className="block hover:bg-muted p-2 rounded transition-colors">
                        <CardTitle className="text-base">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No tools found in this category.</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}