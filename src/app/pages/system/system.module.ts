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
import {RejectModalComponent} from './platforms/modal/reject-modal/reject-modal.component';
import {ComparisonsListComponent} from './suppliers/comparisons-list/comparisons-list.component';
import {ProductsBoxComponent} from './platforms/products-box/products-box.component';
import {ProductsBoxDetailComponent} from './platforms/products-box-detail/products-box-detail.component';
import {PbdOverviewComponent} from './platforms/products-box-detail/children/pbd-overview/pbd-overview.component';
import {PbdInformationComponent} from './platforms/products-box-detail/children/pbd-information/pbd-information.component';
import {PbdEsgComponent} from './platforms/products-box-detail/children/pbd-esg/pbd-esg.component';
import {PbdFeaturesComponent} from './platforms/products-box-detail/children/pbd-features/pbd-features.component';
import {PbdFeesRatesComponent} from './platforms/products-box-detail/children/pbd-fees-rates/pbd-fees-rates.component';
import {PbdFindBdmComponent} from './platforms/products-box-detail/children/pbd-find-bdm/pbd-find-bdm.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {PreviewImageModalComponent} from './platforms/modal/preview-image-modal/preview-image-modal.component';
import {ReviewListComponent} from "./advice-reviews/review-list/review-list.component";
import {AddClientModalComponent} from './advice-reviews/modal/add-client-modal/add-client-modal.component';
import {NgxValidatorModule} from "@why520crazy/ngx-validator";
import {AddClientComponent} from './advice-reviews/add-client/add-client.component';
import {AcOverviewComponent} from './advice-reviews/add-client/components/ac-overview/ac-overview.component';
import {AcReviewComponent} from './advice-reviews/add-client/components/ac-review/ac-review.component';
import {ConfirmModalComponent} from './modal/confirm-modal/confirm-modal.component';
import {ClientTableComponent} from './advice-reviews/review-list/components/client-table/client-table.component';
import {ReviewTableComponent} from "./advice-reviews/review-list/components/review-table/review-table.component";
import {KanbanBoardComponent} from "./advice-reviews/review-list/components/kanban-board/kanban-board.component";
import {DisableModalComponent} from "./advice-reviews/modal/disable-modal/disable-modal.component";
import {NewsListComponent} from "./post/news-list/news-list.component";
import {HorizontalImageListComponent} from "./components/horizontal-image-list/horizontal-image-list.component";
import {CreatePostModalComponent} from './post/modal/create-post-modal/create-post-modal.component';
import {ListScrollDirective} from "../../directive/list-scroll/list-scroll.directive";

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
        ComparisonsListComponent,
        RejectModalComponent,
        ProductsBoxComponent,
        ProductsBoxDetailComponent,
        PbdOverviewComponent,
        PbdInformationComponent,
        PbdEsgComponent,
        PbdFeaturesComponent,
        PbdFeesRatesComponent,
        PbdFindBdmComponent,
        PreviewImageModalComponent,
        ReviewListComponent,
        AddClientModalComponent,
        AddClientComponent,
        AcOverviewComponent,
        AcReviewComponent,
        ConfirmModalComponent,
        ReviewTableComponent,
        ClientTableComponent,
        KanbanBoardComponent,
        DisableModalComponent,
        NewsListComponent,
        HorizontalImageListComponent,
        CreatePostModalComponent,
        ListScrollDirective
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
        MatTooltipModule,
        NgxValidatorModule,
    ], exports: [
        ToggleClassDirective,
        BackTopDirective,
        ArrayFilterPipe,
        SortingWidgetComponent,
        DateFormatPipe,
        ListScrollDirective
    ]
})
export class SystemModule {
}
