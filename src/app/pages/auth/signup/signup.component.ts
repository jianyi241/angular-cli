import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcceptInvitationModalComponent } from '../modal/accept-invitation-modal/accept-invitation-modal.component';
import { ExistedModalComponent } from '../modal/existed-modal/existed-modal.component';
import { SignupModalComponent } from '../modal/signup-modal/signup-modal.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  constructor(private ngbModal: NgbModal) { }

  ngOnInit(): void {
  }
  signupModal(): void {
    const ngbModalRef = this.ngbModal.open(SignupModalComponent, {
      backdrop: 'static',
      size: 'w644',
      windowClass: 'password-modal',
      centered: true
    });
  }
  existedModal(): void {
    const ngbModalRef = this.ngbModal.open(ExistedModalComponent, {
      backdrop: 'static',
      size: 'w644',
      windowClass: 'password-modal',
      centered: true
    });
  }
  acceptInvitationModal(): void {
    const ngbModalRef = this.ngbModal.open(AcceptInvitationModalComponent, {
      backdrop: 'static',
      size: 'w614',
      windowClass: 'password-modal',
      centered: true
    });
  }
}
