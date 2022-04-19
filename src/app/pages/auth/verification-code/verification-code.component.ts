import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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

    constructor(private activatedRoute: ActivatedRoute,
                private userRepository: UserRepository,
                private toastRepository: ToastRepository) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(queryParams => {
            this.verifyCode.token = queryParams['verifyToken'];
            this.verifyCode.openId = queryParams['openId'];
            this.getVerifyEmail({token: this.verifyCode.token, openId: this.verifyCode.openId});
        })
    }

    getVerifyEmail(condition: { token: string, openId: string }): void {

    }

    verify(): void {
        this.userRepository.verifyCode(this.verifyCode).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
        })
    }
}
