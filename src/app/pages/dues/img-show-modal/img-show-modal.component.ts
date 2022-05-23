import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-img-show-modal',
  templateUrl: './img-show-modal.component.html',
  styleUrls: ['./img-show-modal.component.less']
})
export class ImgShowModalComponent implements OnInit {
  img: string;

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

}
