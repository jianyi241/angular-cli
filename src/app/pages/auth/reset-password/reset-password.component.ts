import { Component, OnInit } from '@angular/core';
import { UserRepository } from '../../../repository/user-repository';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastRepository } from '../../../repository/toast-repository';
import { NgxLoadingSpinnerService } from '@k-adam/ngx-loading-spinner';
import { RestPassword } from '../../../model/user';

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
        private route: ActivatedRoute,
        private router: Router,
        private toastRepository: ToastRepository) {
    }

    ngOnInit(): void {
        this.restPassword.validToken = this.route.snapshot.params.token;
    }

    confirm(): void {
        if (!this.restPassword.password || !this.restPassword.confirmPassword) {
            this.toastRepository.showDanger('Password is required.');
            return;
        }
        if (this.restPassword.password !== this.restPassword.confirmPassword) {
            this.toastRepository.showDanger('2 passwords do not match');
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
    }
}
