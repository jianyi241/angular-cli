import { Component, OnInit } from '@angular/core';
import {SignupVo} from "../../../../../model/vo/signupVo";
import {RoleInfo} from "../../../../../model/po/roleInfo";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
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
  signup: SignupVo = new SignupVo();
  practiceRoles: Array<RoleInfo> = new Array<RoleInfo>();
  supplierRoles: Array<RoleInfo> = new Array<RoleInfo>();
  validatorConfig: NgxValidatorConfig;
  names: Array<Client> = []
  constructor(private ngbModal: NgbModal,
              private router: Router,
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
    this.names.splice(index, 1)
  }

  addNameInput(): void {
    if (this.names.length < 6) {
      this.names.push({
        id: null,
        name: ''
      })
    }
  }

  submitForm(): void {
    console.log('names ', this.names)
  }
}
