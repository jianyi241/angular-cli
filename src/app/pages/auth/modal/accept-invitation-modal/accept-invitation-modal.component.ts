import {Component, OnInit} from '@angular/core';
import {InviteUser, VerifyCode} from "../../../../model/user";
import {UserRepository} from "../../../../repository/user-repository";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {ToastRepository} from "../../../../repository/toast-repository";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-accept-invitation-modal',
    templateUrl: './accept-invitation-modal.component.html',
    styleUrls: ['./accept-invitation-modal.component.less']
})
export class AcceptInvitationModalComponent implements OnInit {
    inviteUser: InviteUser = new InviteUser();
    verification: VerifyCode = new VerifyCode();
    agree = false;
    news = false;
    validatorConfig: NgxValidatorConfig = {
        validationMessages: {
            firstName: {
                required: 'First name is required.',
            },
            lastName: {
                required: 'Last name is required.',
            },
            password: {
                required: 'Password is required.',
            },
            confirmPassword: {
                required: 'Confirm your password is required.'
            }
        },
        validateOn: 'submit'
    };

    constructor(private userRepository: UserRepository,
                private activeModal: NgbActiveModal,
                private toastRepository: ToastRepository) {
    }

    ngOnInit(): void {
        this.userRepository.queryInvitationInfo(this.verification).subscribe(res => {
            this.inviteUser = res.data;
        });
    }


    invite(): void {
        if (!this.agree) {
            return;
        }
        if (!this.news) {
            return;
        }
        if (this.inviteUser.password !== this.inviteUser.confirmPassword) {
            return;
        }
        this.userRepository.inviteUser(this.inviteUser).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.activeModal.close();
        });
    }

}
