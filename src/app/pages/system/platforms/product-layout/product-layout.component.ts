import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {Constants} from "../../../../model/constants";
import {VersionRepository} from "../../../../repository/version-repository";
import {Version} from "../../../../model/po/version";
import {TabType} from "../../../../model/enums/tab-type";
import {ProductInfo} from "../../../../model/po/productInfo";
import {ToastRepository} from "../../../../repository/toast-repository";
import * as moment from "moment";

@Component({
    selector: 'app-product-layout',
    templateUrl: './product-layout.component.html',
    styleUrls: ['./product-layout.component.less']
})
export class ProductLayoutComponent implements OnInit {
    version: Version = new Version();
    changeVersion: Version;
    changeTabs: Array<{tabType: number}> = new Array<{tabType: number}>();
    product: ProductInfo = new ProductInfo();
    currentTab: string;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                public configService: ConfigService,
                private platformRepository: PlatformRepository,
                private toastRepository: ToastRepository,
                private versionRepository: VersionRepository) {
    }

    ngOnInit(): void {
        let versionId = this.activatedRoute.firstChild.snapshot.params[Constants.VERSION];
        this.product.id = this.activatedRoute.firstChild.snapshot.params['productId'];
        this.version.id = versionId;
        this.getProduct();
        if (versionId != Constants.VERSION) {
            this.getVersion();
        }
        this.getModelPublishChangeFlag();
        this.getChangeTabs();
        let url = this.activatedRoute.firstChild?.snapshot?.url;
        this.currentTab = url && url.length > 0 ? url[0].path : undefined;
    }

    getVersion(): void {
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
        })
    }

    getProduct(): void {
        this.platformRepository.productDetail(this.product.id).subscribe(res => {
            this.product = res.data || this.product;
        })
    }

    getChangeTabs(): void {
        this.platformRepository.getChangeTabs().subscribe(res => {
            this.changeTabs = res.data;
        });
    }

    getModelPublishChangeFlag(): void {
        this.platformRepository.getModelPublishChangeFlag(this.product.id).subscribe(res => {
            this.changeVersion = res.data;
        });
    }

    editProduct(): void {
        this.platformRepository.editProduct(this.product.id).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.version = res.data || this.version;
            let urlSegment = this.activatedRoute.firstChild.snapshot.url[0];
            this.router.navigateByUrl(`/platform/product-tab/${urlSegment.path}/${this.product.id}/${this.version.id}`)
        });
    }

    publishProduct(): void {
        this.platformRepository.publishProduct(this.product.id).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.version = res.data || this.version;
            let urlSegment = this.activatedRoute.firstChild.snapshot.url[0];
            this.router.navigateByUrl(`/`, {
                skipLocationChange: true
            }).then(r => {
                this.router.navigate([`/platform/product-tab/${urlSegment.path}/${this.product.id}/${this.version.id}`])
            })
        })
    }

    chooseTab(tab: string): void {
        if (tab == TabType.feesAndRates.name) {
            return
        }
        this.currentTab = tab.toLowerCase().replace(' ', '-');
        this.router.navigateByUrl(`/platform/product-tab/${this.currentTab}/${this.product.id}/${this.version.id}`);
    }


    isChange(tabType: number): boolean {
        return this.changeTabs.some(c => c.tabType == tabType);
    }

    getVersionName() {
        return `Release ${moment(this.version.updateTime).format('D MMM YY')}`
    }

    getVersionInfo() {
        return `Submitted ${moment(this.version.updateTime).format('h:mma D MMM YY')} by Recep Peker`
    }

    backHistory() {
        this.versionRepository.versionById(this.product.versionId).subscribe(res => {
            this.version = res.data || this.version;
            this.version.id = res.data?.id || Constants.VERSION;
            this.chooseTab(TabType.changeHistory.name);
        })
    }
}
