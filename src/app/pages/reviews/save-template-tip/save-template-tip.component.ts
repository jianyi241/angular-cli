import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-save-template-tip',
  templateUrl: './save-template-tip.component.html',
  styleUrls: ['./save-template-tip.component.less']
})
export class SaveTemplateTipComponent implements OnInit {

  title:string;
  info:string;
  btnText:string;
  btnCancelText:string ='No, will do it later';

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.close();
  }

}
