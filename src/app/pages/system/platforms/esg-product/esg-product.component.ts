import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../../model/constants";
import {ProductInfo} from "../../../../model/po/productInfo";
import {Version} from "../../../../model/po/version";
import {ProductFormVo} from "../../../../model/vo/productFormVo";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {ToastRepository} from "../../../../repository/toast-repository";
import {VersionRepository} from "../../../../repository/version-repository";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {PropertyVo} from "../../../../model/vo/PropertyVo";

@Component({
    selector: 'app-esg-product',
    templateUrl: './esg-product.component.html',
    styleUrls: ['./esg-product.component.less']
})
export class EsgProductComponent implements OnInit {
    product: ProductInfo = new ProductInfo();
    version: Version = new Version();
    esg: ProductFormVo = new ProductFormVo();
    config = {...Constants.EDITOR_CONFIG};
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

    getVersion() {
        if (this.version.id == Constants.VERSION) {
            return;
        }
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
        });
    }

    getProductPropList(): void {
        this.platformRepository.getProductPropList(TabType.esg.value, this.product.id, this.version.id).subscribe(res => {
            this.esg = Object.assign(this.esg, res.data);
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
