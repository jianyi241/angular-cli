import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-save-template-tip-modal',
  templateUrl: './save-template-tip-modal.component.html',
  styleUrls: ['./save-template-tip-modal.component.less']
})
export class SaveTemplateTipModalComponent implements OnInit {
  title: string;
  info: string;
  btnText: string;
  btnCancelText: string;
  constructor(
      private modalService: NgbModal,
      private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }


  dismiss(): void {
    this.activeModal.dismiss();
  }

  btnOk(): void {
    this.activeModal.close();
  }


}
