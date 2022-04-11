import {Component, OnDestroy, OnInit} from '@angular/core';
import {Constants} from "../../../../model/constants";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {ToastRepository} from "../../../../repository/toast-repository";
import {VersionRepository} from "../../../../repository/version-repository";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {ProductInfo} from "../../../../model/po/productInfo";
import {Version} from "../../../../model/po/version";
import {ProductFormVo} from "../../../../model/vo/productFormVo";
import {TabType} from "../../../../model/enums/tab-type";
import {PropertyVo} from "../../../../model/vo/PropertyVo";

@Component({
    selector: 'app-information-product',
    templateUrl: './information-product.component.html',
    styleUrls: ['./information-product.component.less']
})
export class InformationProductComponent implements OnInit, OnDestroy {
    product: ProductInfo = new ProductInfo();
    version: Version = new Version();
    information: ProductFormVo = new ProductFormVo();
    routerSubscription: any;
    activatedRouteSubscription: any;

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
                private versionRepository: VersionRepository,
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

    subscribe(): void {
        this.routerSubscription = this.route.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.init();
            }
        });
    }

    getProductPropList(): void {
        this.platformRepository.getProductPropList(TabType.information.value, this.product.id, this.version.id).subscribe(res => {
            this.information = res.data;
        });
    }

    getVersion() {
        if (this.version.id == Constants.VERSION) {
            return;
        }
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
        });
    }

    parseRouterParam(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(res => {
            this.product.id = res['productId'];
            this.version.id = res[Constants.VERSION];
        })
    }

    saveProp(prop: PropertyVo): void {
        let productProp = {...prop.productPropVo};
        productProp.shProductId = this.product.id;
        productProp.shPropertyId = prop.id;
        this.platformRepository.saveProductProp(productProp).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            prop.productPropVo = res.data;
        })
    }
}
