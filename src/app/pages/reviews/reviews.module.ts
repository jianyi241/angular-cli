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
import { ComparisonSetupComponent } from './comparison-setup/comparison-setup.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {CKEditorModule} from "ckeditor4-angular";
import { BusinessMetricComparisonComponent } from './business-metric-comparison/business-metric-comparison.component';
import { SaveTemplateTipComponent } from './save-template-tip/save-template-tip.component';

@NgModule({
  declarations: [FeatureComparisonComponent, ReviewDropdownDirective, ImgShowModalComponent, TableScrollDirective, FeatureSelectionComponent, MetricComparisonComponent, FeeComparisonComponent,ShowMoreDirective, ComparisonSetupComponent, BusinessMetricComparisonComponent, SaveTemplateTipComponent],
    imports: [
        CommonModule,
        ReviewsRoutingModule,
        NgbModule,
        SwiperModule,
        SystemModule,
        FormsModule,
        NgSelectModule,
        CKEditorModule,
    ], exports: [
    ReviewDropdownDirective,
    TableScrollDirective,
    ShowMoreDirective
  ]
})
export class ReviewsModule { }
