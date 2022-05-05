import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VerifyCode} from "../../../model/user";
import {UserRepository} from "../../../repository/user-repository";
import {ToastRepository} from "../../../repository/toast-repository";

@Component({
    selector: 'app-verification-code',
    templateUrl: './verification-code.component.html',
    styleUrls: ['./verification-code.component.less']
})
export class VerificationCodeComponent implements OnInit {
    verifyCode: VerifyCode = new VerifyCode();
    email: string;
    currentTab: number = 1;

    constructor(private activatedRoute: ActivatedRoute,
                private userRepository: UserRepository,
                private router: Router,
                private toastRepository: ToastRepository) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(queryParams => {
            this.verifyCode.token = queryParams['validToken'];
            this.verifyCode.openId = queryParams['openId'];
            this.getVerifyEmail();
        })
    }

    getVerifyEmail(): void {
        this.userRepository.queryInvitationInfo(this.verifyCode).subscribe(res => {
            if (res.statusCode != 200) {
                return
            }
            this.currentTab = res.data.companyType
            this.email = res.data.email;
        });
    }

    resend(): void {
        this.userRepository.resendActiveEmail(this.verifyCode.openId).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess('The valid code email has been sent. Please check your inbox.');
            this.router.navigateByUrl(`/verification?validToken=${res.data.token}&openId=${res.data.openId}`)
        });
    }

    verify(): void {
        if (!this.verifyCode.code) {
            this.toastRepository.showDanger('Verification code is required.');
            return;
        }
        this.userRepository.verifyCode(this.verifyCode).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess('Verification successfully.');
            this.router.navigateByUrl('/login');
        });
    }
}
