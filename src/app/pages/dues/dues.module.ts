import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FeatureComparisonComponent} from './feature-comparison/feature-comparison.component';
import {FeatureSelectionComponent} from './feature-selection/feature-selection.component';
import {DuesRoutingModule} from './dues-routing.module';
import {SwiperModule} from 'swiper/angular';
import {SystemModule} from "../system/system.module";
import {MetricComparisonComponent} from './metric-comparison/metric-comparison.component';
import {FeeComparisonComponent} from './fee-comparison/fee-comparison.component';
import {FormsModule} from "@angular/forms";
import {DueSetupComponent} from './due-setup/due-setup.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {CKEditorModule} from "ckeditor4-angular";
import {MetricSelectionComponent} from './metric-selection/metric-selection.component';
import {DueTipComponent} from './due-tip/due-tip.component';
import {ReviewsModule} from "../reviews/reviews.module";
import {SaveTemplateTipModalComponent} from "./save-template-tip-modal/save-template-tip-modal.component";
import {SaveTemplateModalComponent} from "./save-template-modal/save-template-modal.component";
import {NgxValidatorModule} from "@why520crazy/ngx-validator";
import {SummaryComponent} from './summary/summary.component';
import {ImgShowModalComponent} from "./img-show-modal/img-show-modal.component";

// import {EllipsisDirective} from "../../directive/ellipsis.directive";

@NgModule({
    declarations: [FeatureComparisonComponent,
        FeatureSelectionComponent,
        MetricComparisonComponent,
        FeeComparisonComponent,
        DueSetupComponent,
        MetricSelectionComponent,
        SaveTemplateTipModalComponent,
        SaveTemplateModalComponent,
        // EllipsisDirective,
        DueTipComponent,
        ImgShowModalComponent,
        SummaryComponent],
    imports: [
        CommonModule,
        DuesRoutingModule,
        NgbModule,
        SwiperModule,
        SystemModule,
        FormsModule,
        NgSelectModule,
        CKEditorModule,
        ReviewsModule,
        NgxValidatorModule,
    ]
})
export class DuesModule {
}
