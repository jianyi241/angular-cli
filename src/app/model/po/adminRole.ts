import {BaseModel} from "./baseModel";

/**
 * 管理员角色实体
 */
export class AdminRole extends BaseModel{
    roleName?: string;
    roleDesc?: string;
    authority?: string;
    type?: number;
}
