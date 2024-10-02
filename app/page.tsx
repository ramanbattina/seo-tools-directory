import SEODirectory from '@/components/SEODirectory'

export const metadata = {
  title: 'SEO Tools and Resources Directory',
  description: 'A comprehensive directory of SEO tools and resources for digital marketers, website owners, and SEO professionals.',
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">SEO Tools and Resources Directory</h1>
      <SEODirectory />
    </main>
  )
}