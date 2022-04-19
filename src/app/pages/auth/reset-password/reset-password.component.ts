import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxLoadingSpinnerService} from '@k-adam/ngx-loading-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RestPassword} from '../../../model/user';
import {ToastRepository} from '../../../repository/toast-repository';
import {UserRepository} from '../../../repository/user-repository';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {

    restPassword: RestPassword = new RestPassword();

    constructor(
        private userRepository: UserRepository,
        private spinnerService: NgxLoadingSpinnerService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toastRepository: ToastRepository,
        private ngbModal: NgbModal) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(queryParams => {
            this.restPassword.validToken = queryParams['validToken'];
            this.restPassword.openId = queryParams['openId'];
        })
    }

    resetPassword(): void {
        if (!this.restPassword.password || !this.restPassword.confirmPassword) {
            this.toastRepository.showDanger('Password is required.');
            return;
        }
        if (this.restPassword.password !== this.restPassword.confirmPassword) {
            this.toastRepository.showDanger("Passwords don't match");
            return;
        }
        this.spinnerService.show();
        this.userRepository.resetPassword(this.restPassword).subscribe(res => {
            this.spinnerService.hide();
            if (res.statusCode !== 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            const user = res.data;
            this.toastRepository.showSuccess('Reset Password Success.');
            this.router.navigate(['/login']);
        });
        // const ngbModalRef = this.ngbModal.open(PasswordResetSuccessfullyComponent, {
        //     backdrop: 'static',
        //     size: 'w614',
        //     windowClass: 'password-modal',
        //     centered: true
        // });
    }
}
