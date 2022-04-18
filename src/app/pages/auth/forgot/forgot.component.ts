import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxLoadingSpinnerService } from '@k-adam/ngx-loading-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastRepository } from '../../../repository/toast-repository';
import { UserRepository } from '../../../repository/user-repository';
import { ResetPasswordEmailComponent } from '../modal/reset-password-email/reset-password-email.component';
@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.less']
})
export class ForgotComponent implements OnInit {
    account = 'zcfu@arcadedevhouse.com.au';

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
        // alert(this.account);
        // if (!this.account) {
        //     this.toastRepository.showSuccess('Email is required.');
        //     return;
        // }
        // this.spinnerService.show();
        // this.userRepository.forgotPassword(this.account).subscribe(res => {
        //     this.spinnerService.hide();
        //     if (res.statusCode === 200) {
        //         this.toastRepository.showSuccess('The reset password email has been sent. Please check your inbox.');
        //     } else {
        //         this.toastRepository.showDanger(res.msg);
        //     }
        // })
        const ngbModalRef = this.ngbModal.open(ResetPasswordEmailComponent, {
            backdrop: 'static',
            size: 'w614',
            windowClass: 'password-modal',
            centered: true
        });
    }
}
