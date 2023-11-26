export type ChartField = {
    title: string,
    dataKey: string,
    color: string,
}

export type ChartData = {
    id: number,
    type: 'line' | 'bar',
    title: string,
    notes: string,
    data: any[],
    fields: ChartField[],
}