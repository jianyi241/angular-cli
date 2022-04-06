import {GroupInfo} from "../po/groupInfo";
import {PropertyVo} from "./PropertyVo";

export class GroupVo extends GroupInfo {
    propertyVoList?: Array<PropertyVo> = new Array<PropertyVo>();
    subList?: Array<GroupVo> = new Array<GroupVo>();
}
