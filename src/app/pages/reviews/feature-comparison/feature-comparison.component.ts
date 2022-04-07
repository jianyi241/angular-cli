import {Component, OnInit} from '@angular/core';
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

@Component({
    selector: 'app-feature-comparison',
    templateUrl: './feature-comparison.component.html',
    styleUrls: ['./feature-comparison.component.less']
})
export class FeatureComparisonComponent implements OnInit {
    compareData: CompareVo = new CompareVo();
    selectProps: Array<{ id: string, essential: boolean }> = new Array<{ id: string, essential: boolean }>();
    currentProdProp: ProductPropInfo = new ProductPropInfo();

    constructor(private reviewRepository: ReviewRepository,
                private platformRepository: PlatformRepository,
                private storage: LocalStorageObServable,
                private modalService: NgbModal,
                private scrollService: ScrollService,
                public reviewLayoutComponent: ReviewLayoutComponent
    ) {
    }


    ngOnInit(): void {
        this.storage.getItem('select-essential').subscribe(data => {
            this.selectProps = data || [];
            this.compareList(this.selectProps.map(p => p.id))
        })
    }

    getChecked(id, product: ProductVo): string {
        let prodProps = product.productPropVoList;
        if (prodProps.length == 0) {
            product.checked = false;
            return 'icon-close-red';
        }
        let some = prodProps.some(p => p.shPropertyId == id && p.propValue == 'yes');
        if (!some) {
            product.checked = false;
            return 'icon-close-red';
        }
        product.checked = true;
        return 'icon-checked-green';
    }

    compareList(props: Array<string>) {
        this.reviewRepository.compareList(props).subscribe(res => {
            this.compareData = Object.assign(this.compareData, res.data);
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
