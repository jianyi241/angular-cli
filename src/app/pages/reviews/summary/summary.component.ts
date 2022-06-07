import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {Router} from "@angular/router";
import {ReviewService} from "../../../service/review.service";
import {arr1ToArr2} from "../../../utils/array";
import {AnalysisType} from "../../../model/enums/analysis-type";

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.less']
})
export class SummaryComponent implements OnInit {
    reviewSaveObservable: any;
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewLeaveObservable: any;
    idpsArr: Array<{ name: string, value: number }> = [{name: '', value: 0}];
    superArr: Array<{ name: string, value: number }> = [{name: '', value: 0}];
    mockPlatformData: Array<any> = []
    choiceAnalysis:Array<string> = ["Feature analysis","Business metric analysis","Fee analysis"]
    featuresIncludedReviewList: Array<Array<number>> = [[1,2,3,4,5],[1,2,3],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5],[1,2,3,4,5,6,7],[1,2],[1,2,3,4,5,6],[2,3,4,5,9]]

    constructor(public reviewService: ReviewService,
                public configService: ConfigService,
                private reviewRepository: ReviewRepository,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscribe();
        this.getPlatformSelectedList()
    }

    getPlatformAnalysis() {
        return `
            Feature spotlight: Manage cash reserves and<br/> automate investing with Cash Settings. Feature<br/> spotlight: Manage cash reserves and automate<br/> investing with Cash Settings
        `
    }

    getPlatformSelectedList() {
        let list = [1,2,3,4,5,6,7]
        let _list = arr1ToArr2(JSON.parse(JSON.stringify(list)), 4)
        _list[_list.length - 1].length = 4
        this.mockPlatformData = _list
        console.log('mockPlatformData ', this.mockPlatformData)
    }

    ngOnDestroy(): void {
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
        this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
        this.reviewLeaveObservable && this.reviewLeaveObservable.unsubscribe();
    }


    subscribe(): void {
        this.nextSubscribe();
        this.backSubscribe();
        this.saveSubscribe();
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            // this.router.navigateByUrl(`/due/summary/${this.dueService.due.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.router.navigateByUrl(`/review/fee-comparison/${this.reviewService.comparison.id}`);
        })
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.reviewService.saveObservable.subscribe((callback) => {
            callback && callback();
        })
    }

    leaveSubscribe(): void {
        this.reviewLeaveObservable = this.reviewService.leaveReviewObservable.subscribe(() => {
            this.router.navigateByUrl('/supplier/comparisons-list');
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
