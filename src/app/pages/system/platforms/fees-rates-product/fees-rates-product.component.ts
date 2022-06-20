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
import {GroupVo} from "../../../../model/vo/groupVo";
import {PromiseType} from "protractor/built/plugins";

@Component({
    selector: 'app-fees-rates-product',
    templateUrl: './fees-rates-product.component.html',
    styleUrls: ['./fees-rates-product.component.less']
})
export class FeesRatesProductComponent implements OnInit, OnDestroy {
    product: ProductInfo = new ProductInfo();
    version: Version = new Version();
    feature: ProductFormVo = new ProductFormVo();
    subGroup: GroupVo = new GroupVo();
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
        this.activatedRoute.queryParams.subscribe(res => {
            this.product.name = res.name
        })
    }

    // getProductPropList(): void {
    //     this.platformRepository.getProductPropList(TabType.feesAndRates.value, this.product.id, this.version.id).subscribe(res => {
    //         this.feeRate = Object.assign(this.feeRate, res.data);
    //         if (this.feeRate && this.feeRate.subProductVos && this.feeRate.subProductVos.length > 0) {
    //             this.chooseGroup(this.feeRate.subProductVos[0]);
    //         }
    //     });
    // }

    getProductPropList(): void {
        this.platformRepository.getProductPropList(TabType.features.value, this.product.id, this.version.id).subscribe(res => {
            this.feature = Object.assign(this.feature, res.data);
            if (this.feature && this.feature.groupVoList && this.feature.groupVoList.length > 0) {
                if (this.feature.groupVoList[0].subList && this.feature.groupVoList[0].subList.length > 0)
                    this.chooseSubGroup(this.feature.groupVoList[0].subList[0]);
            }
        });
    }
    chooseSubGroup(group: GroupVo) {
        this.subGroup = group;
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
        // this.platformRepository.saveSubProduct(sub).subscribe(res => {
        //     if (res.statusCode != 200) {
        //         this.toastRepository.showDanger(res.msg);
        //         return;
        //     }
        //     this.getProductPropList();
        //     this.toastRepository.showSuccess("Create Successfully.");
        // });
        this.toastRepository.showSuccess("Create Successfully.");
    }

    importProduct() {
        this.uploadFile().then(res => {
            console.log('upload file res ', res)
            this.platformRepository.importFeeData({productId: this.product.id,versionId: this.version.id,file: res.data}).subscribe(res => {
                if (res.statusCode !== 200) {
                    this.toastRepository.showDanger(res.msg || 'Import failed.')
                }
                this.toastRepository.showSuccess('Import successfully.')
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
}
