import {Component, OnInit} from '@angular/core';
import {LocalStorageObServable} from '../../observable/local-storage-observable';
import {Router} from '@angular/router';
import {CurrentUser} from '../../model/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
    currentUser: CurrentUser;

    constructor(
        private localStorageService: LocalStorageObServable,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.localStorageService.getItem('UserInfo').subscribe((val) => {
            if (!val) {
                this.router.navigate(['/login']);
            } else {
                this.currentUser = val;
            }
        });
    }

    logout(): void {
        this.localStorageService.removeItem('accessToken');
        this.localStorageService.removeItem('openId');
        this.localStorageService.removeItem('UserInfo');
    }

}
