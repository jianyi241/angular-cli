import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AcceptInvitationModalComponent} from '../modal/accept-invitation-modal/accept-invitation-modal.component';
import {ExistedModalComponent} from '../modal/existed-modal/existed-modal.component';
import {SignupVo} from "../../../model/vo/signupVo";
import {UserRepository} from "../../../repository/user-repository";
import {SignupModalComponent} from "../modal/signup-modal/signup-modal.component";
import {AdviceRepository} from "../../../repository/advice-repository";
import {RoleInfo} from "../../../model/po/roleInfo";
import {ToastRepository} from "../../../repository/toast-repository";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
    signup: SignupVo = new SignupVo();
    practiceRoles: Array<RoleInfo> = new Array<RoleInfo>();
    agree = false;
    validatorConfig: NgxValidatorConfig = {
        validationMessages: {
            account: {
                required: 'Email is required.',
                email: 'Please enter the correct email address.',
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


    constructor(private ngbModal: NgbModal,
                private userRepository: UserRepository,
                private toastRepository: ToastRepository,
                private adviceRepository: AdviceRepository) {
    }

    ngOnInit(): void {
        this.getPracticeRoles();
    }

    getPracticeRoles(): void {
        this.adviceRepository.getPracticeRoles().subscribe(res => {
            this.practiceRoles = res.data;
        })
    }

    signupModal(): void {
        if (this.signup.confirmPassword != this.signup.password) {
            this.toastRepository.showDanger("Passwords don't match.");
            return;
        }
        if (!this.agree) {
            this.toastRepository.showDanger("Please agree to the Terms of service and Privacy policy.");
            return;
        }
        const signupModalComponent = this.ngbModal.open(SignupModalComponent, {
            backdrop: 'static',
            size: 'w644',
            windowClass: 'password-modal',
            centered: true
        });
        signupModalComponent.componentInstance.signup = this.signup;
        signupModalComponent.componentInstance.practiceRoles = this.practiceRoles;
        signupModalComponent.result.then(res => {

        }).catch(res => {

        })
    }

    existedModal(): void {
        const ngbModalRef = this.ngbModal.open(ExistedModalComponent, {
            backdrop: 'static',
            size: 'w644',
            windowClass: 'password-modal',
            centered: true
        });
    }

    acceptInvitationModal(): void {
        const ngbModalRef = this.ngbModal.open(AcceptInvitationModalComponent, {
            backdrop: 'static',
            size: 'w614',
            windowClass: 'password-modal',
            centered: true
        });
    }
}
