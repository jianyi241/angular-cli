import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxLoadingSpinnerService} from '@k-adam/ngx-loading-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RestPassword} from '../../../model/user';
import {ToastRepository} from '../../../repository/toast-repository';
import {UserRepository} from '../../../repository/user-repository';
import {
    PasswordResetSuccessfullyComponent
} from "../modal/password-reset-successfully/password-reset-successfully.component";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {pwdReg} from "../../../utils/regular";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {

    restPassword: RestPassword = new RestPassword();
    pwdReg = pwdReg
    validatorConfig: NgxValidatorConfig = {
        validationMessages: {
            password: {
                required: 'Password is required.',
            },
            confirmPassword: {
                required: 'Enter password is required.',
                pattern: 'The password should be at least 8 characters.\n' +
                    'The password should include both upper case and lower case letters.\n' +
                    'The password should include at least 1 number.'
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
        if (!this.restPassword.password || !this.restPassword.confirmPassword) {
            this.toastRepository.showDanger('Passwords dont match');
            return;
        }
        // 正则
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
