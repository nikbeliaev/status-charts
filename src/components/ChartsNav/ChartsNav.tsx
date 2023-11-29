'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { NavSkeleton } from "@/components/Skeleton/Skeleton"
import chartDataService from '@/services/chartsDataService'

type ChartLinkProps = {
  href: string
  text: string
}

function ChartLink({ href, text }: ChartLinkProps) {
  return (
    <Link href={href} className="block text-blue underline mb-2">
      {text}
    </Link>
  )
}

export default function ChartsNav() {
  const [links, setLinks] = useState<any>([])

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const data = await chartDataService.getAllCharts()
        const linkData = data && Object.entries(data)
        setLinks(linkData)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }

    fetchCharts()
  }, [])

  return (
    <nav className="w-full max-w-5xl bg-gray-50 px-6 py-10 min-h-screen dark:bg-gray-900 m-auto">
      <h1 className="font-bold text-2xl mb-4">Charts</h1>
      {links.length ? (
        links.map((link: any[]) => {
          return (
            <ChartLink
              href={`/charts/${link[0]}`}
              text={link[1].title}
              key={link[1].title}
            />
          )
        })
      ) : (
        <NavSkeleton />
      )}
    </nav>
  )
}
