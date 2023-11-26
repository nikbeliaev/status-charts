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
    const { data, fields } = props.data;

    const customizedGroupTick = (props: CustomizedTickProps) => {
        const { visibleTicksCount, width, height, x, y, payload } = props;    
        return (
            <g>
                <foreignObject width={width/visibleTicksCount} height={height} x={x-payload.offset} y={y}
                    requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
                    <p className="px-3 text-center font-medium">{payload.value}</p>
                </foreignObject>
            </g>
        );
    };

    return(
        <div className="chart h-80 w-full -ml-3 m-auto barchart">
            <ResponsiveContainer>
                <BarChart data={data} width={600} height={300} barGap={  0} {...{overflow: "visible"}}>
                    <XAxis dataKey="title" height={70} tickSize={12} interval={0} tick={customizedGroupTick}/>
                    <YAxis domain={[0, 80]} tickFormatter={(tick) => `${tick}%`} />
                    <CartesianGrid vertical={false}/>
                    {fields.map(({dataKey, color}: ChartField) => (
                            <Bar
                                key={dataKey}
                                dataKey={dataKey}
                                fill={color}
                            >
                                <LabelList dataKey={dataKey} formatter={(label: string) => label + '   '} position="top" />
                            </Bar>
                        )
                    )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}