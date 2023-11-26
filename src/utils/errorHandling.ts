type ErrorType = Error | unknown | string

export const ERROR_MESSAGES = {
    //Error:
    getChartData: "while getting chart data"
}

export function handleError(err: ErrorType) {
    console.error(err)
}