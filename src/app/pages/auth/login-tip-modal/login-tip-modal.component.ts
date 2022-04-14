import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-login-tip-modal',
  templateUrl: './login-tip-modal.component.html',
  styleUrls: ['./login-tip-modal.component.less']
})
export class LoginTipModalComponent implements OnInit {
  title:string;
  subTitle:string;
  info:string;
  btnText:string;
  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
