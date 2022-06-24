import {Attachment} from "../attachment";

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

interface Platform {
    shProductId?: string
    productName?: string
    attachmentVo?: Attachment
    products?: Array<Product>
}

export class FeeReviewChart {
    scopes?: Array<number> = new Array<number>()
    platforms?: Array<Platform> = new Array<Platform>()
    totalBalance?: number
}
