import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgSelectModule} from "@ng-select/ng-select";
import {FloatInputComponent} from "../../components/float-input/float-input.component";
import {LoadingComponent} from '../../components/loading/loading.component';
import {TogglePwdDirective} from "../../directive/toggle-pwd/toggle-pwd.directive";
import {ForgotComponent} from './forgot/forgot.component';
import {LoginTipModalComponent} from './login-tip-modal/login-tip-modal.component';
import {LoginComponent} from './login/login.component';
import {PasswordResetSuccessfullyComponent} from './modal/password-reset-successfully/password-reset-successfully.component';
import {ResetPasswordEmailComponent} from './modal/reset-password-email/reset-password-email.component';
import {SignupModalComponent} from './modal/signup-modal/signup-modal.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {SignupComponent} from './signup/signup.component';
import {VerificationCodeComponent} from './verification-code/verification-code.component';
import {ExistedModalComponent} from './modal/existed-modal/existed-modal.component';
import {AcceptInvitationModalComponent} from './modal/accept-invitation-modal/accept-invitation-modal.component';
import {NgxValidatorModule, ValidationFeedbackStrategy} from "@why520crazy/ngx-validator";
import { SignupAdminComponent } from './signup-admin/signup-admin.component';

const INVALID_CLASS = 'has-invalid';
const INVALID_FEEDBACK_CLASS = 'has-invalid-feedback';
//自定义表单验证策略
export class CustomValidationFeedbackStrategy implements ValidationFeedbackStrategy {
    removeError(element: HTMLElement): void {
        if (element) {
            element.classList.remove(INVALID_CLASS);
        }
        if (element && element.parentElement) {
            const invalidFeedback = element.parentElement.querySelector(`.${INVALID_FEEDBACK_CLASS}`);
            if (invalidFeedback) {
                element.parentElement.removeChild(invalidFeedback);
            }
        }
    }

    showError(element: HTMLElement, errorMessages: string[]): void {
        if (element) {
            element.classList.add(INVALID_CLASS);
        }

        if (element && element.parentElement) {
            const documentFrag = document.createDocumentFragment();
            const divNode = document.createElement('DIV');
            const textNode = document.createTextNode(errorMessages[0]);
            divNode.appendChild(textNode);
            divNode.setAttribute('class', INVALID_FEEDBACK_CLASS);
            documentFrag.appendChild(divNode);
            element.parentElement.append(documentFrag);
        }
    }

}

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
    {
        path: 'signup-admin',
        pathMatch: 'full',
        component: SignupAdminComponent,
    }
];

@NgModule({
    imports: [CommonModule, FormsModule, NgSelectModule, RouterModule.forChild(authRoutes), ReactiveFormsModule, NgxValidatorModule.forRoot({
        validationFeedbackStrategy: new CustomValidationFeedbackStrategy()
    })],
    exports: [
        RouterModule,
        LoginComponent,
        ForgotComponent,
        LoadingComponent,
        ResetPasswordComponent,
        SignupComponent,
        SignupAdminComponent
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
        SignupAdminComponent
    ],
})
export class AuthModule {
}

