import { ChartData } from '@/types/ChartData'

type ChartLegendProps = {
    data: ChartData
}

const LegendTypeStyles = {
    line: 'w-6 h-1.5',
    bar: 'w-3 h-3 rounded-full'
}

export default function ChartLegend({ data }: ChartLegendProps) {
    return (
    <div className="flex flex-wrap mb-6 px-4">
        {data.fields.map((field) => {
            return (
                <div key={field.dataKey} className="flex items-center mr-6 mb-4">
                    <div style={{background: field.color}} className={LegendTypeStyles[data.type]}></div>
                    <span className="ml-2">{field.title}</span>
                </div>
            )
        })}
    </div>
    )
}