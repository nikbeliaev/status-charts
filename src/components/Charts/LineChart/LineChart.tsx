import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import { useState } from 'react';

import { ChartData, ChartField } from '@/types/ChartData'

type LineChartProps = {
  data: ChartData
}

export default function CustomLineChart(props: LineChartProps) {
  const { data, fields } = props.data
  const [hoveredLine, setHoveredLine] = useState<null | ChartField>(null);

  const mouseEnterHandler = ({dataKey, color, title}: ChartField) => {
    setHoveredLine({dataKey, color, title});
  }

  const mouseLeaveHandler = () => {
    setHoveredLine(null);
  }

  const CustomTooltip = ({ coordinate }: any) => {
    const { x, y } = coordinate;
    
    if (hoveredLine) {
      return (
        <div 
          className={'absolute left-0 top-0 text-white font-bold whitespace-nowrap bg-gray-700 p-2 rounded-md z-50 visible'}
          style={{transform: `translateY(-100%) translateX(${x}px) translateY(${y}px)`}}
          tabIndex={-1} 
        >
          {hoveredLine.title}
        </div>
      );
    }
  
    return null;
  }
  

  return (
    <div className="chart w-full -ml-3 m-auto linechart">
      <ResponsiveContainer aspect={3}>
        <LineChart
          data={data}
          {...{ overflow: 'visible' }}
          onMouseLeave={mouseLeaveHandler}
        >
          <CartesianGrid vertical={false} />
          {fields.map((field: ChartField) => (
            <Line
              key={field.dataKey}
              type="linear"
              dataKey={field.dataKey}
              stroke={field.color}
              dot={false}
              activeDot={false}
              strokeWidth={6}
              connectNulls={true}
              isAnimationActive={false} 
              onMouseEnter={() => mouseEnterHandler(field)}
              
              style={{opacity: hoveredLine ? 0.5 : 1}}
            />
          ))}
          {hoveredLine && <Line
            type="linear"
            style={{filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))'}}
            dataKey={hoveredLine.dataKey}
            stroke={hoveredLine.color}
            dot={false}
            activeDot={false}
            strokeWidth={6}
            connectNulls={true}
            isAnimationActive={false} 
          />}
          <XAxis dataKey="name" height={50} tickSize={12} interval={1} />
          <YAxis dataKey="online" tickFormatter={(tick) => tick + '%'} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

