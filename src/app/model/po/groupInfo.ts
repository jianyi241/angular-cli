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


/**
 * sh_group表
 */
export class GroupInfo {
    attachmentId?: string;
    createTime?: string;
    createUser?: string;
    deleteFlag?: boolean;
    description?: string;
    id?: string;
    name?: string;
    parentId?: string;
    sort?: number;
    subList?: Array<GroupInfo> = new Array<GroupInfo>();
    /**
     * 1:overview 2:information 3:esg 4:features 5:fees&rates 6:find a Bdm 7:change History
     */
    tabType?: number;
    visitUrl?: string;
    updateTime?: string;
    updateUser?: string;
}

