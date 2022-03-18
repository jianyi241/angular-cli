import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { FeatureComparisonComponent } from './feature-comparison/feature-comparison.component';


@NgModule({
  declarations: [FeatureComparisonComponent],
  imports: [
    CommonModule,
    ReviewsRoutingModule
  ]
})
export class ReviewsModule { }
