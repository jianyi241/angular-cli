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


import {RoleInfo} from "./roleInfo";
import {Attachment} from "../attachment";
import {SupplierPublicDetailInfo} from "./supplierPublicDetailInfo";
import {SupplierUserProductInfo} from "./supplierUserProductInfo";

/**
 * sh_team表
 */
export class TeamInfo {
    arn?: string;
    attachmentVo?: Attachment;
    bdmFlag?: boolean;
    commFlag?: boolean;
    companyId?: string;
    /**
     * 1practice,2supplier
     */
    companyType?: number;
    createTime?: string;
    createUser?: string;
    deleteFlag?: boolean;
    email?: string;
    firstName?: string;
    id?: string;
    lastName?: string;
    loginTime?: string;
    mobile?: string;
    openId?: string;
    planFlag?: boolean;
    practiceRoleId?: string;
    practiceRoleName?: string;
    practiceRoleVos?: Array<RoleInfo>;
    receiveNewsFlag?: boolean;
    roleId?: string;
    roleName?: string;
    /**
     * Active,Pending,Disable
     */
    status?: string;
    supplierPublicDetailVo: SupplierPublicDetailInfo = new SupplierPublicDetailInfo() ;
    supplierUserProductVoList: Array<SupplierUserProductInfo> = new Array<SupplierUserProductInfo>();
    updateNewsFlag?: boolean;
    updateTime?: string;
    updateUser?: string;
    userId?: string;
}




