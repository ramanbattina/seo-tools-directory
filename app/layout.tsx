import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'SEO Tools and Resources Directory',
    template: '%s | SEO Tools and Resources Directory',
  },
  description: 'A comprehensive directory of SEO tools and resources for digital marketers, website owners, and SEO professionals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href="/" className="mr-4">Home</Link>
          <Link href="/submit">Submit a Tool</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}