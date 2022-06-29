import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SignupVo} from "../../../../model/vo/signupVo";
import {RoleInfo} from "../../../../model/po/roleInfo";
import {UserRepository} from "../../../../repository/user-repository";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {ToastRepository} from "../../../../repository/toast-repository";
import {ExistedModalComponent} from "../existed-modal/existed-modal.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup-modal',
    templateUrl: './signup-modal.component.html',
    styleUrls: ['./signup-modal.component.less']
})
export class SignupModalComponent implements OnInit {
    signup: SignupVo = new SignupVo();
    practiceRoles: Array<RoleInfo> = new Array<RoleInfo>();
    supplierRoles: Array<RoleInfo> = new Array<RoleInfo>();
    validatorConfig: NgxValidatorConfig;

    constructor(private ngbModal: NgbModal,
                private router: Router,
                private activeModal: NgbActiveModal,
                private toastRepository: ToastRepository,
                private userRepository: UserRepository) {
        this.validatorConfig = {
            validationMessages: {
                firstName: {
                    required: 'First name is required.',
                },
                lastName: {
                    required: 'Last name is required.',
                },
                practiceName: {
                    required: 'Practice name is required.'
                },
                practiceRole: {
                    required: 'Practice role is required.'
                }
                // ,
                // supplierName: {
                //     required: 'supplier name is required'
                // },
                // supplierRole: {
                //     required: 'Job title is required'
                // }
            },
            validateOn: 'submit'
        };
    }


    ngOnInit(): void {
    }

    close(): void {
        this.activeModal.close();
    }

    existedModal(): void {
        // if (!this.signup.updateNewsFlag) {
        //     this.toastRepository.showDanger("Please agree to have SuitabilityHub product updates and news sent to you.");
        //     return;
        // }
        // if (!this.signup.commFlag) {
        //     this.toastRepository.showDanger("Please agree to have marketing information from SuitabilityHub sent to you");
        //     return;
        // }
        // if (!this.signup.planFlag) {
        //     this.toastRepository.showDanger("Please agree to join the research team and be invited to participate in occasional surveys");
        //     return;
        // }
        this.signup.updateNewsFlag = true
        this.signup.commFlag = true
        this.signup.planFlag = true
        this.userRepository.signup(this.signup).subscribe(res => {
            if (res.statusCode != 200) {
                if (res.statusCode == 201) {
                    const existedModalComponent = this.ngbModal.open(ExistedModalComponent, {
                        backdrop: 'static',
                        size: 'w614',
                        windowClass: 'password-modal',
                        centered: true
                    });
                    existedModalComponent.result.then(modalRes => {
                        window.open(`mailto:${res.data.account}`,'_blank')
                    }).catch(err => {
                        console.log('error ', err)
                    })
                    return;
                }
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.activeModal.close();
            this.router.navigateByUrl(`/verification?validToken=${res.data.token}&openId=${res.data.openId}`);
        });
    }
}
