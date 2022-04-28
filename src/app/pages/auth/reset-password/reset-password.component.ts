import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxLoadingSpinnerService} from '@k-adam/ngx-loading-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RestPassword} from '../../../model/user';
import {ToastRepository} from '../../../repository/toast-repository';
import {UserRepository} from '../../../repository/user-repository';
import {PasswordResetSuccessfullyComponent} from "../modal/password-reset-successfully/password-reset-successfully.component";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {

    restPassword: RestPassword = new RestPassword();
    validateTip: number = 0
    validatorConfig: NgxValidatorConfig = {
        validationMessages: {
            password: {
                required: 'Password is required.',
            },
            confirmPassword: {
                required: 'Enter password is required.',
            }
        },
        validateOn: 'submit'
    };


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
        // if (!this.restPassword.password || !this.restPassword.confirmPassword) {
        //     this.toastRepository.showDanger('Password is required.');
        //     return;
        // }
        // 正则
        const pwdReg = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,}).{8,}$/
        if (this.restPassword.password !== this.restPassword.confirmPassword) {
            // this.toastRepository.showDanger("Passwords don't match");
            this.validateTip = 1
            return;
        }
        if (!pwdReg.test(this.restPassword.password)) {
            this.validateTip = 2
            console.log('this.showRegTip ===> ', this.validateTip)
            return;
        }
        this.validateTip = 0
        this.spinnerService.show();
        this.userRepository.resetPassword(this.restPassword).subscribe(res => {
            this.spinnerService.hide();
            if (res.statusCode !== 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            const passwordResetSuccessfullyComponent = this.ngbModal.open(PasswordResetSuccessfullyComponent, {
                backdrop: 'static',
                size: 'w614',
                windowClass: 'password-modal',
                centered: true
            });
        });

    }
}
