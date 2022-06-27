import {Attachment} from "../attachment";
import {ComparisonCommentInfo} from "./comparisonCommentInfo";

export interface Product {
    id?: string
    name?: string
    versionId?: string
    shProductId?: string
    platformName?: string
    scopes?: Array<{ productId: string; scope: number; value: number }>
    warningMessage?: Array<string>
    warning?: boolean
}

export interface Platform {
    id?: string
    shProductId?: string
    productName?: string
    attachmentVo?: Attachment
    products?: Array<Product>
    comparisonComment?: ComparisonCommentInfo
    showFlag?: boolean
    shComparisonId?: string
}

export class FeeReviewChart {
    scopes?: Array<number> = new Array<number>()
    platforms?: Array<Platform> = new Array<Platform>()
    totalBalance?: number
}
