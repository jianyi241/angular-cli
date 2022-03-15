import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResult } from 'src/app/model/common/http-result';
import { LoginUser } from 'src/app/model/user';
import { UserRepository } from 'src/app/repository/user-repository';
import { LocalStorageObServable } from 'src/app/observable/local-storage-observable';
import { ToastRepository } from '../../../repository/toast-repository';
import { NgxLoadingSpinnerService } from '@k-adam/ngx-loading-spinner';


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
        public localStorageObservrable: LocalStorageObServable
    ) {
    }

    loginWithEmail(): void {
        const loginObj = { ...this.loginUser };
        this.isLogin = true;
        this.userRepository.login(loginObj).subscribe((result: HttpResult<any>) => {
            if (result.statusCode !== 200) {
                this.isLogin = false;
                this.toastRepository.showDanger(result.msg, 'toastTop');
                return;
            }
            this.localStorageObservrable.setItem('accessToken', result.data.accessToken);
            this.spinnerService.show();
            this.userRepository.getCurrentUser().subscribe(userResult => {
                this.spinnerService.hide();
                if (userResult.statusCode !== 200) {
                    this.toastRepository.showDanger(userResult.msg, 'toastTop');
                    return;
                }
                this.localStorageObservrable.setItem('UserInfo', userResult.data);
                // this.router.navigate(['Home']);
                alert('login success');
            });
        });
    }
}
