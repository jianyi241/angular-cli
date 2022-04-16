import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewService} from "../../../service/review.service";
import {Router} from "@angular/router";
import {ReviewRepository} from "../../../repository/review-repository";
import {CompareMetricVo} from "../../../model/vo/compareMetircVo";
import {TabType} from "../../../model/enums/tab-type";
import {ConfigService} from "../../../service/config.service";
import {PropertyVo} from "../../../model/vo/PropertyVo";
import {ProductPropInfo} from "../../../model/po/productPropInfo";

@Component({
    selector: 'app-metric-comparison',
    templateUrl: './metric-comparison.component.html',
    styleUrls: ['../feature-comparison/feature-comparison.component.less']
})
export class MetricComparisonComponent implements OnInit, OnDestroy {
    compareData: CompareMetricVo = new CompareMetricVo();
    reviewNextObservable: any;
    reviewBackObservable: any;

    constructor(private reviewService: ReviewService,
                public configService: ConfigService,
                private reviewRepository: ReviewRepository,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscribe();
        this.init();
    }

    ngOnDestroy(): void {
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
    }

    init(): void {
        this.getMetricComparison();
    }

    getMetricComparison(): void {
        this.reviewRepository.getMetricComparison().subscribe(res => {
            this.compareData = Object.assign(this.compareData, res.data);
        })
    }

    subscribe(): void {
        this.nextSubscribe();
        this.backSubscribe();
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            this.router.navigateByUrl('/review/fee-comparison');
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.router.navigateByUrl('/review/feature-comparison');
        })
    }

    getNameByTab(tabType: number) {
        let type = TabType.parseEnum(tabType);
        return type.name;
    }

    getProductPropValue(prop: PropertyVo, productPropVoList: Array<ProductPropInfo>): any {
        if (!productPropVoList) return '';
        let productProp = productPropVoList.find(pp => pp.shPropertyId == prop.id);
        if (!productProp) return '';
        return productProp.propValue;
    }
}
