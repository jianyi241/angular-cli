import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {Router} from "@angular/router";
import {AnalysisType} from "../../../model/enums/analysis-type";

 interface FamilyMember {
     id?: string,
     idpsArr?: Array<{ name: string, value: number }>,
     superArr?: Array<{ name: string, value: number }>,
 }

@Component({
    selector: 'app-fee-comparison',
    templateUrl: './fee-comparison.component.html',
    styleUrls: ['./fee-comparison.component.less']
})
export class FeeComparisonComponent implements OnInit, OnDestroy {
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewSaveObservable: any;
    reviewLeaveObservable: any;
    idpsArr: Array<{ name: string, value: number }> = [{name: '', value: 0}];
    superArr: Array<{ name: string, value: number }> = [{name: '', value: 0}];
    memberArray: Array<FamilyMember> = [{
        id: '',
        idpsArr: [{name: '', value: 0}],
        superArr: [{name: '', value: 0}]
    }]
    platformItems: Array<{ name: string, value: boolean }> = [
        {name: 'Managed funds (held outside managed accounts)', value: false},
        {name: 'Managed accounts (SMA or MDA models)', value: false},
        {name: 'Australian listed investments (held outside managed accounts)', value: false},
        {name: 'International listed investments (held outside managed accounts)', value: false},
        {name: 'Unlisted bonds', value: false},
        {name: 'Retail insurance', value: false},
    ];
    investmentClassesAccount: Array<{label: string,value: number}> = [
        {
            label: 'Cash in IDPS accounts',
            value: null
        },{
            label: 'Cash in Super/Pension accounts',
            value: null
        },{
            label: 'Managed funds',
            value: null
        },{
            label: 'Managed accounts',
            value: null
        },{
            label: 'Australian listed investments',
            value: null
        },{
            label: 'International listed investments',
            value: null
        },{
            label: 'Unlisted bonds',
            value: null
        }
    ]

    averageTransactionSize: Array<{label: string,type: string,value: number}> = [
        {
            label: 'Number of managed fund transactions',
            type: 'text',
            value: null
        },{
            label: 'Average value of each managed fund transaction',
            type: 'number',
            value: null
        },{
            label: 'Number of Australian listed investment transactions',
            type: 'text',
            value: null
        },{
            label: 'Average value of each Australian listed investment transaction',
            type: 'number',
            value: null
        },{
            label: 'Number of international listed investment transactions',
            type: 'text',
            value: null
        },{
            label: 'Average value of each international listed investment transaction',
            type: 'number',
            value: null
        },{
            label: 'Number of unlisted bond/fixed income transactions',
            type: 'text',
            value: null
        },{
            label: 'Average value of each unlisted bonds/fixed income transaction',
            type: 'number',
            value: null
        }
    ]

    clientAverageTransactionSize: Array<{label: string,type: string,value: number}> = [
        {
            label: 'Number of managed fund transactions',
            type: 'text',
            value: null
        },{
            label: 'Average value of each managed fund transaction',
            type: 'number',
            value: null
        },{
            label: 'Number of Australian listed investment transactions',
            type: 'text',
            value: null
        },{
            label: 'Average value of each Australian listed investment transaction',
            type: 'number',
            value: null
        },{
            label: 'Number of international listed investment transactions',
            type: 'text',
            value: null
        },{
            label: 'Average value of each international listed investment transaction',
            type: 'number',
            value: null
        }
    ]

    constructor(public reviewService: ReviewService,
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
        this.reviewLeaveObservable && this.reviewLeaveObservable.unsubscribe();
    }


    subscribe(): void {
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
        this.leaveSubscribe();
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            this.router.navigateByUrl(`/review/fee-review/${this.reviewService.comparison.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.reviewService.preStep(AnalysisType.fee);
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

    addIdps(idx: number) {
        this.memberArray[idx].idpsArr.push({
            name: '',
            value: null,
        });
    }

    addSuper(idx: number) {
        this.memberArray[idx].superArr.push({
            name: '',
            value: null,
        });
    }

    getFamilyGroupTotalAssets(member: FamilyMember): string {
        const idpsSum = member.idpsArr.map(i => i.value).reduce((a,b) => a + b, 0)
        const superSum = member.superArr.map(i => i.value).reduce((a,b) => a + b, 0)
        const sum = idpsSum + superSum
        if (sum > 0) {
            return sum.toFixed(3)
        } else {
            return '0'
        }
    }

    totalValue(): number {
        const total: number = this.memberArray.map((e) => Number(this.getFamilyGroupTotalAssets(e))).reduce((a, b) => a + b, 0)
        return total
    }

    removeSuper(idx: number, superIndex: number) {
        if (superIndex == 0) {
            return;
        }
        this.memberArray[idx].superArr.splice(superIndex, 1);
    }

    removeIdps(idx: number,idpsIndex: number) {
        if (idpsIndex == 0) {
            return;
        }
        this.memberArray[idx].idpsArr.splice(idpsIndex, 1);
    }

    addFamilyGroup() {
        this.memberArray.push({
            id: '',
            idpsArr: [],
            superArr: [],
        })
    }

    removeMember(idx: number): void{
        this.memberArray.splice(idx, 1);
    }
}
