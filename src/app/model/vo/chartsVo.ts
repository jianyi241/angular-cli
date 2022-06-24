export interface FeeReviewChartsProduct {
    index?: number
    platformName?: string
    produceName?: string
    warning?: boolean
    warningMessage?: Array<string>
    mainFlag?: boolean
    visitUrl?: string
    // 折线图属性
    lineData?: Array<number>
    lineColor?: string
}

export interface PlatformFeeChartsOptions {
    id?: string;
    min?: number
    max?: number;
    seriesData: Array<Array<number>>;
    xAxisValues: Array<number>;
    yAxisValues: Array<FeeReviewChartsProduct>;
    totalBalance: number;
}

export interface TotalCostChartsOptions {
    seriesData: Array<FeeReviewChartsProduct>;
    xAxisValues: Array<number>;
    markIndex?: number;
    max?: number;
    totalBalance: number;
}
