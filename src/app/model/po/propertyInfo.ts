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
 * sh_property表
 */
export class PropertyInfo {
    createTime?: string;
    createUser?: string;
    deleteFlag?: boolean;
    description?: string;
    id?: string;
    name?: string;
    subGroupName?: string;
    topGroupName?: string;
    shGroupId?: string;
    sort?: number;
    /**
     * 0:not active 1:active
     */
    status?: number;
    /**
     * 1:overview 2:information 3:esg 4:features 5:fees&rates 6:find a Bdm 7:change History
     */
    tabType?: number;
    /**
     * 1:long text 2:Short text 3:Boolean  4:Integer  5:Attachment
     */
    type?: number;
    updateTime?: string;
    updateUser?: string;
}

