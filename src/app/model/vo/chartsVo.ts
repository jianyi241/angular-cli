export interface PlatformFeeChartsOptions {
    min?: number,
    max?: number,
    seriesData: Array<Array<number>>,
    xAxisValues: Array<any>,
    yAxisValues: Array<any>
}

export interface TotalCostCharts {
    seriesData: Array<any>,
    xAxisValues: Array<any>,
    markIndex?: number
}
