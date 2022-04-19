import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxLoadingSpinnerService} from '@k-adam/ngx-loading-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastRepository} from '../../../repository/toast-repository';
import {UserRepository} from '../../../repository/user-repository';
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.less']
})
export class ForgotComponent implements OnInit {
    account: string;
    validatorConfig: NgxValidatorConfig = {
        validationMessages: {
            account: {
                required: 'Email is required.',
            },
        },
        validateOn: 'submit'
    };

    constructor(
        private router: Router,
        private spinnerService: NgxLoadingSpinnerService,
        private userRepository: UserRepository,
        private toastRepository: ToastRepository,
        private ngbModal: NgbModal) {
    }

    ngOnInit(): void {
    }

    sendForgotEmail(): void {
        this.spinnerService.show();
        this.userRepository.forgotPassword(this.account).subscribe(res => {
            this.spinnerService.hide();
            if (res.statusCode === 200) {
                this.toastRepository.showSuccess('The reset password email has been sent. Please check your inbox.');
            } else {
                this.toastRepository.showDanger(res.msg);
            }
        })
        // const ngbModalRef = this.ngbModal.open(ResetPasswordEmailComponent, {
        //     backdrop: 'static',
        //     size: 'w614',
        //     windowClass: 'password-modal',
        //     centered: true
        // });
    }
}
