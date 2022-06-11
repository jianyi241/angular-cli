import {GroupInfo} from "./groupInfo";
import {ProductPropInfo} from "./productPropInfo";

export default class ComparisonSummary {
    comparisonTabs?: Array<GroupInfo> = new Array<GroupInfo>();
    products?: Array<ProductPropInfo> = new Array<ProductPropInfo>();
}
