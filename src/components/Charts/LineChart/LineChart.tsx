import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'

import { ChartData, ChartField } from '@/types/ChartData'

type LineChartProps = {
  data: ChartData
}

export default function CustomLineChart(props: LineChartProps) {
  const { data, fields } = props.data

  return (
    <div className="chart h-80 w-full -ml-3 m-auto linechart">
      <ResponsiveContainer>
        <LineChart
          width={400}
          height={400}
          data={data}
          {...{ overflow: 'visible' }}
        >
          <CartesianGrid vertical={false} />
          {fields.map((field: ChartField) => (
            <Line
              key={field.dataKey}
              type="linear"
              dataKey={field.dataKey}
              stroke={field.color}
              dot={false}
              strokeWidth={6}
              connectNulls={true}
            />
          ))}
          <XAxis dataKey="name" height={50} tickSize={12} interval={1} />
          <YAxis dataKey="online" tickFormatter={(tick) => tick + '%'} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

