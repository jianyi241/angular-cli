import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ReviewRepository} from "../../../repository/review-repository";
import {CompareVo} from "../../../model/vo/compareVo";
import {ProductPropInfo} from "../../../model/po/productPropInfo";
import {PlatformRepository} from "../../../repository/platform-repository";
import {ImgShowModalComponent} from "../img-show-modal/img-show-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ScrollService} from "../../../service/scroll.service";
import {ReviewLayoutComponent} from "../../../common/review-layout/review-layout.component";

@Component({
    selector: 'app-feature-comparison',
    templateUrl: './feature-comparison.component.html',
    styleUrls: ['./feature-comparison.component.less']
})
export class FeatureComparisonComponent implements OnInit {
    compareData: CompareVo = new CompareVo();

    constructor(private reviewRepository: ReviewRepository,
                private platformRepository: PlatformRepository,
                private modalService: NgbModal,
                private scrollService: ScrollService,
                public reviewLayoutComponent:ReviewLayoutComponent
    ) {
    }


    ngOnInit(): void {
        this.productList();
    }

    getChecked(id, prodProps: Array<ProductPropInfo>): string {
        if (prodProps.length == 0) return 'icon-close-red';
        let some = prodProps.some(p => p.shPropertyId == id && p.propValue == 'yes');
        return some ? 'icon-checked-green' : 'icon-close-red';
    }
    productList() {
        this.platformRepository.productList().subscribe(res => {
            if (!res.data || res.data.length == 0 ) return;
            this.compareList(res.data.map(p => p.id))
        })
    }

    compareList(productIds: Array<string>) {
        this.reviewRepository.compareList(productIds).subscribe(res => {
            this.compareData = Object.assign(this.compareData, res.data);
        })
    }


    showPic(object): void {
        const modalRef = this.modalService.open(ImgShowModalComponent, {
            size: 'lg',
            windowClass: 'popup-modal',
            centered: true
        });
        modalRef.result.then((result) => {
        }, (reason) => {
        });

        object.closePopover.close();
    }

    scrollEvent(e):void{
        this.reviewLayoutComponent.viewHead.isScrollFixed =e;
    }
}
