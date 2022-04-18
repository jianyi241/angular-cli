import {Component} from '@angular/core';
import {ActivatedRoute, ActivationEnd, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ToastRepository} from './repository/toast-repository';
import {Subscription} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap/modal';
import {LocalStorageObServable} from "./observable/local-storage-observable";
import {Constants} from "./model/constants";
import {CurrentUserService} from "./service/current-user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    private routerEventsListener: Subscription;
    excludes: string[] = ['/login', '/forgot', '/reset', '/order/new', '/order/cancel', '/TV'];
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
            if (event instanceof ActivationEnd) {
                this.checkAuthentication();
            }
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

    private checkAuthentication(): void {
        //If the current route does not require a login
        if (this.excludes.some(e => this.router.isActive(e, false))) {
            return;
        }
        this.storage.getItem(Constants.CURRENT_USER).subscribe((val) => {
            //If the current route requires login, but there is no user information
            if (!val) {
                this.router.navigateByUrl('/login');
            }
            // Routing access rights restrictions
            this.currentUserService.accessLimitation();
        });
    }

}



