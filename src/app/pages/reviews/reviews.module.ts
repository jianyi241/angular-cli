import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewDropdownDirective } from '../../directive/review-dropdown.directive';
import { TableScrollDirective } from "../../directive/table-scroll/table-scroll.directive";
import { FeatureComparisonComponent } from './feature-comparison/feature-comparison.component';
import { FeatureSelectionComponent } from './feature-selection/feature-selection.component';
import { ImgShowModalComponent } from './img-show-modal/img-show-modal.component';
import { ReviewsRoutingModule } from './reviews-routing.module';
import {SwiperModule} from 'swiper/angular';

@NgModule({
  declarations: [FeatureComparisonComponent, ReviewDropdownDirective, ImgShowModalComponent, TableScrollDirective, FeatureSelectionComponent],
    imports: [
        CommonModule,
        ReviewsRoutingModule,
        NgbModule,
        SwiperModule
    ], exports: [
    ReviewDropdownDirective,
    TableScrollDirective
  ]
})
export class ReviewsModule { }
