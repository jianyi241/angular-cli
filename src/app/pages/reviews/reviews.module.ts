import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReviewDropdownDirective} from '../../directive/review-dropdown.directive';
import {TableScrollDirective} from "../../directive/table-scroll/table-scroll.directive";
import {FeatureComparisonComponent} from './feature-comparison/feature-comparison.component';
import {FeatureSelectionComponent} from './feature-selection/feature-selection.component';
import {ImgShowModalComponent} from './img-show-modal/img-show-modal.component';
import {ReviewsRoutingModule} from './reviews-routing.module';
import {SwiperModule} from 'swiper/angular';
import {SystemModule} from "../system/system.module";
import {MetricComparisonComponent} from './metric-comparison/metric-comparison.component';
import {FeeComparisonComponent} from './fee-comparison/fee-comparison.component';
import {FormsModule} from "@angular/forms";
import {ShowMoreDirective} from "../../directive/show-more.directive";
import {ComparisonSetupComponent} from './comparison-setup/comparison-setup.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {CKEditorModule} from "ckeditor4-angular";
import {MetricSelectionComponent} from './metric-selection/metric-selection.component';
import {ReviewTipComponent} from './review-tip/review-tip.component';
import {NgxValidatorModule} from "@why520crazy/ngx-validator";
import {SummaryComponent} from "./summary/summary.component";
import {PopoverCustomDirective} from "../../directive/popover-custom.directive";
import { FeeReviewComponent } from './fee-review/fee-review.component';
import { PlatformFeeChartsComponent } from './components/charts/platform-fee-charts/platform-fee-charts.component';
import { TotalCostChartsComponent } from './components/charts/total-cost-charts/total-cost-charts.component';
import { NumberInputComponent } from './components/number-input/number-input.component';

// import {EllipsisDirective} from "../../directive/ellipsis.directive";

@NgModule({
    declarations: [FeatureComparisonComponent,
        ReviewDropdownDirective,
        ImgShowModalComponent,
        TableScrollDirective,
        FeatureSelectionComponent,
        MetricComparisonComponent,
        FeeComparisonComponent,
        ShowMoreDirective,
        ComparisonSetupComponent,
        MetricSelectionComponent,
        SummaryComponent,
        // EllipsisDirective,
        ReviewTipComponent,
        PopoverCustomDirective,
        FeeReviewComponent,
        PlatformFeeChartsComponent,
        TotalCostChartsComponent,
        NumberInputComponent],
    imports: [
        CommonModule,
        ReviewsRoutingModule,
        NgbModule,
        SwiperModule,
        SystemModule,
        FormsModule,
        NgSelectModule,
        CKEditorModule,
        NgxValidatorModule,
    ], exports: [
        ReviewDropdownDirective,
        TableScrollDirective,
        ShowMoreDirective,
        PopoverCustomDirective
    ]
})
export class ReviewsModule {
}
