import {Component, OnInit} from '@angular/core';
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ClientRepository} from "../../../../../repository/client-repository";
import {ClientDetailVo} from "../../../../../model/vo/clientDetailVo";
import {ToastRepository} from "../../../../../repository/toast-repository";

type Client = {
    name: string,
    id: number
}

@Component({
    selector: 'app-add-client-modal',
    templateUrl: './add-client-modal.component.html',
    styleUrls: ['./add-client-modal.component.less']
})
export class AddClientModalComponent implements OnInit {
    validatorConfig: NgxValidatorConfig;
    client: ClientDetailVo = new ClientDetailVo();

    constructor(private ngbModal: NgbModal,
                private router: Router,
                private toastRepository: ToastRepository,
                private clientRepository: ClientRepository,
                private activeModal: NgbActiveModal) {
        this.validatorConfig = {
            validationMessages: {
                firstName: {
                    required: 'First name is required.',
                },
                lastName: {
                    required: 'Last name is required.',
                }
            },
            validateOn: 'submit'
        };
    }


    ngOnInit(): void {
    }


    dismiss(): void {
        this.activeModal.dismiss();
    }

    close(): void {
        this.activeModal.close();
    }

    removeNameInput(index: number) {
        console.log('index ', index)
        this.client.clientMembers.splice(index, 1)
    }

    addNameInput(): void {
        if (this.client.clientMembers.length < 6) {
            this.client.clientMembers.push({
                name: ''
            })
        }
    }

    submitForm(): void {
        this.clientRepository.save(this.client).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                this.dismiss();
                return;
            }
            this.toastRepository.showSuccess('Save successfully.');
            this.close();
        });
    }
}
