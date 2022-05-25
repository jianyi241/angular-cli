import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VerifyCode} from "../../../model/user";
import {UserRepository} from "../../../repository/user-repository";
import {ToastRepository} from "../../../repository/toast-repository";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";

@Component({
    selector: 'app-verification-code',
    templateUrl: './verification-code.component.html',
    styleUrls: ['./verification-code.component.less']
})
export class VerificationCodeComponent implements OnInit,OnDestroy {
    verifyCode: VerifyCode = new VerifyCode();
    email: string;
    currentTab: number = 1;
    validateTip: number = 0;
    timer: any = null;
    validatorConfig: NgxValidatorConfig = {
        validationMessages: {
            verifyCode: {
                required: 'Verification Code is required.'
            }
        },
        validateOn: 'submit'
    };

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
            if (this.getCountDown() > 0) {
                this.timerInterval()
            }
        })
    }

    ngOnDestroy() {
        this.clear()
    }

    getCountDown(): number {
        return Number.parseInt(sessionStorage.getItem('countDown') || '0');
    }

    timerInterval(): void {
        this.clear()
        let countDown = Number.parseInt(sessionStorage.getItem('countDown'))
        if (!countDown || countDown <= 0) {
            sessionStorage.setItem('countDown', '60')
            countDown = Number.parseInt(sessionStorage.getItem('countDown'))
        }
        this.timer = setInterval(() => {
            countDown--
            sessionStorage.setItem('countDown', countDown.toString())
            if (countDown <= 0) {
                this.clear()
            }
        }, 1000)
    }
    clear() {
        clearInterval(this.timer)
        this.timer = null
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
            this.timerInterval()
            this.toastRepository.showSuccess('The valid code email has been sent. Please check your inbox.');
            this.router.navigateByUrl(`/verification?validToken=${res.data.token}&openId=${res.data.openId}`)
        });
    }

    verify(): void {
        // if (!this.verifyCode.code) {
        //     this.toastRepository.showDanger('Verification code is required.');
        //     return;
        // }
        this.userRepository.verifyCode(this.verifyCode).subscribe(res => {
            if (res.statusCode != 200) {
                this.validateTip = 1
                // this.toastRepository.showDanger(res.msg);
                return;
            }
            this.validateTip = 0
            this.toastRepository.showSuccess('Verification successfully.');
            this.router.navigateByUrl('/login');
        });
    }
}
