import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ToastRepository} from "../repository/toast-repository";
import {CurrentUserService} from "../service/current-user.service";
import {Injectable} from "@angular/core";

/**
 * Authorized User Routing
 * */
@Injectable()
export class AuthActivateChildGuard implements CanActivateChild {
    constructor(private toastRepository: ToastRepository, private currentUserService: CurrentUserService) {
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.currentUserService.activeGuard(childRoute, state);
    }

}
