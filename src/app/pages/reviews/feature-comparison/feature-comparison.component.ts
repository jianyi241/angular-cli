import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewRepository} from "../../../repository/review-repository";
import {CompareVo} from "../../../model/vo/compareVo";
import {ProductPropInfo} from "../../../model/po/productPropInfo";
import {PlatformRepository} from "../../../repository/platform-repository";
import {ImgShowModalComponent} from "../img-show-modal/img-show-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ScrollService} from "../../../service/scroll.service";
import {ReviewLayoutComponent} from "../../../common/review-layout/review-layout.component";
import {LocalStorageObServable} from "../../../observable/local-storage-observable";
import {ProductVo} from "../../../model/vo/ProductVo";
import {PropertyInfo} from "../../../model/po/propertyInfo";
import {ReviewService} from "../../../service/review.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-feature-comparison',
    templateUrl: './feature-comparison.component.html',
    styleUrls: ['./feature-comparison.component.less']
})
export class FeatureComparisonComponent implements OnInit, OnDestroy {
    compareData: CompareVo = new CompareVo();
    selectProps: Array<{ id: string, essential: boolean }> = new Array<{ id: string, essential: boolean }>();
    currentProdProp: ProductPropInfo = new ProductPropInfo();
    reviewNextObservable: any;
    reviewBackObservable: any;

    constructor(private reviewRepository: ReviewRepository,
                private platformRepository: PlatformRepository,
                private storage: LocalStorageObServable,
                private router: Router,
                private modalService: NgbModal,
                private reviewService: ReviewService,
                private scrollService: ScrollService,
                public reviewLayoutComponent: ReviewLayoutComponent
    ) {
    }


    ngOnInit(): void {
        this.subscribe();
        this.storage.getItem('select-essential').subscribe(data => {
            this.selectProps = data || [];
            this.compareList(this.selectProps.map(p => p.id))
        })
    }

    ngOnDestroy(): void {
        this.reviewNextObservable.unsubscribe();
        this.reviewBackObservable.unsubscribe();
    }

    subscribe(): void {
        this.nextSubscribe();
        this.backSubscribe();
    }

    nextSubscribe(): void {
        this.reviewNextObservable = this.reviewService.nextObservable.subscribe(() => {
            this.router.navigateByUrl('/review/metric-comparison');
        });
    }
    backSubscribe(): void {
        this.reviewBackObservable = this.reviewService.backObservable.subscribe(() => {
            this.router.navigateByUrl('/review/feature-selection');
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

    compareList(props: Array<string>) {
        this.reviewRepository.compareList(props).subscribe(res => {
            this.compareData = Object.assign(this.compareData, res.data);
            if (!this.selectProps || this.selectProps.length == 0) {
                return
            }
            //检查当前项目是否存在uncheck
            if (this.compareData.productVos && this.compareData.productVos.length > 0) {
                this.compareData.productVos.forEach(p => {
                    if (p.productPropVoList && p.productPropVoList.length > 0) {
                        let prodPropIds = p.productPropVoList.map(pp => pp.shPropertyId);
                        //对比featureIds 和 productPropIds
                        let idCheck = props.some(id => !prodPropIds.includes(id));
                        if (!idCheck) {
                            let valueCheck = p.productPropVoList.some(pp => pp.propValue == 'no');
                            p.checked = !valueCheck;
                        } else {
                            p.checked = !idCheck;
                        }
                    } else {
                        p.checked = false;
                    }
                });
            }
        })
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
        return this.selectProps.find(s => s.id == prop.id)?.essential;
    }

    openPop(id: string, product: ProductVo): void {
        let prodProps = product.productPropVoList;
        this.currentProdProp = prodProps.find(p => p.shPropertyId == id && p.propValue == 'yes');
    }
}
