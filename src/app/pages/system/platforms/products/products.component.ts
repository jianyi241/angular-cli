import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductInfo} from "../../../../model/po/productInfo";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {Constants} from "../../../../model/constants";
import {Page} from "../../../../model/vo/page";
import {ConfigService} from "../../../../service/config.service";
import {ProductCondition} from "../../../../model/condition/product-condition";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
    productCondition: ProductCondition =new ProductCondition(1,10);
    products: Array<ProductInfo> = new Array<ProductInfo>();
    productPage: Page<ProductInfo> = new Page<ProductInfo>();
    constructor(private router: Router,
                private platformRepository: PlatformRepository,
                public configService: ConfigService) {
    }

    ngOnInit(): void {
        this.productCondition.order = {
            asc: true,
            column: 'update_time'
        }
        this.getProductList();
    }


    getProductList() {
        this.platformRepository.getProductsPage(this.productCondition).subscribe(res => {
            this.productPage = res.data;
        },err => {})
    }
    pageChange(current: number) {
        this.productCondition.current = current
        this.getProductList()
    }
    sortList(column: string,type: number) {
        if (type === 0) {
            this.productCondition.order = {column: 'update_time', asc: true}
        } else {
            this.productCondition.order = {column, asc: type === 1}
        }
        this.getProductList()
    }
    searchList() {
        this.productCondition.current = 1
        this.getProductList()
    }

    toView(id: string) {
        this.router.navigateByUrl(`/platform/product-box-detail/overview/${id}`)
    }

    editProduct(product: ProductInfo) {
        this.router.navigateByUrl(`/platform/product-tab/overview/${product.id}/${product.versionId || Constants.VERSION}`);
    }
}
