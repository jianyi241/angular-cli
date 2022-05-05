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
import {SaveService} from "../../../../service/save.service";
import {environment} from "../../../../../environments/environment";
import {VersionType} from "../../../../model/enums/version-type";
import {FocusService} from "../../../../service/focus.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RejectModalComponent} from "../modal/reject-modal/reject-modal.component";
import {CurrentUserService} from "../../../../service/current-user.service";
import {NgxLoadingSpinnerService} from '@k-adam/ngx-loading-spinner';

@Component({
    selector: 'app-product-layout',
    templateUrl: './product-layout.component.html',
    styleUrls: ['./product-layout.component.less']
})
export class ProductLayoutComponent implements OnInit {
    version: Version = new Version();
    changeVersion: Version;
    changeTabs: Array<{ tabType: number }> = new Array<{ tabType: number }>();
    product: ProductInfo = new ProductInfo();
    currentTab: string;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                public configService: ConfigService,
                public saveService: SaveService,
                private focusService: FocusService,
                private platformRepository: PlatformRepository,
                private toastRepository: ToastRepository,
                private versionRepository: VersionRepository,
                private ngbModal: NgbModal,
                public currentUserService: CurrentUserService,
                private loadingService: NgxLoadingSpinnerService
    ) {
    }

    ngOnInit(): void {
        let versionId = this.activatedRoute.firstChild.snapshot.params[Constants.VERSION];
        this.product.id = this.activatedRoute.firstChild.snapshot.params['productId'];
        this.version.id = versionId;
        this.getProduct();
        if (versionId != Constants.VERSION) {
            this.getVersion();
        } else {
            this.version.type = VersionType.Publish.value;
        }
        this.getModelPublishChangeFlag();
        this.getChangeTabs();
        let url = this.activatedRoute.firstChild?.snapshot?.url;
        this.currentTab = url && url.length > 0 ? url[0].path : undefined;
    }

    getVersion(): void {
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
            this.configService.currentVersion = res.data || this.version
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

    showEditButton(type: string) {
        if (this.currentUserService.isAdminUser()) {
            if (type === 'reject' || type === 'approve') {
                return this.version.type === 'Draft' && this.version.versionStatus === this.configService.versionStatus.wait
            } else if (type === 'edit') {
                return this.version.type === 'Publish' && this.version.versionStatus === this.configService.versionStatus.normal
            }
        } else if (this.currentUserService.isSupplierUser()) {
            if (type === 'edit') {
                return this.version.type === 'Publish' && !this.configService.isEditable(this.version.type)
            } else if (type === 'submit') {
                return this.version.type === 'Draft' && (this.version.versionStatus === this.configService.versionStatus.normal || this.version.versionStatus === this.configService.versionStatus.rejected)
            }
        }
    }

    ifShowTip(type: string) {
        if (this.currentUserService.isAdminUser()) {
            return false
        } else if (this.currentUserService.isSupplierUser()) {
            if (type === 'frozen') {
                return this.version.versionStatus === this.configService.versionStatus.frozen && this.version.type !== 'History'
            } else if (type === 'rejected') {
                return this.version.versionStatus === this.configService.versionStatus.rejected && this.version.type !== 'History'
            } else {
                return false
            }
        }
    }

    getModelPublishChangeFlag(): void {
        this.platformRepository.getModelPublishChangeFlag(this.product.id).subscribe(res => {
            this.changeVersion = res.data;
        });
    }

    updateVersionStatus(status: string): void {
        const _version = JSON.parse(JSON.stringify(this.version))
        _version.versionStatus = status
        if (status === this.configService.versionStatus.frozen) {
            this.loadingService.show()
        }
        this.versionRepository.updateVersionStatus(_version).subscribe(res => {
            if (res.statusCode !== 200) {
                this.toastRepository.showDanger(res.msg || 'Failed operation')
                this.loadingService.hide()
                return
            }
            this.version = res.data
            if (this.version.versionStatus === this.configService.versionStatus.rejected) {
                this.toastRepository.showDanger('Changes have been rejected.')
                this.loadingService.hide()
            } else {
                this.toastRepository.showSuccess(res.msg || 'Successful operation')
                this.loadingService.hide()
            }
        }, err => {
        })
    }

    editProduct(): void {
        if (this.saveService.saveCheck(environment.baseURL + `/product/editProduct/${this.product.id}`)) {
            return;
        }
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
        if (this.saveService.saveCheck(environment.baseURL + `/product/publish/${this.product.id}`)) {
            return;
        }
        //设置定时器, 解决失焦问题
        //当页面控件保留焦点时点击按钮, 会先触发按钮点击事件然后触发失焦保存事件
        if (this.focusService.hasFocus()) {
            this.focusService.waitBlur(() => {
                this.publish()
            });
        } else {
            this.publish();
        }
    }

    private publish(): void {
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
        this.currentTab = this.configService.converterTabToRouter(tab);
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

    rejectUpdate(): void {
        const modalRef = this.ngbModal.open(RejectModalComponent, {
            size: 'w644',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.result.then(res => {
            console.log('confirm')
            this.updateVersionStatus('Rejected')
        }, err => {
            console.log('cancel')
        })
    }
}
