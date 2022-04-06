import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {ProductInfo} from "../../../../model/po/productInfo";
import {TabType} from "../../../../model/enums/tab-type";
import {PropertyVo} from "../../../../model/vo/PropertyVo";
import {Constants} from "../../../../model/constants";
import {ToastRepository} from "../../../../repository/toast-repository";
import {ConfigService} from "../../../../service/config.service";
import {Version} from "../../../../model/po/version";
import {ProductFormVo} from "../../../../model/vo/productFormVo";
import {VersionRepository} from "../../../../repository/version-repository";
import {GroupVo} from "../../../../model/vo/groupVo";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {FileRepository} from "../../../../repository/file-repository";

@Component({
    selector: 'app-feature-form',
    templateUrl: './feature-form.component.html',
    styleUrls: ['./feature-form.component.less']
})
export class FeatureFormComponent implements OnInit, OnDestroy {
    product: ProductInfo = new ProductInfo();
    version: Version = new Version();
    feature: ProductFormVo = new ProductFormVo();
    subGroup: GroupVo = new GroupVo();
    config = {...Constants.EDITOR_CONFIG};
    routerSubscription: any;
    activatedRouteSubscription: any;

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
                private versionRepository: VersionRepository,
                private fileRepository: FileRepository,
                private platformRepository: PlatformRepository) {
        this.config.editorplaceholder = 'What security measures are in place, e.g. ISO 27001 certification';
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
        this.platformRepository.getProductPropList(TabType.features.value, this.product.id, this.version.id).subscribe(res => {
            this.feature = res.data;
            if (this.feature && this.feature.groupVoList && this.feature.groupVoList.length > 0) {
                if (this.feature.groupVoList[0].subList && this.feature.groupVoList[0].subList.length > 0)
                    this.chooseSubGroup(this.feature.groupVoList[0].subList[0]);
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

    parseRouterParam(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(res => {
            this.product.id = res['productId'];
            this.version.id = res[Constants.VERSION];
        })
    }

    dropped(files: NgxFileDropEntry[], prop: PropertyVo) {
        if (files[0].fileEntry.isFile) {
            const fileEntry = files[0].fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
                if (!file.type.includes('image')) {
                    this.toastRepository.showDanger('Unsupported file types');
                    return;
                }
                prop.uploading = true;
                this.fileRepository.uploadFile('img', file).then(res => {
                    prop.uploading = false;
                    if (res.statusCode == 200) {
                        prop.productPropVo.attachmentVo = res.data[0];
                        this.saveProp(prop);
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }

    saveProp(prop: PropertyVo): void {
        let productProp = {...prop.productPropVo};
        productProp.shProductId = this.product.id;
        productProp.shPropertyId = prop.id;
        this.platformRepository.saveProductProp(productProp).subscribe(res => {
            prop.productPropVo = res.data;
        })
    }

    chooseSubGroup(group: GroupVo) {
        this.subGroup = group;
    }
}
