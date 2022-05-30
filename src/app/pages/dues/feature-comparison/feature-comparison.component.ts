import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewRepository} from "../../../repository/review-repository";
import {CompareFeatureVo} from "../../../model/vo/compareFeatureVo";
import {ProductPropInfo} from "../../../model/po/productPropInfo";
import {PlatformRepository} from "../../../repository/platform-repository";
import {ImgShowModalComponent} from "../img-show-modal/img-show-modal.component";
import {NgbModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ScrollService} from "../../../service/scroll.service";
import {LocalStorageObServable} from "../../../observable/local-storage-observable";
import {ProductVo} from "../../../model/vo/ProductVo";
import {PropertyInfo} from "../../../model/po/propertyInfo";
import {Router} from "@angular/router";
import {AnalysisType} from "../../../model/enums/analysis-type";
import {GroupInfo} from "../../../model/po/groupInfo";
import {ComparisonProductVo} from "../../../model/vo/comparisonProductVo";
import {ToastRepository} from "../../../repository/toast-repository";
import {ComparisonCommentInfo} from "../../../model/po/comparisonCommentInfo";
import {SaveService} from "../../../service/save.service";
import {environment} from "../../../../environments/environment";
import {ConfigService} from "../../../service/config.service";
import {DueService} from "../../../service/due.service";
import {DueLayoutComponent} from "../../../common/due-layout/due-layout.component";
import {ComparisonProductInfo} from "../../../model/po/comparisonProductInfo";
import * as Enumerable from "linq";

@Component({
    selector: 'app-feature-comparison',
    templateUrl: './feature-comparison.component.html',
    styleUrls: ['./feature-comparison.component.less']
})
export class FeatureComparisonComponent implements OnInit, OnDestroy {
    compareData: CompareFeatureVo = new CompareFeatureVo();
    currentProdProp: ProductPropInfo = new ProductPropInfo();
    hideRemovePlatformFlag = false;
    hideCommonPropFlag = false;
    hideNonEssential = false;
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
                public dueService: DueService,
                public configService: ConfigService,
                private scrollService: ScrollService,
                private saveService: SaveService,
                public dueLayoutComponent: DueLayoutComponent
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
        this.dueLayoutComponent.viewHead.isScrollFixed = false;
    }

    subscribe(): void {
        this.initComparisonObservable = this.dueService.initComparisonObservable.subscribe(() => {
            this.compareList();
        })
        this.saveSubscribe();
        this.nextSubscribe();
        this.backSubscribe();
    }

    saveSubscribe(): void {
        this.reviewSaveObservable = this.dueService.saveObservable.subscribe((callback) => {
            callback && callback();
        })
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.dueService.nextObservable.subscribe(() => {
            this.router.navigateByUrl(`/due/metric-selection/${this.dueService.due.id}`);
        });
    }

    backSubscribe(): void {
        this.reviewBackObservable = this.dueService.backObservable.subscribe(() => {
            this.router.navigateByUrl(`/due/feature-selection/${this.dueService.due.id}`)
        })
    }

    getChecked(id, product: ProductVo): string {
        let prodProps = product.productPropVoList;
        if (prodProps.length == 0) {
            return 'icon-no-data';
        }
        let hasYes = prodProps.some(p => p.shPropertyId == id && p.propValue == 'yes');
        if (hasYes) {
            return 'icon-checked-green';
        }
        let hasNo = prodProps.some(p => p.shPropertyId == id && p.propValue == 'no');
        if (hasNo) {
            return 'icon-close-red';
        }
        return 'icon-no-data';

    }

    compareList() {
        if (!this.dueService.due.id) {
            return;
        }
        this.reviewRepository.compareList(this.dueService.due.id).subscribe(res => {
            this.compareData = Object.assign(this.compareData, res.data);
            //检查当前项目是否存在uncheck
            if (this.compareData.comparisonProductVoList && this.compareData.comparisonProductVoList.length > 0) {
                let props = this.compareData.groupVoList.flatMap(g => g.subList || []).flatMap(s => s.propertyVoList || []);
                let anyEssential = props.some(p => !p.essential);
                // let propIds = props.map(p => p.id);
                this.compareData.comparisonProductVoList.forEach(p => {
                    p.essential = anyEssential;
                    /*if (p.productPropVoList && p.productPropVoList.length > 0) {
                        let prodPropIds = p.productPropVoList.map(pp => pp.shPropertyId);
                        //对比featureIds 和 productPropIds
                        let idCheck = propIds.some(id => !prodPropIds.includes(id));
                        if (!idCheck) {
                            let valueCheck = p.productPropVoList.some(pp => pp.propValue != 'yes');
                            p.checked = !valueCheck;
                        } else {
                            p.checked = !idCheck;
                        }
                    } else {
                        p.checked = false;
                    }*/
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
        this.dueLayoutComponent.viewHead.isScrollFixed = e;
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
        let matchProps = product.productPropVoList.filter(p => p.propValue == 'yes' && propIds.includes(p.shPropertyId));
        let match = Enumerable.from(matchProps).distinct(m => m.shPropertyId).toArray().length;
        return match == 0 ? 0 : parseFloat((match / total * 100).toFixed(0));
    }

    allMatch(product: ComparisonProductVo): number {
        let propIds = this.compareData.groupVoList.flatMap(g => g.subList || []).flatMap(s => s.propertyVoList || []).map(p => p.id);
        let total = propIds.length;
        let matchProps = product.productPropVoList.filter(p => p.propValue == 'yes' && propIds.includes(p.shPropertyId));
        let match = Enumerable.from(matchProps).distinct(m => m.shPropertyId).toArray().length;
        return match == 0 ? 0 : parseFloat((match / total * 100).toFixed(0));
    }

    isMainProduct(product: ComparisonProductVo): boolean {
        return this.dueService.due.mainPlatformId == product.shProductId;
    }

    hideByFlag(product): boolean {
        if (this.isMainProduct(product)) {
            return false;
        }
        return !product.showFlag && this.hideRemovePlatformFlag;
    }

    hidClassFlag(product) {
        return !product.showFlag && product.shProductId != this.dueService.due.mainPlatformId
    }

    shortClassFlag(product: ComparisonProductVo): boolean {
        return product.shortFlag && !product.essential && product.showFlag;
    }

    hideCommon(prop: PropertyInfo): boolean {
        let products = this.compareData.comparisonProductVoList;
        let prodProps = products.filter(p => p.productPropVoList && p.productPropVoList.length > 0).map(p => p.productPropVoList);
        if (prodProps.length < products.length) {
            return false;
        }
        let propProds = prodProps.flat(1);
        if (propProds.length == 0) {
            return false;
        }
        let some = propProds.some(p => p.shPropertyId == prop.id && (p.propValue == 'no' || !p.propValue));
        return !some && this.hideCommonPropFlag;
    }

    hideEs(prop: PropertyInfo): boolean{
        return !prop.essential && this.hideNonEssential;
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
            this.compareList();
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
        let analyseInfo = this.dueService.due.analyseVoList.find(a => a.name == AnalysisType.feature.value);
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
        let analyseInfo = this.dueService.due.analyseVoList.find(a => a.name == AnalysisType.feature.value);
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
