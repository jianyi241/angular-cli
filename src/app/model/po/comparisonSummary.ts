import {GroupInfo} from "./groupInfo";
import {ProductPropInfo} from "./productPropInfo";
import {ComparisonFeeInfo} from "./comparisonFeeInfo";

export default class ComparisonSummary {
    comparisonTabs?: Array<GroupInfo> = new Array<GroupInfo>();
    products?: Array<ProductPropInfo> = new Array<ProductPropInfo>();
    scopes?: Array<number> = new Array<number>();
    totalBalance?: number;
    fee: ComparisonFeeInfo = new ComparisonFeeInfo();
}
