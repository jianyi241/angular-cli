import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeatureComparisonComponent} from './feature-comparison/feature-comparison.component';
import {FeatureSelectionComponent} from './feature-selection/feature-selection.component';
import {MetricComparisonComponent} from "./metric-comparison/metric-comparison.component";
import {FeeComparisonComponent} from "./fee-comparison/fee-comparison.component";
import {AuthActivateGuard} from "../../config/auth-activate-guard";
import {AuthActivateChildGuard} from "../../config/auth-activate-child-guard";
import {DueSetupComponent} from "./due-setup/due-setup.component";
import {MetricSelectionComponent} from "./metric-selection/metric-selection.component";
import {DueLayoutComponent} from "../../common/due-layout/due-layout.component";

const routes: Routes = [
    {
        path: 'due',
        canActivate: [AuthActivateGuard],
        canActivateChild: [AuthActivateChildGuard],
        component: DueLayoutComponent,
        children: [
            {
                path: 'due-setup/:id',
                component: DueSetupComponent,
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

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthActivateGuard, AuthActivateChildGuard],
    exports: [RouterModule]
})
export class DuesRoutingModule {
}
