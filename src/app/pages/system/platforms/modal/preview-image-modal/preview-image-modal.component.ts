import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-preview-image-modal',
  templateUrl: './preview-image-modal.component.html',
  styleUrls: ['./preview-image-modal.component.less']
})
export class PreviewImageModalComponent implements OnInit {

  imgUrl: string

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
