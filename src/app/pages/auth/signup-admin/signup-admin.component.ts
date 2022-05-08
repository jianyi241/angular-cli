import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserRepository} from "../../../repository/user-repository";
import {ToastRepository} from "../../../repository/toast-repository";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {ActivatedRoute, Router} from "@angular/router";
import {InviteUser, VerifyCode} from "../../../model/user";
import {regPwd, pwdReg} from "../../../utils/regular";
import {NgxLoadingSpinnerService} from '@k-adam/ngx-loading-spinner';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.less']
})
export class SignupAdminComponent implements OnInit {
  signup: InviteUser = new InviteUser();
  fullName: string;
  verification: VerifyCode = new VerifyCode();
  pwdReg = pwdReg
  validatorConfig: NgxValidatorConfig = {
    validationMessages: {
      password: {
        required: 'Password is required.',
      },
      confirmPassword: {
        required: 'Enter your password is required.',
        pattern: 'The password should be at least 8 characters.\n' +
            'The password should include both upper case and lower case letters.\n' +
            'The password should include at least 1 number.'
      }
    },
    validateOn: 'submit'
  };

  constructor(private ngbModal: NgbModal,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private userRepository: UserRepository,
              private toastRepository: ToastRepository,
              private spinnerLoading: NgxLoadingSpinnerService) {
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
      this.toastRepository.showDanger('Passwords dont match');
      return;
    }
    this.spinnerLoading.show()
    this.userRepository.inviteUser(this.signup).subscribe(res => {
      if (res.statusCode === 200) {
        this.router.navigateByUrl('/login')
        this.toastRepository.showSuccess(res.msg || 'Successful operation')
        this.spinnerLoading.hide()
      } else {
        this.toastRepository.showDanger(res.msg || 'failed operation')
        this.spinnerLoading.hide()
      }
    })
  }
}
