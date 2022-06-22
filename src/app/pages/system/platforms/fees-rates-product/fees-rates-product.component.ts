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
import {PlatformFee} from "../../../../model/po/platformFee";

@Component({
    selector: 'app-fees-rates-product',
    templateUrl: './fees-rates-product.component.html',
    styleUrls: ['./fees-rates-product.component.less']
})
export class FeesRatesProductComponent implements OnInit, OnDestroy {
    product: ProductInfo = new ProductInfo();
    version: Version = new Version();
    fees: Array<PlatformFee> = new Array<PlatformFee>();
    currentIndex: number = 0
    activatedRouteSubscription: any;
    routerSubscription: any;


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
        this.activatedRoute.queryParams.subscribe(res => {
            this.product.name = res.name
        })
    }

    getProductPropList(): void {
        this.platformRepository.getFeeProducts({productId: this.product.id,versionId: this.version.id}).subscribe(res => {
            if (res.statusCode !== 200) {
                this.toastRepository.showDanger(res.msg || 'Get products info failed.')
            }
            this.fees = res.data
        })
    }

    getVersion(): void {
        if (this.version.id === Constants.VERSION) return;
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

    importProduct() {
        this.uploadFile().then(res => {
            console.log('upload file res ', res)
            this.platformRepository.importFeeData({productId: this.product.id,versionId: this.version.id,file: res.data}).subscribe(res => {
                if (res.statusCode !== 200) {
                    this.toastRepository.showDanger(res.msg || 'Import failed.')
                }
                this.toastRepository.showSuccess('Import successfully.')
                this.getProductPropList()
            })
        }).catch(err => {
            console.log('upload file err ', err)
        })
    }

    uploadFile(): Promise<{success: boolean, data: any}> {
        return new Promise((resolve, reject) => {
            const fileInput = document.createElement('input')
            document.body.appendChild(fileInput)
            fileInput.type = 'file'
            fileInput.accept = '.xls,.xlsx'
            fileInput.click()
            fileInput.addEventListener('change', () => {
                try {
                    resolve({
                        success: true,
                        data: fileInput.files[0]
                    })
                } catch (err) {
                    reject({
                        success: false,
                        data: 'failed'
                    })
                } finally {
                    document.body.removeChild(fileInput)
                }
            })
        })
    }

    chooseMenu(i: number) {
        this.currentIndex = i
        this.getProductPropList()
    }
}
