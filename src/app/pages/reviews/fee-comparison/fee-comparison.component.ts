import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {ConfigService} from "../../../service/config.service";
import {ReviewRepository} from "../../../repository/review-repository";
import {Router} from "@angular/router";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {ComparisonFeeInfo} from "../../../model/po/comparisonFeeInfo";
import {ActivatedRoute} from "@angular/router";
import {ToastRepository} from "../../../repository/toast-repository";
import {ComparisonMemberInfo} from "../../../model/po/comparisonMemberInfo";
import {ComparisonMemberValueInfo} from "../../../model/po/comparisonMemberValueInfo";
import {ComparisonMemberValueType} from "../../../model/enums/comparison-member-value-type";
import {dealThousands} from "../../../utils/amount-format";

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
    comparisonFeeInfo: ComparisonFeeInfo = new ComparisonFeeInfo();

    constructor(public reviewService: ReviewService,
                public configService: ConfigService,
                private reviewRepository: ReviewRepository,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private toastRepository: ToastRepository) {
    }

    ngOnInit(): void {
        this.subscribe();
        this.activatedRoute.params.subscribe(res => {
            this.comparisonFeeInfo.comparisonId = res.id
            this.getFeeInfo()
        })
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
            const check = this.checkError()
            if (!check.totalCheck || !check.idpsCheck || !check.superCheck || this.getMemberTotalBalance() <= 0) {
                this.toastRepository.showDanger('please check data')
                return
            }
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

    formatAmount(amount: number): string {
        return dealThousands(amount.toString());
    }

    getFeeInfo(): void {
        this.reviewRepository.getFeeInfo(this.comparisonFeeInfo.comparisonId).subscribe(res => {
            if (res.statusCode !== 200) {
                this.toastRepository.showDanger(res.msg || 'get fee info failed.')
            }
            if (res.data) {
                this.comparisonFeeInfo = res.data
            }
        })
    }

    saveOrUpdateFeeInfo(): void {
        if (this.getMemberTotalBalance() > 99999999) {
            this.toastRepository.showDanger('Account max value in this is 99999999.')
            return
        }
        this.reviewRepository.saveOrUpdateComparisonFee(this.comparisonFeeInfo).subscribe(res => {
            if (res.statusCode !== 200) {
                this.toastRepository.showDanger(res.msg || 'save failed.')
                return
            }
            this.comparisonFeeInfo = res.data
        })
    }

    onBlur() {
        setTimeout(() => {
            this.saveOrUpdateFeeInfo()
        }, 300)
    }

    getMemberBalance(member: ComparisonMemberInfo, type: string = 'all'): number {
        let sum = member.memberValues.map(i => i.balance).reduce((a,b) => a + b, 0)
        if (type === ComparisonMemberValueType.idps.value || type === ComparisonMemberValueType.super.value) {
         sum = member.memberValues.filter(r => r.type === type).map(i => i.balance).reduce((a,b) => a + b, 0)
        }
        return !sum ? 0 : sum
    }

    getMemberTotalBalance(type: string = 'all'): number {
        if (!this.comparisonFeeInfo.members) return 0
        let total: number = this.comparisonFeeInfo.members.map((e) => this.getMemberBalance(e)).reduce((a, b) => a + b, 0)
        if (type === ComparisonMemberValueType.idps.value || type === ComparisonMemberValueType.super.value) {
            total = this.comparisonFeeInfo.members.map((e) => this.getMemberBalance(e, type)).reduce((a, b) => a + b, 0)
        }
        return total
    }

    checkError(): {totalCheck: boolean,idpsCheck: boolean,superCheck: boolean} {
        const heldProps = [{
            propName: 'idpsCashBalance',
            valid: this.getMemberTotalBalance(ComparisonMemberValueType.idps.value) > 0
        }, {
            propName: 'superCashBalance',
            valid: this.getMemberTotalBalance(ComparisonMemberValueType.super.value) > 0
        },{
            propName: 'mfBalanceI',
            valid: this.comparisonFeeInfo.chooseMf
        },{
            propName: 'auBalanceI',
            valid: this.comparisonFeeInfo.chooseAu
        },{
            propName: 'intlBalanceI',
            valid: this.comparisonFeeInfo.chooseIntl
        },{
            propName: 'maBalanceI',
            valid: this.comparisonFeeInfo.chooseMa
        },{
            propName: 'bondBalanceI',
            valid: this.comparisonFeeInfo.chooseBond
        }]
        const heldTotalBalance = heldProps.map(i =>
            this.comparisonFeeInfo[i.propName] && i.valid ? this.comparisonFeeInfo[i.propName] : 0
        ).reduce((a, b) => a + b,0)
        const idpsCashBalance = this.comparisonFeeInfo.idpsCashBalance ? this.comparisonFeeInfo.idpsCashBalance : 0
        const superCashBalance = this.comparisonFeeInfo.superCashBalance ? this.comparisonFeeInfo.superCashBalance : 0
        return {
            totalCheck: heldTotalBalance <= this.getMemberTotalBalance(),
            idpsCheck: this.getMemberTotalBalance(ComparisonMemberValueType.idps.value) ? idpsCashBalance <= this.getMemberTotalBalance(ComparisonMemberValueType.idps.value) : true,
            superCheck: this.getMemberTotalBalance(ComparisonMemberValueType.super.value) ? superCashBalance <= this.getMemberTotalBalance(ComparisonMemberValueType.super.value) : true,
        }
    }

    removeMemberValue(idx: number, name:string): void {
        const index: number = this.comparisonFeeInfo.members[idx].memberValues.findIndex(i => i.name === name);
        if (index === -1) return
        this.comparisonFeeInfo.members[idx].memberValues.splice(index, 1);
        this.saveOrUpdateFeeInfo()
    }

    addMemberValue(idx: number, type: string): void {
        const _name = type === ComparisonMemberValueType.idps.value ? 'IDPS' : 'Super/Pension'
        const memberValues = this.comparisonFeeInfo.members[idx].memberValues.filter(i => i.type === type)
        let num = 1
        if (memberValues && memberValues.length) {
            num = memberValues.length + 1
        }
        this.comparisonFeeInfo.members[idx].memberValues.push({
            name:`${_name} ${num}`,
            balance: null,
            type: type
        })
        this.saveOrUpdateFeeInfo()
    }

    addMember() {
        let num = 1
        if (this.comparisonFeeInfo.members && this.comparisonFeeInfo.members.length) {
            num = this.comparisonFeeInfo.members.length + 1
        }
        this.comparisonFeeInfo.members.push({
            name: `Family member/entity ${num}`,
            memberValues: []
        })
        this.saveOrUpdateFeeInfo()
    }

    removeMember(idx: number): void{
        this.comparisonFeeInfo.members.splice(idx, 1)
        this.saveOrUpdateFeeInfo()
    }

    getMemberValuesByType(memberValues: Array<ComparisonMemberValueInfo>, type: string): Array<ComparisonMemberValueInfo> {
        return memberValues.filter(i => i.type === type)
    }
}
