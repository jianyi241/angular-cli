import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxLoadingSpinnerModule} from '@k-adam/ngx-loading-spinner';
import {NgbAccordionModule, NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {CKEditorModule} from 'ckeditor4-angular';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgxFileDropModule} from 'ngx-file-drop';
import {AppComponent} from './app.component';
import {FooterComponent} from './common/footer/footer.component';
import {HeaderComponent} from './common/header/header.component';
import {LayoutComponent} from './common/layout/layout.component';
import {ReviewHeaderComponent} from './common/review-header/review-header.component';
import {ReviewLayoutComponent} from './common/review-layout/review-layout.component';
import {AppRoutingModule} from './config/app-routing-module';
import {HttpResultInterceptor} from './interceptor/http-result.interceptor';
import {LayoutObservable} from './observable/layout-observable';
import {LocalStorageObServable} from './observable/local-storage-observable';
import {AuthModule} from './pages/auth/auth.module';
import {ReviewsModule} from "./pages/reviews/reviews.module";
import {SystemModule} from "./pages/system/system.module";
import {TimePipe} from './pipes/time.pipe';
import {ToastRepository} from './repository/toast-repository';
import {UserRepository} from './repository/user-repository';
import {MessagingService} from './service/messaging.service';
import {ScrollService} from "./service/scroll.service";
import {CustomLinkActiveDirective} from './directive/custom-link-active.directive';


@NgModule({
    declarations: [
        AppComponent,
        TimePipe,
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        ReviewLayoutComponent,
        ReviewHeaderComponent,
        CustomLinkActiveDirective,
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
        NgbAccordionModule
    ],
    providers: [

        { provide: APP_BASE_HREF, useValue: '/' },
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
        ScrollService
    ],
    bootstrap: [AppComponent],
    exports: [
        FooterComponent,
    ]
})
export class AppModule {
}
