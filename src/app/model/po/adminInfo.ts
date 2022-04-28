import {Attachment} from "../attachment";
import {CompanyType} from "../enums/company-type";
import {BaseModel} from "./baseModel";

/**
 * 管理员实体
 */
export class AdminInfo extends BaseModel{
    accountType?: string;
    adviceRoleId?: string;
    arn?: string;
    avatar?: Attachment = new Attachment();
    companyId?: string;
    companyType?: CompanyType;
    confirmPassword: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    openId?: string;
    password?: string;
    practiceName: string;
    practiceRoleId?: string;
    receiveNewsFlag?: boolean;
    role?: string;
    status?: string;
    supplierName?: string;
    validCode?: string;
    validToken?: number;
}

