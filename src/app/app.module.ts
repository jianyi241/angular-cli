import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthModule} from './pages/auth/auth.module';

import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {ToastRepository} from './repository/toast-repository';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpResultInterceptor} from './interceptor/http-result.interceptor';
import {LayoutObservable} from './observable/layout-observable';
import {LocalStorageObServable} from './observable/local-storage-observable';
import {NgxLoadingSpinnerModule} from '@k-adam/ngx-loading-spinner';
import {NgbAlertModule, NgbModule, NgbPaginationModule,NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './config/app-routing-module';
import {NgSelectModule} from '@ng-select/ng-select';
import {TimePipe} from './pipes/time.pipe';
import {MessagingService} from './service/messaging.service';
import {LayoutComponent} from './common/layout/layout.component';
import {HeaderComponent} from './common/header/header.component';
import {FooterComponent} from './common/footer/footer.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgxFileDropModule} from 'ngx-file-drop';
import {UserRepository} from './repository/user-repository';
import {CKEditorModule} from 'ckeditor4-angular';
import {SystemModule} from "./pages/system/system.module";
import {ReviewsModule} from "./pages/reviews/reviews.module";
import {ReviewLayoutComponent} from './common/review-layout/review-layout.component';
import {ReviewHeaderComponent} from './common/review-header/review-header.component';

@NgModule({
    declarations: [
        AppComponent,
        TimePipe,
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        ReviewLayoutComponent,
        ReviewHeaderComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        SystemModule,
        HttpClientModule,
        NgbModule,
        NgbPaginationModule,
        NgbAlertModule,
        FormsModule,
        ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        BrowserAnimationsModule,
        NgSelectModule,
        NgxLoadingSpinnerModule.forRoot(),
        ModalModule.forRoot(),
        NgxFileDropModule,
        CKEditorModule,
        SystemModule,
        ReviewsModule,
        NgbAccordionModule,
    ],
    providers: [

        {provide: APP_BASE_HREF, useValue: '/'},
        {
            provide: OWL_DATE_TIME_LOCALE, useValue: 'en-au'
        },
        ToastRepository,
        UserRepository,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpResultInterceptor,
            multi: true,
        },
        LocalStorageObServable,
        LayoutObservable,
        MessagingService,
    ],
    bootstrap: [AppComponent],
    exports: [
        FooterComponent,
    ]
})
export class AppModule {
}
