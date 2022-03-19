import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {ProductInfo} from "../../../../model/po/productInfo";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {TabType} from "../../../../model/enums/tab-type";
import {ProductPropInfo} from "../../../../model/po/productPropInfo";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {PropertyInfo} from "../../../../model/po/propertyInfo";

@Component({
    selector: 'app-feature-form',
    templateUrl: './feature-form.component.html',
    styleUrls: ['./feature-form.component.less']
})
export class FeatureFormComponent implements OnInit {
    product: ProductInfo = new ProductInfo();
    groups: Array<GroupInfo> = new Array<GroupInfo>();
    subGroup: GroupInfo = new GroupInfo();
    props: Array<PropertyInfo> = new Array<PropertyInfo>();
    productProps: Array<ProductPropInfo> = new Array<ProductPropInfo>();
    constructor(private activatedRoute: ActivatedRoute,
                private platformRepository: PlatformRepository,
                private supplierRepository: SupplierRepository) {

    }

    ngOnInit(): void {
        this.parseRouteParam();
        this.groupList();
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            let productId = params['productId'];
            this.productDetail(productId);
            this.productPropList(productId);
        })
    }

    productDetail(id: string): void {
        this.platformRepository.productDetail(id).subscribe(res => {
            this.product = Object.assign(this.product, res.data);
        });
    }

    groupList(): void {
        this.supplierRepository.groupList(TabType.features.value).subscribe(res => {
            this.groups = res.data;
            if (this.groups.length == 0) return;
            let subGroups = this.groups[0].subList || [];
            if (subGroups.length == 0) return;
            this.chooseSubGroup(subGroups[0]);
        })
    }

    propList(subGroupId: string): void {
        this.supplierRepository.propList(subGroupId).subscribe(res => {
            this.props = res.data;
        });
    }

    productPropList(productId: string): void {
        this.platformRepository.productPropList(TabType.features.value, productId).subscribe(res => {
            this.productProps = res.data;
        })
    }

    chooseSubGroup(group: GroupInfo) {
        this.subGroup = group;
        this.propList(group.id);
    }

    chooseGroup(group: GroupInfo) {
        let subGroups = group.subList || [];
        // if (subGroups.length == 0) return;
        // this.chooseSubGroup(subGroups[0]);
    }
}
