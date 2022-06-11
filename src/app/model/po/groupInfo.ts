/**
 * Suitability Hub
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import {Attachment} from "../attachment";
import {PropertyInfo} from "./propertyInfo";
import {BaseModel} from "./baseModel";

/**
 * sh_group表
 */
export class GroupInfo extends BaseModel{
    attachmentId?: string;
    description?: string;
    name?: string;
    parentName?: string;
    parentId?: string;
    sort?: number;
    newSort?: number;
    status?: string;
    subList?: Array<GroupInfo> = new Array<GroupInfo>();
    propertyVoList?: Array<PropertyInfo> = new Array<PropertyInfo>();
    /**
     * 1:overview 2:information 3:esg 4:features 5:fees&rates 6:find a Bdm 7:change History
     */
    tabType?: number;
    moveFlag?: boolean;
    readOnly?: boolean;
    attachmentVo: Attachment = new Attachment();
    totalPropCount?: number;
    groups: Array<GroupInfo> = new Array<GroupInfo>();
    properties?: Array<PropertyInfo> = new Array<PropertyInfo>();
    selectedPropCount?: number;
}

