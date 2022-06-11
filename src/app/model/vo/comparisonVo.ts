import {ComparisonInfo} from "../po/comparisonInfo";


export class ComparisonVo extends ComparisonInfo{
    clientName?: string;
    mainPlatformCheck = true;
    feeProducts: Array<string> = new Array<string>();
    nonFeeProducts: Array<string> = new Array<string>();
    feeProductName?: string;
    nonFeeProductName?: string;
    remark?: string;
    disclaimer?: string
}

