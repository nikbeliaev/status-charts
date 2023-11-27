'use client';
import { useEffect, useState } from 'react';

import LineChart from "../Charts/LineChart/LineChart"
import BarChart from "../Charts/BarChart/BarChart"
import Legend from "../Legend/Legend";

import chartDataService from '@/services/chartsDataService';

import { ChartData } from '@/types/ChartData';


type ChartCardProps = {
  chartId: string,
}

export default function ChartCard({ chartId }: ChartCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<null | ChartData>(null);

  useEffect(() => {
    chartId && (async function() {
      setIsLoading(true);
      const chartData = await chartDataService.getChartData(chartId);
      setIsLoading(false);
      if (chartData) {
        setData(chartData)
      } 
    })()
  }, [chartId]);

  return (
    data && (<article className="w-5/6 min-w-[600px] m-auto border border-[#E4E4E4] rounded-md">
      <header className="mb-3 px-4 py-3 bg-[#E4E4E4]">
        <h1 className="font-bold text-xl leading-6">{data.title}</h1>
      </header>
      {data.notes && (
        <p className="mb-6 px-4 text-lg font-medium">{data.notes}</p>
      )}
      <Legend data={data} />
      {(() => {
        switch (data.type) {
          case 'line':
            return <LineChart data={data} />
          case 'bar':
            return <BarChart data={data} />
          default:
            return null
        }
      })()}
    </article>)
  )
}
