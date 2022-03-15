import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastRepository} from '../../../repository/toast-repository';
import {NgxLoadingSpinnerService} from '@k-adam/ngx-loading-spinner';
import {UserRepository} from '../../../repository/user-repository';

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
        private toastRepository: ToastRepository) {
    }

    ngOnInit(): void {
    }

    sendForgotEmail(): void {
        alert(this.account);
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
        // });
    }
}
