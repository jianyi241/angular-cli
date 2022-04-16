import {Injectable} from '@angular/core';
import {Authentication} from "../model/vo/authentication";
import {Constants} from "../model/constants";
import {Router} from "@angular/router";
import {CurrentUser} from "../model/vo/currentUser";
import {RoleType} from "../model/enums/role-type";

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {
    private _authentication: Authentication;

    constructor(private router: Router) {
        let item = localStorage.getItem(Constants.CURRENT_USER);
        if (item) {
            this._authentication = JSON.parse(item);
        } else {
            this.router.navigateByUrl('/login');
        }
    }

    fullName(): string {
        if (!this._authentication) {
            return;
        }
        let names = [this._authentication.principal.firstName, this._authentication.principal.lastName]
        return names.filter(n => n).join(" ");
    }

    currentUser(): CurrentUser {
        return this._authentication?.principal;
    }





    isAdmin(): boolean {
        return this._authentication.authorities.some(r => r.authority == RoleType.AccountAdmin.value);
    }

    setAuthentication(authentication: Authentication): void {
        this._authentication = authentication;
    }


    get authentication(): Authentication {
        return this._authentication;
    }
}
