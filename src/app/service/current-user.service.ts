import {Injectable} from '@angular/core';
import {Authentication} from "../model/vo/authentication";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {CurrentUser} from "../model/vo/currentUser";
import {RoleInfo} from "../model/po/roleInfo";
import {Constants} from "../model/constants";
import {RoleType} from "../model/enums/role-type";

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {
    private _authentication: Authentication;

    private roleMenus = [
        {
            type: RoleType.AdminUser.value,
            menus: ['/']
        },
        {
            type: RoleType.SupplierUser.value,
            menus: ['/profile', '/platform', '/review', '/supplier/supplier-edit', '/supplier/edit-team', '/supplier/comparisons-list', '/post/news-list']
        },
        {
            type: RoleType.AdviceUser.value,
            menus: ['/profile', '/platform', '/advice-practices/advice-tab', '/advice-practices/edit-team','/advice-review', '/due']
        }
    ];

    constructor(private router: Router) {
        let item = localStorage.getItem(Constants.CURRENT_USER);
        if (item) {
            this._authentication = JSON.parse(item);
        }
    }

    updatePrincipal(user: any): void {
        this._authentication.principal = user
        localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(this._authentication))
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

    activeGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (!this.authentication) {
            return this.router.parseUrl('/login');
        }
        if (this.isAdminUser()) {
            return true;
        }
        if (this.isSupplierUser()) {
            return this.roleMenus.some(r => r.type == RoleType.SupplierUser.value && r.menus.some(m => state.url.startsWith(m)));
        }
        if (this.isAdviceUser()) {
            return this.roleMenus.some(r => r.type == RoleType.AdviceUser.value && r.menus.some(m => state.url.startsWith(m)));
        }
        return false;
    }
}
