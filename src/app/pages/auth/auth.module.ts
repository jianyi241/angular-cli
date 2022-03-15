import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ForgotComponent} from './forgot/forgot.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingComponent} from '../../components/loading/loading.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {FloatInputComponent} from "../../components/float-input/float-input.component";

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
        path: 'reset/:token',
        pathMatch: 'full',
        component: ResetPasswordComponent,
    },
];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(authRoutes), ReactiveFormsModule],
    exports: [
        RouterModule,
        LoginComponent,
        ForgotComponent,
        LoadingComponent,
        ResetPasswordComponent,
    ],
    declarations: [
        LoginComponent,
        ForgotComponent,
        FloatInputComponent,
        LoadingComponent,
        ResetPasswordComponent,
    ],
})
export class AuthModule {
}
