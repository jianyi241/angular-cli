import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Subscription} from 'rxjs';
import {LocalStorageObServable} from "./observable/local-storage-observable";
import {ToastRepository} from './repository/toast-repository';
import {CurrentUserService} from "./service/current-user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    private readonly routerEventsListener: Subscription;
    message;
    title: any;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public toastRepository: ToastRepository,
        private storage: LocalStorageObServable,
        private currentUserService: CurrentUserService,
        private modalService: BsModalService
    ) {
        this.routerEventsListener = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                toastRepository.showLoading(true);
            }
            if (event instanceof NavigationEnd) {
                toastRepository.showLoading();
            }
        })
        this.modalService.config.ignoreBackdropClick = true; // 设置全局的禁止backdrop点击关闭 modal
    }


    ngOnDestroy(): void {
        this.routerEventsListener && this.routerEventsListener.unsubscribe();
    }

}



