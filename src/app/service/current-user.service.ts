import {Injectable} from '@angular/core';
import {Authentication} from "../model/vo/authentication";
import {Constants} from "../model/constants";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {
    authentication: Authentication;

    constructor(private router: Router) {
        let item = localStorage.getItem(Constants.CURRENT_USER);
        if (item) {
            this.authentication = JSON.parse(item);
        } else {
            this.router.navigateByUrl('/login');
        }
    }


}
