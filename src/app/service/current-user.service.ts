import {Injectable} from '@angular/core';
import {CurrentUser} from "../model/vo/currentUser";
import {RoleInfo} from "../model/po/roleInfo";

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {
    principal: CurrentUser;
    private authorities: Array<RoleInfo> = new Array<RoleInfo>();

    constructor() {
    }



}
