import {Injectable} from '@angular/core';
import {Authentication} from "../model/vo/authentication";
import {Constants} from "../model/constants";
import {Router} from "@angular/router";
import {CurrentUser} from "../model/vo/currentUser";
import {RoleType} from "../model/enums/role-type";
import {RoleInfo} from "../model/po/roleInfo";

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

    authorities(): Array<RoleInfo> {
        return this._authentication.authorities;
    }

    adviceRole(): RoleInfo {
        return this._authentication.authorities.find(a => a.authority != RoleType.SuperAdmin.value);
    }

    isAdmin(): boolean {
        return this._authentication.authorities.some(r => r.authority == RoleType.SuperAdmin.value);
    }

    isAdvice(): boolean {
        return this._authentication.authorities.some(r => r.authority != RoleType.SuperAdmin.value);
    }

    setAuthentication(authentication: Authentication): void {
        this._authentication = authentication;
    }


    get authentication(): Authentication {
        return this._authentication;
    }

    accessLimitation() {
        if (this.adminPaths.includes(this.router.url) && !this.isAdmin()) {
            this.router.navigateByUrl('/login');
        }
    }
}
