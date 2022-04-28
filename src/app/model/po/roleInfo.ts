import {BaseModel} from "./baseModel";

export class RoleInfo extends BaseModel{
    roleName?: string;
    roleDesc?: string;
    authority?: string;
    type?: number;
}
