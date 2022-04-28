import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AcceptInvitationModalComponent} from '../modal/accept-invitation-modal/accept-invitation-modal.component';
import {SignupVo} from "../../../model/vo/signupVo";
import {UserRepository} from "../../../repository/user-repository";
import {SignupModalComponent} from "../modal/signup-modal/signup-modal.component";
import {AdviceRepository} from "../../../repository/advice-repository";
import {RoleInfo} from "../../../model/po/roleInfo";
import {ToastRepository} from "../../../repository/toast-repository";
import {NgxValidatorConfig} from "@why520crazy/ngx-validator";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {InviteUser, VerifyCode} from "../../../model/user";

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.less']
})
export class SignupAdminComponent implements OnInit {
  signup: InviteUser = new InviteUser();
  verification: VerifyCode = new VerifyCode();
  practiceRoles: Array<RoleInfo> = new Array<RoleInfo>();
  agree = false;
  checkEmailUnique = false;
  validatorConfig: NgxValidatorConfig = {
    validationMessages: {
      account: {
        required: 'Email is required.',
        email: 'Please enter the correct email address.',
      },
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
              private toastRepository: ToastRepository,
              private adviceRepository: AdviceRepository) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      let openId = queryParams['openId'];
      let validToken = queryParams['validToken'];
      if (openId && validToken) {
        this.verification.openId = openId;
        this.verification.token = validToken
        this.acceptInvitationModal();
      }
    })
    // this.getPracticeRoles();
    // this.activatedRoute.params.subscribe(parma)
  }

  getPracticeRoles(): void {
    this.adviceRepository.getPracticeRoles().subscribe(res => {
      this.practiceRoles = res.data;
    })
  }

  toSignUp():void {
    if (this.signup.confirmPassword != this.signup.password) {
      this.toastRepository.showDanger("Passwords don't match.");
      return;
    }
    this.userRepository.inviteUser(this.signup).subscribe(res => {
      console.log('admin signup result ===> ', res)
    })
  }

  signupModal(): void {

    this.toastRepository.showDanger('success');
    setTimeout(() => {
      this.router.navigateByUrl('/login?type=2')
    }, 2000)
    // this.userRepository.checkEmailUnique(this.signup.email).subscribe(res => {
    //   if (res.statusCode != 200) {
    //     this.checkEmailUnique = true;
    //     return;
    //   }
    //
    // });
  }

  acceptInvitationModal(): void {
    const acceptInvitationModalComponent = this.ngbModal.open(AcceptInvitationModalComponent, {
      backdrop: 'static',
      size: 'w614',
      windowClass: 'password-modal',
      centered: true
    });
    acceptInvitationModalComponent.componentInstance.verification = {...this.verification};
    acceptInvitationModalComponent.result.then(res => {
      this.toastRepository.showSuccess('Accept invitation successfully.');
      this.router.navigateByUrl('/login');
    }).catch(err => {

    })
  }
}
