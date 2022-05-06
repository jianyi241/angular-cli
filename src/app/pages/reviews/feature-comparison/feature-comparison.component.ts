import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewRepository} from "../../../repository/review-repository";
import {CompareFeatureVo} from "../../../model/vo/compareFeatureVo";
import {ProductPropInfo} from "../../../model/po/productPropInfo";
import {PlatformRepository} from "../../../repository/platform-repository";
import {ImgShowModalComponent} from "../img-show-modal/img-show-modal.component";
import {NgbModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ScrollService} from "../../../service/scroll.service";
import {ReviewLayoutComponent} from "../../../common/review-layout/review-layout.component";
import {LocalStorageObServable} from "../../../observable/local-storage-observable";
import {ProductVo} from "../../../model/vo/ProductVo";
import {PropertyInfo} from "../../../model/po/propertyInfo";
import {ReviewService} from "../../../service/review.service";
import {Router} from "@angular/router";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {GroupInfo} from "../../../model/po/groupInfo";
import {ComparisonProductVo} from "../../../model/vo/comparisonProductVo";
import {ToastRepository} from "../../../repository/toast-repository";
import {ComparisonCommentInfo} from "../../../model/po/comparisonCommentInfo";
import {SaveService} from "../../../service/save.service";
import {environment} from "../../../../environments/environment";
import {ConfigService} from "../../../service/config.service";

@Component({
    selector: 'app-feature-comparison',
    templateUrl: './feature-comparison.component.html',
    styleUrls: ['./feature-comparison.component.less']
})
export class FeatureComparisonComponent implements OnInit, OnDestroy {
    compareData: CompareFeatureVo = new CompareFeatureVo();
    currentProdProp: ProductPropInfo = new ProductPropInfo();
    hideRemovePlatformFlag = false;
    initComparisonObservable: any;
    reviewNextObservable: any;
    reviewBackObservable: any;
    reviewSaveObservable: any;

    constructor(private reviewRepository: ReviewRepository,
                private platformRepository: PlatformRepository,
                private toastRepository: ToastRepository,
                private storage: LocalStorageObServable,
                private router: Router,
                private modalService: NgbModal,
                public reviewService: ReviewService,
                public configService: ConfigService,
                private scrollService: ScrollService,
                private saveService: SaveService,
                public reviewLayoutComponent: ReviewLayoutComponent
    ) {
    }


    ngOnInit(): void {
        this.subscribe();
        this.compareList();
    }

    ngOnDestroy(): void {
        this.initComparisonObservable && this.initComparisonObservable.unsubscribe();
        this.reviewNextObservable && this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable && this.reviewBackObservable.unsubscribe();
        this.reviewSaveObservable && this.reviewSaveObservable.unsubscribe();
    }

