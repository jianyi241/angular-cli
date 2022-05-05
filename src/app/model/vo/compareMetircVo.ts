import {GroupVo} from "./groupVo";
import {PropertyVo} from "./PropertyVo";
import {ComparisonProductVo} from "./comparisonProductVo";

export class CompareMetricVo {
    tabVoList?: Array<TabVo> = new Array<TabVo>();
    comparisonProductVos?: Array<ComparisonProductVo> = new Array<ComparisonProductVo>();
}

export class TabVo {
    tabType?: number;
    groupVoList?: Array<GroupVo> = new Array<GroupVo>();
    propertyVoList?: Array<PropertyVo> = new Array<PropertyVo>();
}
