import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {AuthActivateGuard} from "./auth-activate-guard";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/platform/product'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabled',
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            useHash: true,
        }),
    ],
    providers: [AuthActivateGuard, {provide: APP_BASE_HREF, useValue: '/'}],
    exports: [RouterModule],
})
export class AppRoutingModule {

}
