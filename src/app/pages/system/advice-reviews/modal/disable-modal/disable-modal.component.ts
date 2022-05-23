import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-disable-modal',
  templateUrl: './disable-modal.component.html',
  styleUrls: ['./disable-modal.component.less']
})
export class DisableModalComponent implements OnInit {

  modal: any = {
    title: 'Change to disabled?',
    text: 'Are you sure?',
    cancelText: 'No, don’t do anything',
    confirmText: 'Yes, change to disabled'
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
