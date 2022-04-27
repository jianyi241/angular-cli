import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from '../../common/layout/layout.component';
import {ComparisonToolComponent} from './suppliers/comparison-tool/comparison-tool.component';
import {EditGroupComponent} from './suppliers/edit/edit-group/edit-group.component';
import {EditSubGroupComponent} from "./suppliers/edit/edit-sub-group/edit-sub-group.component";
import {EditPropComponent} from "./suppliers/edit/edit-prop/edit-prop.component";
import {FeatureFormComponent} from "./platforms/feature-form/feature-form.component";
import {ProductsComponent} from './platforms/products/products.component';
import {PlatformDetailsComponent} from "./suppliers/platform-details/platform-details.component";
import {InformationComponent} from "./suppliers/information/information.component";
import {SupplierLayoutComponent} from "./suppliers/supplier-layout/supplier-layout.component";
import {EsgComponent} from "./suppliers/esg/esg.component";
import {ChangeHistoryComponent} from "./suppliers/change-history/change-history.component";
import {ProductLayoutComponent} from './platforms/product-layout/product-layout.component';
import {OverviewProductComponent} from './platforms/overview-product/overview-product.component';
import {InformationProductComponent} from './platforms/information-product/information-product.component';
import {EsgProductComponent} from './platforms/esg-product/esg-product.component';
import {ChangeHistoryProductComponent} from './platforms/change-history-product/change-history-product.component';
import {AdviceListComponent} from "./advice-practices/advice-list/advice-list.component";
import {AdviceLayoutComponent} from "./advice-practices/advice-layout/advice-layout.component";
import {AdviceOverviewComponent} from "./advice-practices/advice-overview/advice-overview.component";
import {AdviceTeamComponent} from "./advice-practices/advice-team/advice-team.component";
import {AdviceBillingComponent} from "./advice-practices/advice-billing/advice-billing.component";
import {AdviceInvoicesComponent} from "./advice-practices/advice-invoices/advice-invoices.component";
import {EditTeamComponent} from "./advice-practices/edit-team/edit-team.component";
import {FeesRatesComponent} from "./suppliers/fees-rates/fees-rates.component";
import {FeesRatesProductComponent} from "./platforms/fees-rates-product/fees-rates-product.component";
import {ProfileComponent} from "./profile/profile.component";
import {SupplierListComponent} from "./suppliers/supplier-list/supplier-list.component";
import {SupplierEditComponent} from "./suppliers/supplier-edit/supplier-edit.component";
import {SupplierOverviewComponent} from "./suppliers/supplier-edit/supplier-overview/supplier-overview.component";
import {SupplierTeamComponent} from "./suppliers/supplier-edit/supplier-team/supplier-team.component";
import {SupplierPlatformComponent} from "./suppliers/supplier-edit/supplier-platform/supplier-platform.component";
import {SupplierBillingComponent} from "./suppliers/supplier-edit/supplier-billing/supplier-billing.component";
import {SupplierInvoicesComponent} from "./suppliers/supplier-edit/supplier-invoices/supplier-invoices.component";
import {ManageSupplierUsersComponent} from "./suppliers/supplier-edit/manage-supplier-users/manage-supplier-users.component";

const routes: Routes = [
    {
        path: 'supplier',
        component: LayoutComponent,
        children: [
            {
                path: 'edit-group/:tab/:id/:version',
                component: EditGroupComponent,
            },
            {
                path: 'edit-sub-group/:tab/:id/:parentId/:version',
                component: EditSubGroupComponent,
            },
            {
                path: 'edit-prop/:tab/:id/:groupId/:version',
                component: EditPropComponent,
            },
            {
                path: 'supplier-tab',
                component: SupplierLayoutComponent,
                children: [
                    {
                        path: 'overview/:version',
                        component: PlatformDetailsComponent,
                        runGuardsAndResolvers: "paramsChange"
                    },
                    {
                        path: 'information/:version',
                        component: InformationComponent,
                    },

                    {
                        path: 'esg/:version',
                        component: EsgComponent,
                    },
                    {
                        path: 'features/:version',
                        component: ComparisonToolComponent,
                    },
                    {
                        path: 'change-history/:version',
                        component: ChangeHistoryComponent,
                    },
                    {
                        path: 'fees-rates/:version',
                        component: FeesRatesComponent,
                    },
                ]
            },
            {
                path: 'supplier-list',
                component: SupplierListComponent,
            },
            {
                path: 'supplier-edit',
                component: SupplierEditComponent,
                children: [
                    {
                        path: 'overview',
                        component: SupplierOverviewComponent,
                    },
                    {
                        path: 'team',
                        component: SupplierTeamComponent,
                    },
                    {
                        path: 'platforms',
                        component: SupplierPlatformComponent,
                    },
                    {
                        path: 'billing',
                        component: SupplierBillingComponent,
                    },
                    {
                        path: 'invoices',
                        component: SupplierInvoicesComponent,
                    },
                ]
            },
            {
                path: 'manage-supplier-users',
                component: ManageSupplierUsersComponent,
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
                path: 'product-tab',
                component: ProductLayoutComponent,
                children: [
                    {
                        path: 'overview/:productId/:version',
                        component: OverviewProductComponent,
                    },
                    {
                        path: 'information/:productId/:version',
                        component: InformationProductComponent,
                    },
                    {
                        path: 'esg/:productId/:version',
                        component: EsgProductComponent,
                    },
                    {
                        path: 'features/:productId/:version',
                        component: FeatureFormComponent
                    },
                    {
                        path: 'change-history/:productId/:version',
                        component: ChangeHistoryProductComponent,
                    },
                    {
                        path: 'fees-rates/:productId/:version',
                        component: FeesRatesProductComponent,
                    },
                ]
            },
        ]
    },
    {
        path: 'advice-practices',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: AdviceListComponent,
            },
            {
                path: 'edit-team/:id/:practiceId',
                component: EditTeamComponent,
            },
            {
                path: 'advice-tab',
                component: AdviceLayoutComponent,
                children: [
                    {
                        path: 'overview/:id',
                        component: AdviceOverviewComponent,
                    },
                    {
                        path: 'team/:id',
                        component: AdviceTeamComponent,
                    },
                    {
                        path: 'billing/:id',
                        component: AdviceBillingComponent,
                    },
                    {
                        path: 'invoices/:id',
                        component: AdviceInvoicesComponent,
                    },
                ],
            }
        ]
    },
    {
        path: 'profile',
        component: LayoutComponent,
        children:[
            {
                path:'',
                component: ProfileComponent
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {
}
