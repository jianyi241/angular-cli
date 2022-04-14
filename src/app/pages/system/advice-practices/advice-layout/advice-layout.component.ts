import { Component, OnInit } from '@angular/core';
import {ImgShowModalComponent} from "../../../reviews/img-show-modal/img-show-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TipModalComponent} from "../tip-modal/tip-modal.component";

@Component({
  selector: 'app-advice-layout',
  templateUrl: './advice-layout.component.html',
  styleUrls: ['./advice-layout.component.less']
})
export class AdviceLayoutComponent implements OnInit {

  public isTeamPage: boolean =false;

  constructor( private modalService: NgbModal) {

  }

  ngOnInit(): void {
  }

  onArchive(): void {
    const modalRef = this.modalService.open(TipModalComponent, {
      size: 'small',
      windowClass: 'tip-popup-modal',
      centered: true
    });
    modalRef.componentInstance.title = 'Archive the practice?';
    modalRef.componentInstance.info = 'Archiving a practice will remove the access of this practice from all users. Only the admin can access archived practices. \n' +
        'Are you sure to archive this practice?';
    modalRef.componentInstance.btnText = 'Yes, archive it';
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  onDisable(): void {
    const modalRef = this.modalService.open(TipModalComponent, {
      size: 'small',
      windowClass: 'tip-popup-modal',
      centered: true
    });
    modalRef.componentInstance.title = 'Disable the practice?';
    modalRef.componentInstance.info = 'Disabling a practice will freeze it from being changed.Are you sure to disable this practice?';
    modalRef.componentInstance.btnText = 'Yes, disable it';
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

}
