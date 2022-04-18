import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.less']
})
export class ResetPasswordEmailComponent implements OnInit {

  constructor(private modalService: NgbModal, private ngbActiveModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }
  close(): void {
    this.ngbActiveModal.close();
  }
}
