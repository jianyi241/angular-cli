import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {FocusService} from "../../../../service/focus.service";
import {ToastRepository} from "../../../../repository/toast-repository";
import {VersionRepository} from "../../../../repository/version-repository";
import {FileRepository} from "../../../../repository/file-repository";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {ProductInfo} from "../../../../model/po/productInfo";
import {Version} from "../../../../model/po/version";
import {Constants} from "../../../../model/constants";
import {TabType} from "../../../../model/enums/tab-type";
import {ProductFormVo, SubProductFormVo} from "../../../../model/vo/productFormVo";
import {PropertyVo} from "../../../../model/vo/PropertyVo";
import {SubProduct} from "../../../../model/po/subProduct";

@Component({
    selector: 'app-fees-rates-product',
    templateUrl: './fees-rates-product.component.html',
    styleUrls: ['./fees-rates-product.component.less']
})
export class FeesRatesProductComponent implements OnInit, OnDestroy {
    product: ProductInfo = new ProductInfo();
    version: Version = new Version();
    feeRate: ProductFormVo = new ProductFormVo();
    subProduct: SubProductFormVo = new SubProductFormVo();
    routerSubscription: any;
    activatedRouteSubscription: any;

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private focusService: FocusService,
                private toastRepository: ToastRepository,
                private versionRepository: VersionRepository,
                private fileRepository: FileRepository,
                private platformRepository: PlatformRepository) {
    }


    ngOnInit(): void {
        this.subscribe();
        this.init();
    }

    ngOnDestroy(): void {
        this.routerSubscription && this.routerSubscription.unsubscribe();
        this.activatedRouteSubscription && this.activatedRouteSubscription.unsubscribe();
    }


    init(): void {
        this.parseRouterParam();
        this.getVersion();
        this.getProductPropList();
    }

    parseRouterParam(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(res => {
            this.product.id = res['productId'];
            this.version.id = res[Constants.VERSION];
        })
    }

    getProductPropList(): void {
        this.platformRepository.getProductPropList(TabType.feesAndRates.value, this.product.id, this.version.id).subscribe(res => {
            this.feeRate = Object.assign(this.feeRate, res.data);
            if (this.feeRate && this.feeRate.subProductVos && this.feeRate.subProductVos.length > 0) {
                this.chooseGroup(this.feeRate.subProductVos[0]);
            }
        });
    }

    getVersion() {
        if (this.version.id == Constants.VERSION) {
            return;
        }
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
            this.configService.currentVersion = res.data || this.version
        });
    }

    subscribe(): void {
        this.routerSubscription = this.route.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.init();
            }
        });
    }

    chooseGroup(subProduct: SubProductFormVo) {
        this.subProduct = subProduct;
    }

    saveProp(prop: PropertyVo) {
        let productProp = {...prop.productPropVo};
        productProp.shProductId = this.subProduct.id;
        productProp.shPropertyId = prop.id;
        this.platformRepository.saveProductProp(productProp).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            prop.productPropVo = res.data;
        })
    }

    saveProduct() {
        let sub = new SubProduct();
        sub.name = 'New Product'
        sub.shProductId = this.product.id;
        sub.versionId = this.version.id;
        this.platformRepository.saveSubProduct(sub).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.getProductPropList();
            this.toastRepository.showSuccess("Create Successfully.");
        });
    }
}
