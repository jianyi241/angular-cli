import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReviewsRoutingModule} from './reviews-routing.module';
import {FeatureComparisonComponent} from './feature-comparison/feature-comparison.component';
import {ReviewDropdownDirective} from '../../directive/review-dropdown.directive';
import { ImgShowModalComponent } from './img-show-modal/img-show-modal.component';
import {TableScrollDirective} from "../../directive/table-scroll/table-scroll.directive";


@NgModule({
  declarations: [FeatureComparisonComponent, ReviewDropdownDirective, ImgShowModalComponent,TableScrollDirective],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    NgbModule
  ], exports: [
      ReviewDropdownDirective,
      TableScrollDirective
  ]
})
export class ReviewsModule { }
