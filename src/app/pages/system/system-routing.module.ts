import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from '../../common/layout/layout.component';
import {ComparisonToolComponent} from './suppliers/comparison-tool/comparison-tool.component';
import {EditGroupComponent} from './suppliers/edit-group/edit-group.component';
import {EditSubGroupComponent} from "./suppliers/edit-sub-group/edit-sub-group.component";
import {EditPropComponent} from "./suppliers/edit-prop/edit-prop.component";
import {FeatureFormComponent} from "./platforms/feature-form/feature-form.component";
import {ProductsComponent} from './platforms/products/products.component';

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
                path: 'edit-sub-group/:id/:parentId',
                component: EditSubGroupComponent,
            },
            {
                path: 'edit-prop/:id/:subGroupId',
                component: EditPropComponent,
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
            {
                path:'feature-form/:productId',
                component:FeatureFormComponent
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
