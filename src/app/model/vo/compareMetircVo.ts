import {ProductVo} from "./ProductVo";
import {GroupVo} from "./groupVo";
import {PropertyVo} from "./PropertyVo";

export class CompareMetricVo {
    tabVoList?: Array<TabVo> = new Array<TabVo>();
    productVos?: Array<ProductVo> = new Array<ProductVo>();
}

export class TabVo {
    tabType?: number;
    groupVoList?: Array<GroupVo> = new Array<GroupVo>();
    propertyVoList?: Array<PropertyVo> = new Array<PropertyVo>();
}
