import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { FeatureComparisonComponent } from './feature-comparison/feature-comparison.component';


@NgModule({
  declarations: [FeatureComparisonComponent],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    NgbModule
  ]
})
export class ReviewsModule { }
