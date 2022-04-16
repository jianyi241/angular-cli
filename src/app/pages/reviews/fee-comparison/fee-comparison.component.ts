import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {Router} from "@angular/router";

@Component({
    selector: 'app-fee-comparison',
    templateUrl: './fee-comparison.component.html',
    styleUrls: ['./fee-comparison.component.less']
})
export class FeeComparisonComponent implements OnInit, OnDestroy {
    reviewNextObservable: any;
    reviewBackObservable: any;
    idpsArr: Array<{ name: string, value: number }> = [{name: '', value: 0}];
    superArr: Array<{ name: string, value: number }> = [{name: '', value: 0}];
    platformItems: Array<{ name: string, value: boolean }> = [
        {name: 'Retail insurance', value: false},
        {name: 'Australian direct shares', value: false},
        {name: 'International direct shares', value: false},
        {name: 'Unlisted bonds', value: false},
        {name: 'Managed accounts (SMA or MDA models)', value: false},
        {name: 'Non-custody solution', value: false},
    ];

    constructor(private reviewService: ReviewService,
                public configService: ConfigService,
                private reviewRepository: ReviewRepository,
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
            // this.router.navigateByUrl('/review/fee-comparison');
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.router.navigateByUrl('/review/metric-comparison');
        })
    }

    addIdps() {
        this.idpsArr.push({
            name: '',
            value: 0,
        });
    }

    addSuper() {
        this.superArr.push({
            name: '',
            value: 0,
        });
    }

    totalValue(): number {
        let superTotal = this.superArr.map(s => s.value).reduce((a, b) => a + b);
        let idpsTotal = this.idpsArr.map(s => s.value).reduce((a, b) => a + b);
        return idpsTotal + superTotal;
    }

    removeSuper(superIndex: number) {
        if (superIndex == 0) {
            return;
        }
        this.superArr.splice(superIndex, 1);
    }

    removeIdps(idpsIndex: number) {
        if (idpsIndex == 0) {
            return;
        }
        this.idpsArr.splice(idpsIndex, 1);
    }
}
