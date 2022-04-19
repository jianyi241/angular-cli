import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-password-reset-successfully',
  templateUrl: './password-reset-successfully.component.html',
  styleUrls: ['./password-reset-successfully.component.less']
})
export class PasswordResetSuccessfullyComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close();
  }
}
