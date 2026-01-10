import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StackReferee - Avoid the Wrong Tech Stack',
  description: 'Make technology decisions you won\'t regret in 6 months. AI-powered guidance for students and startups.',
  keywords: 'tech stack, technology decisions, startup, student projects, avoid mistakes, architecture decisions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}