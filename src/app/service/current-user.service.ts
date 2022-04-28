import {Injectable} from '@angular/core';
import {Authentication} from "../model/vo/authentication";
import {Router} from "@angular/router";
import {CurrentUser} from "../model/vo/currentUser";
import {RoleInfo} from "../model/po/roleInfo";
import {Constants} from "../model/constants";
import {RoleType} from "../model/enums/role-type";

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {
    private _authentication: Authentication;
    private adminPaths = ['/advice-practices'];

    constructor(private router: Router) {
        let item = localStorage.getItem(Constants.CURRENT_USER);
        if (item) {
            this._authentication = JSON.parse(item);
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

    authorities(): Array<RoleInfo> {
        return this._authentication.authorities;
    }

    isAdminUser(): boolean {
        return this._authentication.authorities.some(r => r.type == RoleType.AdminUser.value);
    }

    isAdviceUser(): boolean {
        return this._authentication.authorities.some(r => r.type == RoleType.AdviceUser.value);
    }

    isSupplierUser(): boolean {
        return this._authentication.authorities.some(r => r.type == RoleType.SupplierUser.value);
    }

    setAuthentication(authentication: Authentication): void {
        this._authentication = authentication;
    }


    get authentication(): Authentication {
        return this._authentication;
    }

    accessLimitation() {
        if (this.adminPaths.includes(this.router.url) && !this.isAdminUser()) {
            this.router.navigateByUrl('/login');
        }
    }
}
