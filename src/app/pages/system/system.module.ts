import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SystemRoutingModule} from './system-routing.module';
import {ComparisonToolComponent} from './configuration/comparison-tool/comparison-tool.component';
import {EditGroupComponent} from './configuration/edit/edit-group/edit-group.component';
import {EditSubGroupComponent} from './configuration/edit/edit-sub-group/edit-sub-group.component';
import {EditPropComponent} from './configuration/edit/edit-prop/edit-prop.component';
import {FeatureFormComponent} from "./platforms/feature-form/feature-form.component";
import {ProductsComponent} from "./platforms/products/products.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {NgxFileDropModule} from "ngx-file-drop";
import {CKEditorModule} from "ckeditor4-angular";
import {ToggleClassDirective} from "../../directive/toggle-class.directive";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {PlatformDetailsComponent} from "./configuration/platform-details/platform-details.component";
import {BackTopDirective} from "../../directive/back-top.directive";
import {InformationComponent} from './configuration/information/information.component';
import {ConfigurationLayoutComponent} from './configuration/configuration-layout/configuration-layout.component';
import {EsgComponent} from './configuration/esg/esg.component';
import {ChangeHistoryComponent} from './configuration/change-history/change-history.component';
import {ProductLayoutComponent} from './platforms/product-layout/product-layout.component';
import {OverviewProductComponent} from './platforms/overview-product/overview-product.component';
import {InformationProductComponent} from './platforms/information-product/information-product.component';
import {EsgProductComponent} from './platforms/esg-product/esg-product.component';
import {ChangeHistoryProductComponent} from './platforms/change-history-product/change-history-product.component';
import {ArrayFilterPipe} from "../../pipes/array-filter.pipe";
import {BooleanComponent} from './platforms/prop-component/boolean/boolean.component';
import {AttachmentComponent} from './platforms/prop-component/attachment/attachment.component';
import {LongTextComponent} from './platforms/prop-component/long-text/long-text.component';
import {ShortTextComponent} from './platforms/prop-component/short-text/short-text.component';
import {IntegerComponent} from './platforms/prop-component/integer/integer.component';
import {PropViewComponent} from './platforms/prop-component/prop-view/prop-view.component';
import {DateFormatPipe} from '../../pipes/date-format.pipe';
import {AdviceListComponent} from './advice-practices/advice-list/advice-list.component';
import {AdviceLayoutComponent} from './advice-practices/advice-layout/advice-layout.component';
import {AdviceOverviewComponent} from './advice-practices/advice-overview/advice-overview.component';
import {SortingWidgetComponent} from "../../common/sorting-widget/sorting-widget.component";
import {AdviceTeamComponent} from './advice-practices/advice-team/advice-team.component';
import {AdviceBillingComponent} from './advice-practices/advice-billing/advice-billing.component';
import {AdviceInvoicesComponent} from './advice-practices/advice-invoices/advice-invoices.component';
import {OwlDateTimeModule} from "ng-pick-datetime";
import {EditTeamComponent} from './advice-practices/edit-team/edit-team.component';
import {TipModalComponent} from './advice-practices/tip-modal/tip-modal.component';
import {FeesRatesComponent} from './configuration/fees-rates/fees-rates.component';
import {FeesRatesProductComponent} from './platforms/fees-rates-product/fees-rates-product.component';
import {ProfileComponent} from './profile/profile.component';
import {DateComponent} from './platforms/prop-component/date/date.component';
import {SupplierListComponent} from './suppliers/supplier-list/supplier-list.component';
import {SupplierEditComponent} from './suppliers/supplier-edit/supplier-edit.component';
import {SupplierOverviewComponent} from './suppliers/supplier-edit/supplier-overview/supplier-overview.component';
import {SupplierTeamComponent} from './suppliers/supplier-edit/supplier-team/supplier-team.component';
import {SupplierPlatformComponent} from './suppliers/supplier-edit/supplier-platform/supplier-platform.component';
import {SupplierBillingComponent} from './suppliers/supplier-edit/supplier-billing/supplier-billing.component';
import {SupplierInvoicesComponent} from './suppliers/supplier-edit/supplier-invoices/supplier-invoices.component';
import {EditSupplierTeamComponent} from './suppliers/supplier-edit/edit-team/edit-supplier-team.component';

import {AdminListComponent} from './admin/admin-list/admin-list.component';
import {AdminDetailComponent} from './admin/admin-detail/admin-detail.component';
import {ComparisonsListComponent} from './suppliers/comparisons-list/comparisons-list.component';

@NgModule({
    declarations: [
        ComparisonToolComponent,
        EditGroupComponent,
        EditSubGroupComponent,
        EditPropComponent,
        FeatureFormComponent,
        ProductsComponent,
        ToggleClassDirective,
        PlatformDetailsComponent,
        BackTopDirective,
        InformationComponent,
        ConfigurationLayoutComponent,
        EsgComponent,
        DateFormatPipe,
        ChangeHistoryComponent,
        ProductLayoutComponent,
        OverviewProductComponent,
        InformationProductComponent,
        EsgProductComponent,
        ChangeHistoryProductComponent,
        ArrayFilterPipe,
        BooleanComponent,
        AttachmentComponent,
        LongTextComponent,
        ShortTextComponent,
        IntegerComponent,
        PropViewComponent,
        AdviceListComponent,
        AdviceLayoutComponent,
        AdviceOverviewComponent,
        SortingWidgetComponent,
        AdviceTeamComponent,
        AdviceBillingComponent,
        AdviceInvoicesComponent,
        EditTeamComponent,
        TipModalComponent,
        FeesRatesComponent,
        FeesRatesProductComponent,
        ProfileComponent,
        DateComponent,
        SupplierListComponent,
        SupplierEditComponent,
        SupplierOverviewComponent,
        SupplierTeamComponent,
        SupplierPlatformComponent,
        SupplierBillingComponent,
        SupplierInvoicesComponent,
        EditSupplierTeamComponent,
        AdminListComponent,
        AdminDetailComponent,
        ComparisonsListComponent
    ],
    imports: [
        CommonModule,
        SystemRoutingModule,
        NgSelectModule,
        FormsModule,
        NgxFileDropModule,
        CKEditorModule,
        NgbModule,
        DragDropModule,
        OwlDateTimeModule,
    ], exports: [
        ToggleClassDirective,
        BackTopDirective,
        ArrayFilterPipe
    ]
})
export class SystemModule {
}
