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

    }


}
