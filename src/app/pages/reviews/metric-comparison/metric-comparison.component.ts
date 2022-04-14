import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-metric-comparison',
    templateUrl: './metric-comparison.component.html',
    styleUrls: ['../feature-comparison/feature-comparison.component.less']
})
export class MetricComparisonComponent implements OnInit, OnDestroy {
    reviewNextObservable: any;
    reviewBackObservable: any;

    constructor(private reviewService: ReviewService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscribe();
    }

    ngOnDestroy(): void {
        this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable.unsubscribe();
    }

    subscribe(): void {
        this.nextSubscribe();
        this.backSubscribe();
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            // this.router.navigateByUrl('/review/metric-comparison');
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.router.navigateByUrl('/review/feature-comparison');
        })
    }

}
