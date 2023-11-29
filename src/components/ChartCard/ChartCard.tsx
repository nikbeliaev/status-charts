'use client'
import { useEffect, useState } from 'react'

import LineChart from '../Charts/LineChart/LineChart'
import BarChart from '../Charts/BarChart/BarChart'
import Legend from '../Legend/Legend'
import {
  TitleSkeleton,
  NotesSkeleton,
  LegendSkeleton,
  ChartSkeleton,
} from '../Skeleton/Skeleton'

import chartDataService from '@/services/chartsDataService'

import { ChartData } from '@/types/ChartData'
import { handleError } from '@/utils/errorHandling'

type ChartCardProps = {
  chartId: string
}

export default function ChartCard({ chartId }: ChartCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<null | ChartData>(null)


    useEffect(() => {
      const fetchChartData = async () => {
        try {
          const data = await chartDataService.getChartData(chartId);
          console.log(data)
          setData(data);
        } catch (e) {
          handleError(e)
        } finally {
          setIsLoading(false)
        }
      };

      fetchChartData();
    }, [])

  return (
    <article className="w-5/6 min-w-[600px] m-auto border border-[#E4E4E4] dark:border-gray-700 rounded-md">
      <header className="mb-3 px-4 py-3 bg-[#E4E4E4] dark:bg-gray-800">
        {isLoading ? (
          <TitleSkeleton />
        ) : (
          data && <h1 className="font-bold text-xl leading-6">{data.title}</h1>
        )}
      </header>
      {isLoading ? (
        <NotesSkeleton />
      ) : (
        data &&
        data.notes && (
          <p className="mb-6 px-4 text-lg font-medium">{data.notes}</p>
        )
      )}
      {isLoading ? <LegendSkeleton /> : data && <Legend data={data} />}
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        data &&
        (() => {
          switch (data.type) {
            case 'line':
              return <LineChart data={data} />
            case 'bar':
              return <BarChart data={data} />
            default:
              return null
          }
        })()
      )}
    </article>
  )
}
