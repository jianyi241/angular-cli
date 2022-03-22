import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReviewsRoutingModule} from './reviews-routing.module';
import {FeatureComparisonComponent} from './feature-comparison/feature-comparison.component';
import {ReviewDropdownDirective} from '../../directive/review-dropdown.directive';


@NgModule({
  declarations: [FeatureComparisonComponent, ReviewDropdownDirective],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    NgbModule
  ], exports: [
      ReviewDropdownDirective
  ]
})
export class ReviewsModule { }
