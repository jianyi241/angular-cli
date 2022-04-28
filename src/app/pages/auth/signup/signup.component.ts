import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AcceptInvitationModalComponent} from '../modal/accept-invitation-modal/accept-invitation-modal.component';
import {SignupVo} from "../../../model/vo/signupVo";
import {UserRepository} from "../../../repository/user-repository";
import {SignupModalComponent} from "../modal/signup-modal/signup-modal.component";
import {AdviceRepository} from "../../../repository/advice-repository";
import {RoleInfo} from "../../../model/po/roleInfo";
import {ToastRepository} from "../../../repository/toast-repository";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {ActivatedRoute, Router} from "@angular/router";
import {VerifyCode} from "../../../model/user";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
    signup: SignupVo = new SignupVo();
    verification: VerifyCode = new VerifyCode();
    practiceRoles: Array<RoleInfo> = new Array<RoleInfo>();
    agree = false;
    checkEmailUnique = false;
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
    currentTab='Advice practice';


    constructor(private ngbModal: NgbModal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private userRepository: UserRepository,
                private toastRepository: ToastRepository,
                private adviceRepository: AdviceRepository) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(queryParams => {
            let openId = queryParams['openId'];
            let validToken = queryParams['validToken'];
            if (openId && validToken) {
                this.verification.openId = openId;
                this.verification.token = validToken
                this.acceptInvitationModal();
            }
        })
        this.getPracticeRoles();
        this.signup.companyType = 1
    }

    switchCompanyType(_companyType: number): void {
        this.signup.companyType = _companyType
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
        this.userRepository.checkEmailUnique(this.signup.email).subscribe(res => {
            if (res.statusCode != 200) {
                this.checkEmailUnique = true;
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
        });
    }

    acceptInvitationModal(): void {
        const acceptInvitationModalComponent = this.ngbModal.open(AcceptInvitationModalComponent, {
            backdrop: 'static',
            size: 'w614',
            windowClass: 'password-modal',
            centered: true
        });
        acceptInvitationModalComponent.componentInstance.verification = {...this.verification};
        acceptInvitationModalComponent.result.then(res => {
            this.toastRepository.showSuccess('Accept invitation successfully.');
            this.router.navigateByUrl('/login');
        }).catch(err => {

        })
    }
}
