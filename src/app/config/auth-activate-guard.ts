import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ToastRepository} from "../repository/toast-repository";
import {CurrentUserService} from "../service/current-user.service";

/**
 * Authorized User Routing
 * */
@Injectable()
export class AuthActivateGuard implements CanActivate {
    constructor(private toastRepository: ToastRepository, private currentUserService: CurrentUserService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.currentUserService.activeGuard(route, state);
    }
}
