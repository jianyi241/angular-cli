import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-reject-modal',
  templateUrl: './reject-modal.component.html',
  styleUrls: ['./reject-modal.component.less']
})
export class RejectModalComponent implements OnInit {
  modal: any = {
    title: 'Reject the updates?',
    text: 'Rejecting the updates will discard all changes. Are you sure?',
    cancelText: 'No, don’t do anything',
    confirmText: 'Yes, reject and discard changes'
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
