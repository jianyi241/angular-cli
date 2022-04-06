import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductInfo} from "../../../../model/po/productInfo";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {Constants} from "../../../../model/constants";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
    products: Array<ProductInfo> = new Array<ProductInfo>();

    constructor(private router: Router,
                private platformRepository: PlatformRepository) {
    }

    ngOnInit(): void {
        this.productList();
    }


    productList() {
        this.platformRepository.productList().subscribe(res => {
            this.products = res.data;
        })
    }


    editProduct(product: ProductInfo) {
        this.router.navigateByUrl(`/platform/product-tab/overview/${product.id}/${product.versionId || Constants.VERSION}`);
    }
}
