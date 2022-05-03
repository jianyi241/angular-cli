import {CanLoad, Route, UrlSegment, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

/**
 * Authorized User Module
 * */
@Injectable()
export class AuthLoadGuard implements CanLoad {
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return false;
    }
}
