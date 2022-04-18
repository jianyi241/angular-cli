import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExistedModalComponent } from '../existed-modal/existed-modal.component';
@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.less']
})
export class SignupModalComponent implements OnInit {


  constructor(private ngbModal: NgbModal) { }

  ngOnInit(): void {
  }
  existedModal(): void {
    const ngbModalRef = this.ngbModal.open(ExistedModalComponent, {
      backdrop: 'static',
      size: 'w614',
      windowClass: 'password-modal',
      centered: true
    });
  }


}
