import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewLayoutComponent } from '../../common/review-layout/review-layout.component';
import { FeatureComparisonComponent } from './feature-comparison/feature-comparison.component';
import { FeatureSelectionComponent } from './feature-selection/feature-selection.component';

const routes: Routes = [
  {
    path: 'review',
    component: ReviewLayoutComponent,
    children: [
      {
        path: 'feature-comparison',
        component: FeatureComparisonComponent,
      },
      {
        path: 'feature-selection',
        component: FeatureSelectionComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
