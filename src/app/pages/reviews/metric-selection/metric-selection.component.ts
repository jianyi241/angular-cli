import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {Router} from "@angular/router";
import {AnalysisType} from "../../../model/enums/analysis-type";

@Component({
    selector: 'app-business-metric-comparison',
    templateUrl: './metric-selection.component.html',
    styleUrls: ['./metric-selection.component.less']
})
export class MetricSelectionComponent implements OnInit, OnDestroy {
    reviewNextObservable: any;
    reviewBackObservable: any;

    constructor(private reviewService: ReviewService,
                public configService: ConfigService,
                private reviewRepository: ReviewRepository,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscribe();
    }

    ngOnDestroy(): void {
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
    }

    subscribe(): void {
        this.nextSubscribe();
        this.backSubscribe();
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            this.router.navigateByUrl(`/review/metric-comparison/${this.reviewService.comparison.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.reviewService.preStep(AnalysisType.metric);
        })
    }



}
