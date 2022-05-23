import {BaseModel} from "./baseModel";

export class ClientInfo extends BaseModel{
    firstName?: string;
    lastName?: string;
    email?: string;
    description?: string;
    userId?: string;
    archived?: boolean;
}
