import {
    BarChart,
    LabelList,
    Bar,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts"

import { ChartData, ChartField } from "@/types/ChartData";


type BarChartProps = {
    data: ChartData
}

type CustomizedTickProps = {
    visibleTicksCount: number,
    width: number,
    height: number,
    x: number,
    y: number,
    payload: {
        offset: number,
        value: string
    }
}

export default function CustomBarChart(props: BarChartProps) {
    const { data, fields, units, domain } = props.data;
    const customizedGroupTick = (props: CustomizedTickProps) => {
        const { visibleTicksCount, width, height, x, y, payload } = props;    
        return (
            <g>
                <foreignObject 
                    width={width/visibleTicksCount}
                    height={height}
                    x={x-payload.offset}
                    y={y}
                    requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
                    style={{overflow: "visible"}}
                >
                    <p className="px-3 text-center font-medium break-words hyphens-auto">{payload.value}</p>
                </foreignObject>
            </g>
        );
    };

    return(
        <div className="chart w-full -ml-3 m-auto barchart">
            <ResponsiveContainer aspect={3}>
                <BarChart data={data} barGap={0} {...{overflow: "visible"}}>
                    <XAxis dataKey="title" height={70} tickSize={12} interval={0} tick={customizedGroupTick}/>
                    <YAxis
                        domain={[Number(domain?.min) || 'auto', Number(domain?.max) || 'auto']}
                        unit={units?.axis || ""} />

                    <CartesianGrid vertical={false}/>
                    {fields.map(({dataKey, color}: ChartField) => (
                            <Bar
                                key={dataKey}
                                dataKey={dataKey}
                                fill={color}
                            >
                                <LabelList dataKey={dataKey} formatter={(label: string) => label + (units?.data || "")} position="top" />
                            </Bar>
                        )
                    )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}