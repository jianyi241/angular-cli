import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from "@ng-select/ng-select";
import { FloatInputComponent } from "../../components/float-input/float-input.component";
import { LoadingComponent } from '../../components/loading/loading.component';
import { TogglePwdDirective } from "../../directive/toggle-pwd/toggle-pwd.directive";
import { ForgotComponent } from './forgot/forgot.component';
import { LoginTipModalComponent } from './login-tip-modal/login-tip-modal.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetSuccessfullyComponent } from './modal/password-reset-successfully/password-reset-successfully.component';
import { ResetPasswordEmailComponent } from './modal/reset-password-email/reset-password-email.component';
import { SignupModalComponent } from './modal/signup-modal/signup-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { ExistedModalComponent } from './modal/existed-modal/existed-modal.component';
import { AcceptInvitationModalComponent } from './modal/accept-invitation-modal/accept-invitation-modal.component';



const authRoutes: Routes = [
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
    },
    {
        path: 'forgot',
        pathMatch: 'full',
        component: ForgotComponent,
    },
    {
        path: 'reset',
        pathMatch: 'full',
        component: ResetPasswordComponent,
    },
    {
        path: 'signup',
        pathMatch: 'full',
        component: SignupComponent,
    },
    {
        path: 'verification',
        pathMatch: 'full',
        component: VerificationCodeComponent,
    },
];

@NgModule({
    imports: [CommonModule, FormsModule, NgSelectModule, RouterModule.forChild(authRoutes), ReactiveFormsModule],
    exports: [
        RouterModule,
        LoginComponent,
        ForgotComponent,
        LoadingComponent,
        ResetPasswordComponent,
        SignupComponent,
    ],
    declarations: [
        LoginComponent,
        ForgotComponent,
        FloatInputComponent,
        LoadingComponent,
        ResetPasswordComponent,
        LoginTipModalComponent,
        TogglePwdDirective,
        PasswordResetSuccessfullyComponent,
        ResetPasswordEmailComponent,
        SignupComponent,
        SignupModalComponent,
        VerificationCodeComponent,
        ExistedModalComponent,
        AcceptInvitationModalComponent,

    ],
})
export class AuthModule {
}
