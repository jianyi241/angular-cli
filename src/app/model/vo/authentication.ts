import {CurrentUser} from "./currentUser";
import {RoleInfo} from "../po/roleInfo";

export class Authentication {
    principal: CurrentUser;
    authorities?: Array<RoleInfo> = new Array<RoleInfo>();
    name: string;
}
