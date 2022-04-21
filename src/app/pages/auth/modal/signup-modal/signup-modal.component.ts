import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SignupVo} from "../../../../model/vo/signupVo";
import {RoleInfo} from "../../../../model/po/roleInfo";
import {UserRepository} from "../../../../repository/user-repository";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {ToastRepository} from "../../../../repository/toast-repository";
import {ExistedModalComponent} from "../existed-modal/existed-modal.component";

@Component({
    selector: 'app-signup-modal',
    templateUrl: './signup-modal.component.html',
    styleUrls: ['./signup-modal.component.less']
})
export class SignupModalComponent implements OnInit {
    signup: SignupVo = new SignupVo();
    practiceRoles: Array<RoleInfo> = new Array<RoleInfo>();
    agree = false;
    news = false;
    validatorConfig: NgxValidatorConfig;

    constructor(private ngbModal: NgbModal,
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
            },
            validateOn: 'submit'
        };
    }


    ngOnInit(): void {
    }

    existedModal(): void {
        if (!this.agree) {
            this.toastRepository.showDanger("Please read and agree to the Terms & conditions and Privacy policy.");
            return;
        }
        if (!this.news) {
            this.toastRepository.showDanger("Please agree to have relevant news and updates sent to you.");
            return;
        }
        this.userRepository.signup(this.signup).subscribe(res => {
            if (res.statusCode != 200) {
                if (res.statusCode == 201) {
                    const existedModalComponent = this.ngbModal.open(ExistedModalComponent, {
                        backdrop: 'static',
                        size: 'w614',
                        windowClass: 'password-modal',
                        centered: true
                    });
                    existedModalComponent.result.then(res => {
                    }).catch(err => {
                    })
                    return;
                }
                this.toastRepository.showDanger(res.msg);
                return;
            }
        });

    }


}
