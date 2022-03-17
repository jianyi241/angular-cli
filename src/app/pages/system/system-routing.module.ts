import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from '../../common/layout/layout.component';
import {ComparisonToolComponent} from './suppliers/comparison-tool/comparison-tool.component';
import {EditGroupComponent} from './suppliers/edit-group/edit-group.component';
import {EditSubGroupComponent} from "./suppliers/edit-sub-group/edit-sub-group.component";
import {EditPropComponent} from "./suppliers/edit-prop/edit-prop.component";
import {EditDetailComponent} from "./suppliers/edit-detail/edit-detail.component";
import {FeatureFormComponent} from "./suppliers/feature-form/feature-form.component";
import { ProductsComponent } from './platforms/products/products.component';

const routes: Routes = [
    {
        path: 'supplier',
        component: LayoutComponent,
        children: [
            {
                path: 'comparison/:type',
                component: ComparisonToolComponent,
            },
            {
                path: 'edit-group/:id',
                component: EditGroupComponent,
            },
            {
                path: 'edit-sub-group/:id',
                component: EditSubGroupComponent,
            },
            {
                path: 'edit-prop/:id',
                component: EditPropComponent,
            },
            {
                path: 'edit-detail',
                component: EditDetailComponent,
            },
            {
                path:'feature-form',
                component:FeatureFormComponent
            },
        ]
    },
    {
        path: 'platform',
        component: LayoutComponent,
        children: [
            {
                path: 'product',
                component: ProductsComponent,
            },
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {
}
