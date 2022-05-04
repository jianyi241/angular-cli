import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewService} from "../../service/review.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveTemplateTipComponent} from "../../pages/reviews/save-template-tip/save-template-tip.component";
import {Constants} from "../../model/constants";
import {ReviewRepository} from "../../repository/review-repository";
import {ComparisonVo} from "../../model/vo/comparisonVo";
import {CurrentUserService} from "../../service/current-user.service";

@Component({
    selector: 'app-review-header',
    templateUrl: './review-header.component.html',
    styleUrls: ['./review-header.component.less']
})
export class ReviewHeaderComponent implements OnInit {
    public isScrollFixed: boolean;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                public reviewService: ReviewService,
                private currentUserService: CurrentUserService,
                private reviewRepository: ReviewRepository,
                private modalService: NgbModal) {
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

    save() {
        this.reviewService.save();
    }

    next() {
        this.reviewService.next();
    }

    goBack() {
        this.reviewService.back();
    }

    saveTemplate(): void {
        const modalRef = this.modalService.open(SaveTemplateTipComponent, {
            backdrop: 'static',
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.title = 'Deselect all features?';
        modalRef.componentInstance.info = 'You’ve selected 3 features in this group, are you sure to deselect all of them?';
        modalRef.componentInstance.btnText = 'Yes, deselect all';
        modalRef.componentInstance.btnCancelText = 'No, don’t do anything';

        modalRef.result.then((result) => {

        }, (reason) => {
        });
    }


}