    subscribe(): void {
        this.initComparisonObservable = this.reviewService.initComparisonObservable.subscribe(() => {
            this.compareList();
        })
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.reviewService.saveObservable.subscribe(() => {

        })
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            this.reviewService.nextStep(AnalysisType.feature);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.router.navigateByUrl(`/review/feature-selection/${this.reviewService.comparison.id}`)
        })
    }

    getChecked(id, product: ProductVo): string {
        let prodProps = product.productPropVoList;
        if (prodProps.length == 0) {
            return 'icon-close-red';
        }
        let some = prodProps.some(p => p.shPropertyId == id && p.propValue == 'yes');
        if (!some) {
            return 'icon-close-red';
        }
        return 'icon-checked-green';
    }

    compareList() {
        if (!this.reviewService.comparison.id) {
            return;
        }
        this.reviewRepository.compareList(this.reviewService.comparison.id).subscribe(res => {
            this.compareData = Object.assign(this.compareData, res.data);
            //检查当前项目是否存在uncheck
            if (this.compareData.comparisonProductVoList && this.compareData.comparisonProductVoList.length > 0) {
                let props = this.compareData.groupVoList.flatMap(g => g.subList || []).flatMap(s => s.propertyVoList || []).map(p => p.id);
                this.compareData.comparisonProductVoList.forEach(p => {
                    if (p.productPropVoList && p.productPropVoList.length > 0) {
                        let prodPropIds = p.productPropVoList.map(pp => pp.shPropertyId);
                        //对比featureIds 和 productPropIds
                        let idCheck = props.some(id => !prodPropIds.includes(id));
                        if (!idCheck) {
                            let valueCheck = p.productPropVoList.some(pp => pp.propValue != 'yes');
                            p.checked = !valueCheck;
                        } else {
                            p.checked = !idCheck;
                        }
                    } else {
                        p.checked = false;
                    }
                });
            }
        });
    }


    showPic(object): void {
        const modalRef = this.modalService.open(ImgShowModalComponent, {
            size: 'lg',
            windowClass: 'popup-modal',
            centered: true
        });
        modalRef.componentInstance.img = this.currentProdProp.attachmentVo?.visitUrl;
        modalRef.result.then((result) => {
        }, (reason) => {
        });

        object.closePopover.close();
    }

    scrollEvent(e): void {
        this.reviewLayoutComponent.viewHead.isScrollFixed = e;
    }

    hasEssential(prop: PropertyInfo): boolean {
        // return this.selectProps.find(s => s.id == prop.id)?.essential;
        return prop.essential;
    }

    openPop(id: string, product: ProductVo): void {
        let prodProps = product.productPropVoList;
        this.currentProdProp = prodProps.find(p => p.shPropertyId == id && p.propValue == 'yes');
    }

    groupMatch(group: GroupInfo, product: ComparisonProductVo): number {
        let propIds = group.subList.flatMap(s => s.propertyVoList.flatMap(p => p.id));
        let total = propIds.length;
        let match = product.productPropVoList.filter(p => p.propValue == 'yes' && propIds.includes(p.shPropertyId)).length;
        return match == 0 ? 0 : parseFloat((match / total).toFixed(2)) * 100;
    }

    allMatch(product: ComparisonProductVo): number {
        let propIds = this.compareData.groupVoList.flatMap(g => g.subList || []).flatMap(s => s.propertyVoList || []).map(p => p.id);
        let total = propIds.length;
        let match = product.productPropVoList.filter(p => p.propValue == 'yes' && propIds.includes(p.shPropertyId)).length;
        return match == 0 ? 0 : parseFloat((match / total).toFixed(2)) * 100;
    }

    isMainProduct(product: ComparisonProductVo): boolean {
        return this.reviewService.comparison.mainPlatformId == product.shProductId;
    }

    hideByFlag(product): boolean {
        if (this.isMainProduct(product)) {
            return false;
        }
        return !product.showFlag && this.hideRemovePlatformFlag;
    }

    removePlatform(product: ComparisonProductVo) {
        product.showFlag = false;
        product.shComparisonId = this.reviewService.comparison.id;
        this.reviewRepository.changeProductStatus(product).subscribe(res => {
            if (res.statusCode != 200) {
                product.showFlag = true;
                this.toastRepository.showDanger(res.msg);
            }
        })
    }

    resetPlatform(product: ComparisonProductVo) {
        product.showFlag = true;
        product.shComparisonId = this.reviewService.comparison.id
        this.reviewRepository.changeProductStatus(product).subscribe(res => {
            if (res.statusCode != 200) {
                product.showFlag = true;
                this.toastRepository.showDanger(res.msg);
            }
        })
    }

    getComment(product: ComparisonProductVo, pComment: NgbPopover) {
        let analyseInfo = this.reviewService.comparison.analyseVoList.find(a => a.name == AnalysisType.feature.value);
        product.comparisonComment = new ComparisonCommentInfo();
        this.reviewRepository.getComment(this.reviewService.comparison.id, analyseInfo.shAnalyseId, product.shProductId).subscribe(res => {
            Object.assign(product.comparisonComment, res.data);
            pComment.open();
        })
    }

    saveComment(product: ComparisonProductVo, pComment: NgbPopover) {
        if (this.saveService.saveCheck(environment.baseURL + `/compare/saveOrUpdateComment`)) {
            return;
        }
        product.comparisonComment.shComparisonId = this.reviewService.comparison.id;
        let analyseInfo = this.reviewService.comparison.analyseVoList.find(a => a.name == AnalysisType.feature.value);
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
}
