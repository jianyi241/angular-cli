import {Component, OnInit} from '@angular/core';
import {InviteUser, VerifyCode} from "../../../../model/user";
import {UserRepository} from "../../../../repository/user-repository";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {ToastRepository} from "../../../../repository/toast-repository";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {pwdReg} from "../../../../utils/regular";

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
    pwdReg = pwdReg;
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
                required: 'Confirm your password is required.',
                pattern: 'The password should be at least 8 characters.\n' +
                    'The password should include both upper case and lower case letters.\n' +
                    'The password should include at least 1 number.'
            },
            jobTitle: {
                required: 'JobTitle is required.'
            },
            mobile: {
                required: 'Contact number is required.'
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

    fullName(): string {
        return [this.inviteUser.firstName, this.inviteUser.lastName].join(' ');
    }


    invite(): void {
        if (!this.agree) {
            this.toastRepository.showDanger("Please read and agree to the Terms & conditions and Privacy policy.");
            return;
        }

        // if(this.inviteUser.companyType!==2){
        //     if (!this.post) {
        //         this.toastRepository.showDanger("Please agree to have relevant post and updates sent to you.");
        //         return;
        //     }
        // }

        if (this.inviteUser.password !== this.inviteUser.confirmPassword) {
            this.toastRepository.showDanger("Passwords don't match");
            return;
        }
        this.inviteUser.updateNewsFlag = true
        this.inviteUser.commFlag = true
        this.inviteUser.planFlag = true
        this.userRepository.inviteUser(this.inviteUser).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.activeModal.close();
        });
    }

}
