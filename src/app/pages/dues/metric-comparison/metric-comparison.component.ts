import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReviewRepository} from "../../../repository/review-repository";
import {CompareMetricVo} from "../../../model/vo/compareMetircVo";
import {TabType} from "../../../model/enums/tab-type";
import {ConfigService} from "../../../service/config.service";
import {PropertyVo} from "../../../model/vo/PropertyVo";
import {ProductPropInfo} from "../../../model/po/productPropInfo";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {ComparisonProductVo} from "../../../model/vo/comparisonProductVo";
import {NgbModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ComparisonCommentInfo} from "../../../model/po/comparisonCommentInfo";
import {environment} from "../../../../environments/environment";
import {ToastRepository} from "../../../repository/toast-repository";
import {SaveService} from "../../../service/save.service";
import {DueService} from "../../../service/due.service";
import {ComparisonProductInfo} from "../../../model/po/comparisonProductInfo";
import {PropType} from "../../../model/enums/prop-type";
import {ImgShowModalComponent} from "../img-show-modal/img-show-modal.component";

@Component({
    selector: 'app-metric-comparison',
    templateUrl: './metric-comparison.component.html',
    styleUrls: ['../feature-comparison/feature-comparison.component.less']
})
export class MetricComparisonComponent implements OnInit, OnDestroy {
    compareData: CompareMetricVo = new CompareMetricVo();
    hideRemovePlatformFlag = false;
    initComparisonObservable: any;
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewSaveObservable: any;

    constructor(public dueService: DueService,
                public configService: ConfigService,
                private modalService: NgbModal,
                private reviewRepository: ReviewRepository,
                private toastRepository: ToastRepository,
                private saveService: SaveService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscribe();
        this.getMetricComparison();
    }

    ngOnDestroy(): void {
        this.initComparisonObservable && this.initComparisonObservable.unsubscribe();
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
        this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
    }

    subscribe(): void {
        this.initComparisonObservable = this.dueService.initComparisonObservable.subscribe(() => {
            this.getMetricComparison();
        })
        this.nextSubscribe();
        this.backSubscribe();
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.dueService.nextObservable.subscribe(() => {
            this.router.navigateByUrl(`/due/fee-comparison/${this.dueService.due.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.dueService.backObservable.subscribe(() => {
            this.router.navigateByUrl(`/due/metric-selection/${this.dueService.due.id}`);
        })
    }

    getMetricComparison(): void {
        if (!this.dueService.due.id) {
            return;
        }
        this.reviewRepository.getMetricComparison(this.dueService.due.id).subscribe(res => {
            this.compareData = Object.assign(this.compareData, res.data);
        });
    }

    getNameByTab(tabType: number) {
        let type = TabType.parseEnum(tabType);
        return type.name;
    }

    getProductPropValue(prop: PropertyVo, productPropVoList: Array<ProductPropInfo>): any {
        if (!productPropVoList) return '';
        let productProp = productPropVoList.find(pp => pp.shPropertyId == prop.id);
        if (!productProp) return '';
        // if (prop.type == PropType.longText.value) {
        //     let $1 = $(productProp.propValue);
        //     // if (productProp.propValue.length > 100) {
        //     //     console.log($1);
        //     // }
        //     let text = $1.text();
        //     return text;
        // }
        if (prop.type == PropType.attachment.value) {
            return productProp.attachmentVo?.visitUrl;
        }
        return productProp.propValue;
    }

    isMainProduct(product: ComparisonProductVo): boolean {
        return this.dueService.due.mainPlatformId == product.shProductId;
    }

    hidClassFlag(product) {
        return !product.showFlag && product.shProductId != this.dueService.due.mainPlatformId
    }

    shortClassFlag(product: ComparisonProductVo): boolean {
        return product.shortFlag && product.showFlag;
    }

    hideByFlag(product: ComparisonProductVo): boolean {
        if (this.isMainProduct(product)) {
            return false;
        }
        return !product.showFlag && this.hideRemovePlatformFlag;
    }

    removePlatform(product: ComparisonProductVo) {
        product.showFlag = false;
        this.changeProduct(product, (data) => {
            product.id = data.id;
        }, () => {
            product.showFlag = true;
        });
    }

    resetPlatform(product: ComparisonProductVo) {
        product.showFlag = true;
        this.changeProduct(product, (data) => {
            product.id = data.id;
        }, () => {
            product.showFlag = false;
        });
    }

    addShortList(product: ComparisonProductVo) {
        product.shortFlag = true;
        this.changeProduct(product, (data) => {
            product.id = data.id;
            this.getMetricComparison();
        }, () => {
            product.shortFlag = false;
        });
    }

    changeProduct(product: ComparisonProductVo, callback?: (data: ComparisonProductInfo) => void, error?: () => void) {
        product.shVersionId = this.dueService.due.modelVersionId;
        product.shComparisonId = this.dueService.due.id;
        this.reviewRepository.changeProduct(product).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                error && error();
                return
            }
            callback && callback(res.data);
        })
    }

    getComment(product: ComparisonProductVo, pComment: NgbPopover) {
        let analyseInfo = this.dueService.due.analyseVoList.find(a => a.name == AnalysisType.metric.value);
        product.comparisonComment = new ComparisonCommentInfo();
        this.reviewRepository.getComment(this.dueService.due.id, analyseInfo.shAnalyseId, product.shProductId).subscribe(res => {
            Object.assign(product.comparisonComment, res.data);
            pComment.open();
        })
    }

    saveComment(product: ComparisonProductVo, pComment: NgbPopover) {
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComment`)) {
            return;
        }
        product.comparisonComment.shComparisonId = this.dueService.due.id;
        let analyseInfo = this.dueService.due.analyseVoList.find(a => a.name == AnalysisType.metric.value);
        product.comparisonComment.shAnalyseId = analyseInfo.shAnalyseId;
        product.comparisonComment.shProductId = product.shProductId;
        this.reviewRepository.saveComment(product.comparisonComment).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            pComment.close();
        })
    }

    showPic(img: any): void {
        const modalRef = this.modalService.open(ImgShowModalComponent, {
            size: 'lg',
            windowClass: 'popup-modal',
            centered: true
        });
        modalRef.componentInstance.img = img;
        modalRef.result.then((result) => {
        }, (reason) => {
        });
    }
}
