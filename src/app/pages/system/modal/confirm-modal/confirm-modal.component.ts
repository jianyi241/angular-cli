import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

type ModalInfo = {
  title?: string;
  text?: string;
  cancelText?: string;
  confirmText?: string
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.less']
})
export class ConfirmModalComponent implements OnInit {

  modal: ModalInfo = {
    title: 'Are you sure you want to do this?',
    text: '',
    cancelText: 'No, do nothing',
    confirmText: 'Yes, I do'
  }
  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  close(): void {
    this.activeModal.close();
  }
}
