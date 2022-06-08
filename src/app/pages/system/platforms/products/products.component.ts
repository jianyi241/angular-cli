import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductInfo} from "../../../../model/po/productInfo";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {Constants} from "../../../../model/constants";
import {Page} from "../../../../model/vo/page";
import {ConfigService} from "../../../../service/config.service";
import {ProductCondition} from "../../../../model/condition/product-condition";
import {CurrentUserService} from "../../../../service/current-user.service";
import {TabType} from "../../../../model/enums/tab-type";
import {SaveService} from '../../../../service/save.service';
import {ToastRepository} from "../../../../repository/toast-repository";
import {environment} from "../../../../../environments/environment";

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
                public currentUserService: CurrentUserService,
                private saveService: SaveService,
                private toastRepository: ToastRepository) {
    }

    ngOnInit(): void {
        this.productCondition.order = {
            asc: true,
            column: 'platform_name'
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
            this.productCondition.order = {column: 'platform_name', asc: true}
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
        this.router.navigateByUrl(`/platform/product-box-detail/overview/${product.id}/${product.versionId || Constants.VERSION}/${TabType.overview.value}`)
    }

    editProduct(product: ProductInfo) : void{
        this.router.navigateByUrl(`/platform/product-tab/overview/${product.id}/${product.versionId || Constants.VERSION}`);
    }

    editProductInfo(e: Event, product: ProductInfo): void {
        e.stopPropagation()
        if (this.saveService.saveCheck(environment.baseURL + `/product/editProduct/${product.id}`)) {
            return;
        }
        this.platformRepository.editProduct(product.id).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            // this.getProjectButtonFlag()
            this.router.navigateByUrl(`/platform/product-tab/overview/${product.id}/${res.data.id}`)
        });
    }

}
