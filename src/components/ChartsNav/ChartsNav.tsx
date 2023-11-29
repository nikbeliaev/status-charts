'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { NavSkeleton } from "@/components/Skeleton/Skeleton"
import chartDataService from '@/services/chartsDataService'
import { UserAuth } from '@/context/AuthContext';

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
  const { user } = UserAuth();

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
        <>
        {links.map((link: any[]) => {
          return (
            <ChartLink
              href={`/charts/${link[0]}`}
              text={link[1].title}
              key={link[1].title}
            />
          )
        })}
        {user && (
          <Link href="/upload" className="flex mt-20 items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Import data from .csv
            <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </Link>
        )}
        </>
      ) : (
        <NavSkeleton />
      )}
    </nav>
  )
}
