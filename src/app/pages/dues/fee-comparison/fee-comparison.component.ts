import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {Router} from "@angular/router";
import {DueService} from "../../../service/due.service";

@Component({
    selector: 'app-fee-comparison',
    templateUrl: './fee-comparison.component.html',
    styleUrls: ['./fee-comparison.component.less']
})
export class FeeComparisonComponent implements OnInit, OnDestroy {
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewSaveObservable: any;
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

    constructor(public dueService: DueService,
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
        this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
    }


    subscribe(): void {
        this.nextSubscribe();
        this.backSubscribe();
        this.saveSubscribe();
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.dueService.saveObservable.subscribe((callback) => {
            callback && callback()
        })
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.dueService.nextObservable.subscribe(() => {
            this.router.navigateByUrl(`/due/summary/${this.dueService.due.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.dueService.backObservable.subscribe(() => {
            this.router.navigateByUrl(`/due/metric-comparison/${this.dueService.due.id}`);
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
