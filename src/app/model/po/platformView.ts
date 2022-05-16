import {BaseModel} from "./baseModel";
import {ProductPropInfo} from "./productPropInfo";

export class Group  extends BaseModel{
    attachmentId?:string
    description?: string
    moveFlag?: boolean
    name?: string
    parentId?: string
    properties?: Array<ProductPropInfo>
    sort?: number;
    status?: string; // Normal,Insert,Update,Archive
    subGroups?: Array<Group>;
    tabType?: number;
    versionId?: string;
}

export default class PlatformView<T> {
    freezeData?: T
    groups: Array<Group>
    properties: Array<ProductPropInfo>
}