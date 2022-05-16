import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductInfo} from "../../../../model/po/productInfo";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {Constants} from "../../../../model/constants";
import {Page} from "../../../../model/vo/page";
import {ConfigService} from "../../../../service/config.service";
import {ProductCondition} from "../../../../model/condition/product-condition";
import {CurrentUser} from "../../../../model/vo/currentUser";
import {CurrentUserService} from "../../../../service/current-user.service";

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
                public configService: ConfigService,
                public currentUserService: CurrentUserService) {
    }

    ngOnInit(): void {
        this.productCondition.order = {
            asc: true,
            column: 'name'
        }
        this.getProductList();
    }

    getProductList(): void{
        this.platformRepository.getProductsPage(this.productCondition).subscribe(res => {
            this.productPage = res.data;
        },err => {})
    }
    pageChange(current: number): void {
        this.productCondition.current = current
        this.getProductList()
    }
    sortList(column: string,type: number): void {
        if (type === 0) {
            this.productCondition.order = {column: 'name', asc: true}
        } else {
            this.productCondition.order = {column, asc: type === 1}
        }
        this.getProductList()
    }
    searchList() : void{
        this.productCondition.current = 1
        this.getProductList()
    }

    toView(product: ProductInfo) : void{
        this.router.navigateByUrl(`/platform/product-box-detail/overview/${product.id}/1/${product.versionId || Constants.VERSION}`)
    }

    editProduct(product: ProductInfo) : void{
        this.router.navigateByUrl(`/platform/product-tab/overview/${product.id}/${product.versionId || Constants.VERSION}`);
    }
}
