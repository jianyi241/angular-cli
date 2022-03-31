import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from '../../common/layout/layout.component';
import {ComparisonToolComponent} from './suppliers/comparison-tool/comparison-tool.component';
import {EditGroupComponent} from './suppliers/edit-group/edit-group.component';
import {EditSubGroupComponent} from "./suppliers/edit-sub-group/edit-sub-group.component";
import {EditPropComponent} from "./suppliers/edit-prop/edit-prop.component";
import {FeatureFormComponent} from "./platforms/feature-form/feature-form.component";
import {ProductsComponent} from './platforms/products/products.component';
import {PlatformDetailsComponent} from "./suppliers/platform-details/platform-details.component";
import {PlatformEditComponent} from "./suppliers/platform-edit/platform-edit.component";
import {InformationSectionEditComponent} from "./suppliers/information-section-edit/information-section-edit.component";
import {InformationComponent} from "./suppliers/information/information.component";
import {SupplierLayoutComponent} from "./suppliers/supplier-layout/supplier-layout.component";
import {EsgComponent} from "./suppliers/esg/esg.component";
import {ChangeHistoryComponent} from "./suppliers/change-history/change-history.component";
import { ProductLayoutComponent } from './platforms/product-layout/product-layout.component';
import { OverviewProductComponent } from './platforms/overview-product/overview-product.component';
import { InformationProductComponent } from './platforms/information-product/information-product.component';
import { EsgProductComponent } from './platforms/esg-product/esg-product.component';
import { ChangeHistoryProductComponent } from './platforms/change-history-product/change-history-product.component';

const routes: Routes = [
    {
        path: 'supplier',
        component: LayoutComponent,
        children: [
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
            {
                path: 'edit-platform',
                component: PlatformEditComponent,
            },
            {
                path: 'edit-section',
                component: InformationSectionEditComponent,
            },
            {
                path: 'supplier-tab',
                component: SupplierLayoutComponent,
                children:[
                    {
                        path: 'comparison/:type',
                        component: ComparisonToolComponent,
                    },
                    {
                        path: 'overview',
                        component: PlatformDetailsComponent,
                    },
                    {
                        path: 'information',
                        component: InformationComponent,
                    },
                    {
                        path: 'esg',
                        component: EsgComponent,
                    },
                    {
                        path: 'change-history',
                        component: ChangeHistoryComponent,
                    },
                ]
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
            {
                path: 'product-tab',
                component: ProductLayoutComponent,
                children:[
                    {
                        path: 'overview',
                        component: OverviewProductComponent,
                    },
                    {
                        path: 'information',
                        component: InformationProductComponent,
                    },
                    {
                        path: 'esg',
                        component: EsgProductComponent,
                    },
                    {
                        path: 'change-history',
                        component: ChangeHistoryProductComponent,
                    },
                ]
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
