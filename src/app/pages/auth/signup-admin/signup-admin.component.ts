import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserRepository} from "../../../repository/user-repository";
import {ToastRepository} from "../../../repository/toast-repository";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {ActivatedRoute, Router} from "@angular/router";
import {InviteUser, VerifyCode} from "../../../model/user";

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.less']
})
export class SignupAdminComponent implements OnInit {
  signup: InviteUser = new InviteUser();
  fullName: string;
  verification: VerifyCode = new VerifyCode();
  validatorConfig: NgxValidatorConfig = {
    validationMessages: {
      password: {
        required: 'Password is required.',
      },
      confirmPassword: {
        required: 'Enter your password is required.'
      }
    },
    validateOn: 'submit'
  };

  constructor(private ngbModal: NgbModal,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private userRepository: UserRepository,
              private toastRepository: ToastRepository) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      let openId = queryParams['openId'];
      let validToken = queryParams['validToken'];
      if (openId && validToken) {
        this.signup.openId = openId;
        this.signup.validToken = validToken
        this.fullName = queryParams['fullName']
      }
    })
  }

  toSignUp():void {
    if (this.signup.confirmPassword != this.signup.password) {
      this.toastRepository.showDanger("Passwords don't match.");
      return;
    }
    this.userRepository.inviteUser(this.signup).subscribe(res => {
      if (res.statusCode === 200) {
        this.router.navigateByUrl('')
        this.toastRepository.showSuccess(res.msg || 'Successful operation')
      } else {
        this.toastRepository.showDanger(res.msg || 'failed operation')
      }
      console.log('admin signup result ===> ', res)
    })
  }
}
