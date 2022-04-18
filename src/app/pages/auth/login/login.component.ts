import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgxLoadingSpinnerService } from '@k-adam/ngx-loading-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResult } from 'src/app/model/common/http-result';
import { LoginUser } from 'src/app/model/user';
import { LocalStorageObServable } from 'src/app/observable/local-storage-observable';
import { UserRepository } from 'src/app/repository/user-repository';
import { Constants } from "../../../model/constants";
import { ToastRepository } from '../../../repository/toast-repository';
import { CurrentUserService } from "../../../service/current-user.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class LoginComponent {

    public loginUser = new LoginUser();
    public isLogin = false;

    constructor(
        private spinnerService: NgxLoadingSpinnerService,
        private toastRepository: ToastRepository,
        private userRepository: UserRepository,
        private router: Router,
        private currentUserService: CurrentUserService,
        public storage: LocalStorageObServable,
        private ngbModal: NgbModal
    ) {
    }

    loginWithEmail(): void {
        this.loginUser.account = 'monk@arcadedevhouse.com.au';
        this.loginUser.password = 'Bu11dogs';
        const loginObj = { ...this.loginUser };
        this.isLogin = true;
        this.userRepository.login(loginObj).subscribe((result: HttpResult<any>) => {
            if (result.statusCode !== 200) {
                this.isLogin = false;
                this.toastRepository.showDanger(result.msg, 'toastTop');
                return;
            }
            this.storage.setItem(Constants.ACCESS_TOKEN, result.data.accessToken);
            this.spinnerService.show();
            this.userRepository.getCurrentUser().subscribe(userResult => {
                this.spinnerService.hide();
                if (userResult.statusCode !== 200) {
                    this.toastRepository.showDanger(userResult.msg, 'toastTop');
                    return;
                }
                this.storage.setItem(Constants.CURRENT_USER, userResult.data);
                this.currentUserService.setAuthentication(userResult.data);
                this.router.navigateByUrl('/supplier/supplier-tab');
            });
        });
    }


}
