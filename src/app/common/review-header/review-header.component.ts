import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewService} from "../../service/review.service";
import {Constants} from "../../model/constants";
import {ReviewRepository} from "../../repository/review-repository";
import {ComparisonVo} from "../../model/vo/comparisonVo";
import {CurrentUserService} from "../../service/current-user.service";
import {ComparisonAnalyseInfo} from "../../model/po/comparisonAnalyseInfo";
import {AnalysisType} from "../../model/enums/analysis-type";
import {Commons} from "../../utils/Commons";
import {ComparisonStatus} from "../../model/enums/comparison-status";
import {ToastRepository} from "../../repository/toast-repository";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-review-header',
    templateUrl: './review-header.component.html',
    styleUrls: ['./review-header.component.less']
})
export class ReviewHeaderComponent implements OnInit {
    public isScrollFixed: boolean;

    constructor(public router: Router,
                private activatedRoute: ActivatedRoute,
                private toastRepository: ToastRepository,
                public reviewService: ReviewService,
                private modalService: NgbModal,
                private currentUserService: CurrentUserService,
                private reviewRepository: ReviewRepository,) {
        this.reviewService.comparison = new ComparisonVo();
        this.reviewService.comparison.companyId = this.currentUserService.currentUser().companyId;
    }

    ngOnInit(): void {
        let comparisonId = this.activatedRoute?.firstChild?.snapshot?.params['id'];
        if (comparisonId && comparisonId != Constants.NON_ID) {
            this.reviewRepository.getCompareDetail(comparisonId).subscribe(res => {
                Object.assign(this.reviewService.comparison, res.data);
                this.reviewService.comparison.mainPlatformCheck = !!this.reviewService.comparison.mainPlatformId;
                let products = this.reviewService.comparison.comparisonProductVoList;
                if (products && products.length > 0) {
                    let feeProducts = products.filter(p => p.feeFlag);
                    let nonFeeProducts = products.filter(p => !p.feeFlag);
                    this.reviewService.comparison.feeProducts = feeProducts.map(p => p.shProductId);
                    this.reviewService.comparison.feeProductName = feeProducts.map(p => p.productName).join(', ');
                    this.reviewService.comparison.nonFeeProducts = nonFeeProducts.map(p => p.shProductId);
                    this.reviewService.comparison.nonFeeProductName = nonFeeProducts.map(p => p.productName).join(', ');
                }
                this.reviewService.initNotify();
            });
        }
    }

    save(callback?: () => void) {
        this.reviewService.save(callback);
    }

    next() {
        this.reviewService.next();
    }

    goBack() {
        this.reviewService.back();
    }

    getDynamicAnaName(analysis: ComparisonAnalyseInfo): string {
        let analysisType = AnalysisType.parseEnum(analysis.name);
        return analysisType?.name || '';
    }

    getDynamicAnaLinks(analysis: ComparisonAnalyseInfo): Array<string> {
        let analysisType = AnalysisType.parseEnum(analysis.name);
        return analysisType?.links || [];
    }

    totalDynamicAna(): number {
        return this.reviewService.comparison.analyseVoList.length + 2;
    }

    complete() {
        let copy = Commons.deepCopy(this.reviewService.comparison);
        copy.status = ComparisonStatus.Completed.value;
        this.reviewRepository.saveComparison(copy).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess("Save successfully.")
        })
    }

    leaveReview() {
        this.reviewService.leave();
    }
}
