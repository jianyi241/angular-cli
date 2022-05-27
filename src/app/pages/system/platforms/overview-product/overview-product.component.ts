import {Component, OnDestroy, OnInit} from '@angular/core';
import {Constants} from "../../../../model/constants";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {VersionRepository} from "../../../../repository/version-repository";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {ProductInfo} from "../../../../model/po/productInfo";
import {Version} from "../../../../model/po/version";
import {TabType} from "../../../../model/enums/tab-type";
import {ProductFormVo} from "../../../../model/vo/productFormVo";
import {ToastRepository} from "../../../../repository/toast-repository";
import {PropertyVo} from "../../../../model/vo/PropertyVo";
@Component({
    selector: 'app-overview-product',
    templateUrl: './overview-product.component.html',
    styleUrls: ['./overview-product.component.less']
})
export class OverviewProductComponent implements OnInit, OnDestroy {
    product: ProductInfo = new ProductInfo();
    version: Version = new Version();
    overview: ProductFormVo = new ProductFormVo();
    config = {...Constants.EDITOR_CONFIG};
    routerSubscription: any;
    activatedRouteSubscription: any;
    platFormLogoSize = {
        width: 300,
        height: 300
    }
    platFormBannerSize = {
        width: 1100,
        height: 400
    }

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

    getVersion() {
        if (this.version.id == Constants.VERSION) {
            return;
        }
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
            this.configService.currentVersion = res.data || this.version
        });
    }

    getProductPropList(): void {
        this.platformRepository.getProductPropList(TabType.overview.value, this.product.id, this.version.id).subscribe(res => {
            this.overview = Object.assign(this.overview, res.data);
        });
    }

    parseRouterParam(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(res => {
            this.product.id = res['productId'];
            this.version.id = res[Constants.VERSION];
        })
    }

    saveProp(prop: PropertyVo) {
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
