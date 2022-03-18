import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReviewLayoutComponent} from "../../common/review-layout/review-layout.component";
import {FeatureComparisonComponent} from "./feature-comparison/feature-comparison.component";

const routes: Routes = [
  {
    path: 'review',
    component: ReviewLayoutComponent,
    children: [
      {
        path: 'feature-comparison',
        component: FeatureComparisonComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
