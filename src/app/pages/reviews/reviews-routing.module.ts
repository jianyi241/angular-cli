import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReviewLayoutComponent} from '../../common/review-layout/review-layout.component';
import {FeatureComparisonComponent} from './feature-comparison/feature-comparison.component';
import {FeatureSelectionComponent} from './feature-selection/feature-selection.component';
import {MetricComparisonComponent} from "./metric-comparison/metric-comparison.component";
import {FeeComparisonComponent} from "./fee-comparison/fee-comparison.component";
import {AuthActivateGuard} from "../../config/auth-activate-guard";
import {AuthActivateChildGuard} from "../../config/auth-activate-child-guard";
import {ComparisonSetupComponent} from "./comparison-setup/comparison-setup.component";
import {MetricSelectionComponent} from "./metric-selection/metric-selection.component";
import {SummaryComponent} from "./summary/summary.component";

const routes: Routes = [
    {
        path: 'review',
        canActivate: [AuthActivateGuard],
        canActivateChild: [AuthActivateChildGuard],
        component: ReviewLayoutComponent,
        children: [
            {
                path: 'comparison-setup/:id',
                component: ComparisonSetupComponent,
            },
            {
                path: 'feature-selection/:id',
                component: FeatureSelectionComponent,
            },
            {
                path: 'feature-comparison/:id',
                component: FeatureComparisonComponent,
            },
            {
                path: 'metric-selection/:id',
                component: MetricSelectionComponent,
            },
            {
                path: 'metric-comparison/:id',
                component: MetricComparisonComponent,
            },
            {
                path: 'fee-comparison/:id',
                component: FeeComparisonComponent,
            },
            {
                path: 'summary/:id',
                component: SummaryComponent,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthActivateGuard, AuthActivateChildGuard],
    exports: [RouterModule]
})
export class ReviewsRoutingModule {
}
