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
import {DeselectFeaturesTipComponent} from './deselect-feature-tip/deselect-features-tip.component';
import {ReviewsModule} from "../reviews/reviews.module";

// import {EllipsisDirective} from "../../directive/ellipsis.directive";

@NgModule({
    declarations: [FeatureComparisonComponent,
        FeatureSelectionComponent,
        MetricComparisonComponent,
        FeeComparisonComponent,
        DueSetupComponent,
        MetricSelectionComponent,
        // EllipsisDirective,
        DeselectFeaturesTipComponent],
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
    ]
})
export class DuesModule {
}
