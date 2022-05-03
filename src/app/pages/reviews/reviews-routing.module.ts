import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReviewLayoutComponent} from '../../common/review-layout/review-layout.component';
import {FeatureComparisonComponent} from './feature-comparison/feature-comparison.component';
import {FeatureSelectionComponent} from './feature-selection/feature-selection.component';
import {MetricComparisonComponent} from "./metric-comparison/metric-comparison.component";
import {FeeComparisonComponent} from "./fee-comparison/fee-comparison.component";
import {ComparisonSetupComponent} from "./comparison-setup/comparison-setup.component";
import {BusinessMetricComparisonComponent} from "./business-metric-comparison/business-metric-comparison.component";

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
      {
        path: 'metric-comparison',
        component: MetricComparisonComponent,
      },
      {
        path: 'fee-comparison',
        component: FeeComparisonComponent,
      },
      {
        path: 'comparison-setup',
        component: ComparisonSetupComponent,
      },
      {
        path: 'business-metric-comparison',
        component: BusinessMetricComparisonComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
