export type ChartField = {
    title: string,
    dataKey: string,
    color: string,
}

export type ChartData = {
    type: 'line' | 'bar',
    title: string,
    notes: string,
    data: any[],
    fields: ChartField[],
    units?: {
        axis?: string,
        data?: string
    },
    domain?: {
        min?: number,
        max?: number,
    }
}