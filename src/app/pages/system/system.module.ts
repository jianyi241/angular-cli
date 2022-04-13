import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SystemRoutingModule} from './system-routing.module';
import {ComparisonToolComponent} from './suppliers/comparison-tool/comparison-tool.component';
import {EditGroupComponent} from './suppliers/edit/edit-group/edit-group.component';
import {EditSubGroupComponent} from './suppliers/edit/edit-sub-group/edit-sub-group.component';
import {EditPropComponent} from './suppliers/edit/edit-prop/edit-prop.component';
import {FeatureFormComponent} from "./platforms/feature-form/feature-form.component";
import {ProductsComponent} from "./platforms/products/products.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {NgxFileDropModule} from "ngx-file-drop";
import {CKEditorModule} from "ckeditor4-angular";
import {ToggleClassDirective} from "../../directive/toggle-class.directive";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {PlatformDetailsComponent} from "./suppliers/platform-details/platform-details.component";
import {BackTopDirective} from "../../directive/back-top.directive";
import {InformationComponent} from './suppliers/information/information.component';
import {SupplierLayoutComponent} from './suppliers/supplier-layout/supplier-layout.component';
import {EsgComponent} from './suppliers/esg/esg.component';
import {ChangeHistoryComponent} from './suppliers/change-history/change-history.component';
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
import { AdviceListComponent } from './advice-practices/advice-list/advice-list.component';
import { AdviceLayoutComponent } from './advice-practices/advice-layout/advice-layout.component';
import { AdviceOverviewComponent } from './advice-practices/advice-overview/advice-overview.component';
import {SortingWidgetComponent} from "../../common/sorting-widget/sorting-widget.component";
import { AdviceTeamComponent } from './advice-practices/advice-team/advice-team.component';
import { AdviceBillingComponent } from './advice-practices/advice-billing/advice-billing.component';
import { AdviceInvoicesComponent } from './advice-practices/advice-invoices/advice-invoices.component';


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
        SupplierLayoutComponent,
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
        AdviceInvoicesComponent
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
    ], exports: [
        ToggleClassDirective,
        BackTopDirective,
        ArrayFilterPipe
    ]
})
export class SystemModule {
}
