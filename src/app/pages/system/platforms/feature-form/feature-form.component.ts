import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {ProductInfo} from "../../../../model/po/productInfo";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {TabType} from "../../../../model/enums/tab-type";
import {ProductPropInfo} from "../../../../model/po/productPropInfo";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-feature-form',
    templateUrl: './feature-form.component.html',
    styleUrls: ['./feature-form.component.less']
})
export class FeatureFormComponent implements OnInit {
    product: ProductInfo = new ProductInfo();
    groups: Array<GroupInfo> = new Array<GroupInfo>();
    productProps: Array<ProductPropInfo> = new Array<ProductPropInfo>();
    public Editor = ClassicEditor;

    constructor(private activatedRoute: ActivatedRoute,
                private platformRepository: PlatformRepository) {

    }

    ngOnInit(): void {
        // this.parseRouteParam();
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            let productId = params['productId'];
            this.productDetail(productId);
        })
    }

    productDetail(id: string): void {
        this.platformRepository.productDetail(id).subscribe(res => {
            this.product = Object.assign(this.product, res.data);
        });
    }

    groupAndPropList(productId: string): void {
        this.platformRepository.groupAndPropList(productId).subscribe(res => {
            this.groups = res.data;
        })
    }

    productPropList(productId: string): void {
        this.platformRepository.productPropList(TabType.features.value, productId).subscribe(res => {
            this.productProps = res.data;
        })
    }

}
