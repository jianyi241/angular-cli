import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {LayoutComponent} from '../common/layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'Home',
                pathMatch: 'full',
                redirectTo: '/Home'
            }
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/Home'
    }
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
    providers: [{provide: APP_BASE_HREF, useValue: '/'}],
    exports: [RouterModule],
})
export class AppRoutingModule {

}
