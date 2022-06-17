import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../../../../service/config.service';
import {PlatformRepository} from '../../../../repository/platform-repository';
import {Constants} from '../../../../model/constants';
import {VersionRepository} from '../../../../repository/version-repository';
import {Version} from '../../../../model/po/version';
import {TabType} from '../../../../model/enums/tab-type';
import {ProductInfo} from '../../../../model/po/productInfo';
import {ToastRepository} from '../../../../repository/toast-repository';
import * as moment from 'moment';
import {SaveService} from '../../../../service/save.service';
import {environment} from '../../../../../environments/environment';
import {VersionType} from '../../../../model/enums/version-type';
import {FocusService} from '../../../../service/focus.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RejectModalComponent} from '../modal/reject-modal/reject-modal.component';
import {CurrentUserService} from '../../../../service/current-user.service';
import {NgxLoadingSpinnerService} from '@k-adam/ngx-loading-spinner';
import {VersionStatus} from "../../../../model/enums/version-status";
import {ConfirmModalComponent} from "../../modal/confirm-modal/confirm-modal.component";

declare type TipInfo = {
    show: boolean,
    tipCls: string,
    textCls: string,
    title: string,
    text: string
}

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
    from = ''; // fromPage
    supplierSubmitType = '';
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
        this.activatedRoute.queryParams.subscribe(res => {
            this.from = res.from;
        });
        const versionId = this.activatedRoute.firstChild.snapshot.params[Constants.VERSION];
        this.product.id = this.activatedRoute.firstChild.snapshot.params.productId;
        this.version.id = versionId;
        this.getProduct();
        if (versionId != Constants.VERSION) {
            this.getVersion();
        } else {
            this.version.type = VersionType.Publish.value;
        }
        this.getModelPublishChangeFlag();
        this.getChangeTabs();
        const url = this.activatedRoute.firstChild?.snapshot?.url;
        this.currentTab = url && url.length > 0 ? url[0].path : undefined;
    }

    getVersion(): void {
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data || this.version;
            this.configService.currentVersion = res.data || this.version;
            if (this.version.type === VersionType.Draft.value) {
                this.getProjectButtonFlag()
            }
        });
    }

    getProduct(): void {
        this.platformRepository.productDetail(this.product.id).subscribe(res => {
            this.product = res.data || this.product;
        });
    }

    getChangeTabs(): void {
        this.platformRepository.getChangeTabs().subscribe(res => {
            this.changeTabs = res.data;
        });
    }

    showEditButton(type: string) {
        if (type === 'edit') {
            return this.version.type === VersionType.Publish.value
        } else if (type === 'submit' || type === 'discard' || type === 'saving') {
            return this.version.type === VersionType.Draft.value && (this.version.versionStatus === VersionStatus.Normal.value || this.version.versionStatus === VersionStatus.Rejected.value)
        }
        if (this.currentUserService.isAdminUser()) {
            if (type === 'reject' || type === 'approve') {
                return this.version.type === 'Draft' && this.version.versionStatus === VersionStatus.Wait.value
            } else if (type === 'publish') {
                return this.version.type === 'Draft' && this.version.versionStatus === VersionStatus.WaitPublish.value && this.version.publishPlatformFlag
            } else if (type === 'edit') {
                return this.version.type === 'Publish'
            }
        }
    }

    showTip(type: string) {
        if (this.version.type === 'History') {
            return false
        }
        if (this.currentUserService.isSupplierUser()) {
            if (type === 'frozen') {
                return this.version.versionStatus === this.configService.versionStatus.frozen
            } else if (type === 'rejected') {
                return this.version.versionStatus === this.configService.versionStatus.rejected
            }
        }
        if (type === 'oneOrMore') {
            return this.version.type && this.version.versionStatus !== this.configService.versionStatus.rejected && this.version.versionStatus !== this.configService.versionStatus.frozen && this.changeVersion
        }
        return false
    }

    tipInfo(): TipInfo {
        let info: TipInfo = {
            tipCls: '',
            textCls: '',
            title: '',
            text: '',
            show: false
        }
        if (this.version.type === 'History') {
            info = {
                tipCls: '',
                textCls: '',
                title: `Release ${moment(this.version.updateTime).format('D MMM YY')}`,
                text: `Submitted ${moment(this.version.updateTime).format('h:mma D MMM YY')} by Recep Peker`,
                show: true
            }
        }
        if (this.currentUserService.isAdminUser()) {
            if (this.version.versionStatus === VersionStatus.Wait.value) {
                info = {
                    tipCls: '',
                    textCls: '',
                    title: `New data submitted.`,
                    text: `Profile updated at ${moment(this.version.updateTime).format('h:mma D MMM YY')}. Approve or reject changes by clicking the buttons.`,
                    show: true
                }
            }
        }
        // if (this.currentUserService.isSupplierUser()) {
        //     if (this.version.versionStatus === this.configService.versionStatus.frozen) {
        //         info = {
        //             tipCls: 'warn-tip',
        //             textCls: 'tx-yellow',
        //             title: `The profile is frozen.`,
        //             text: `Profile updated at  ${moment(this.version.updateTime).format('h:mma D MMM YY')} . New data pending approval. Contact SuitabilityHub admin for more details.`,
        //             show: true
        //         }
        //     } else if (this.version.versionStatus === this.configService.versionStatus.rejected) {
        //         info = {
        //             tipCls: 'err-tip',
        //             textCls: 'tx-red',
        //             title: `Data was rejected.`,
        //             text: `Profile rejected at  ${moment(this.version.updateTime).format('h:mma D MMM YY')} . `,
        //             show: true
        //         }
        //     }
        // }
        if (this.version.type && this.version.versionStatus !== this.configService.versionStatus.rejected && this.version.versionStatus !== this.configService.versionStatus.frozen && this.changeVersion) {
            info = {
                tipCls: '',
                textCls: '',
                title: `One or more feature fields are added by Suitability Hub admin.`,
                text: `Template updated at ${moment(this.version.updateTime).format('h:mma D MMM YY')} by
                    SuitabilityHub admin. Click “Edit product” to fill in missing data if there’s any.`,
                show: true
            }
        }
        return info
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
            this.configService.currentVersion = res.data
            if (this.version.versionStatus === this.configService.versionStatus.rejected) {
                this.toastRepository.showDanger('Changes have been rejected.')
                this.loadingService.hide()
            } else {
                this.toastRepository.showSuccess('Save successfully.')
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
            // this.getProjectButtonFlag()
            this.router.navigateByUrl(`/platform/product-tab/${urlSegment.path}/${this.product.id}/${this.version.id}`)
        });
    }

    getProjectButtonFlag() {
        console.log('getProductButtonFlag ===> ')
        this.platformRepository.getProductButtonFlag({productId: this.product.id}).subscribe(res => {
            console.log('getProductButtonFlag res ===> ', res)
            this.supplierSubmitType = res.msg
        }, err => {
        })
    }

    supplierSubmitConfirm() {
        const modalRef = this.ngbModal.open(ConfirmModalComponent, {
            size: 'w644',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.modal = {
            title: 'Are you sure to submit?',
            text: 'Submitting the changes will freeze the platform profile. You will not be able to make changes while the platform is in review with us. ',
            cancelText: 'No, do nothing',
            confirmText: 'Yes, submit and freeze'
        }
        modalRef.result.then(res => {
            console.log('confirm')
            this.updateVersionStatus(VersionStatus.Wait.value)
        }, err => {
            console.log('cancel')
        })
    }

    publishProduct(): void {
        if (this.saveService.saveCheck(environment.baseURL + `/product/publish/${this.product.id}`)) {
            return;
        }
        //设置定时器, 解决失焦问题
        //当页面控件保留焦点时点击按钮, 会先触发按钮点击事件然后触发失焦保存事件
        this.focusService.waitBlur(() => {
            this.publish();
        });
    }

    private publish(): void {
        this.loadingService.show()
        this.platformRepository.publishProduct(this.product.id).subscribe(res => {
            this.loadingService.hide()
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.version = res.data || this.version;
            let urlSegment = this.activatedRoute.firstChild.snapshot.url[0];
            if (this.currentUserService.isSupplierUser()) {
                console.log('add submit res ===> ', res)
            } else {
                this.router.navigateByUrl(`/`, {
                    skipLocationChange: true
                }).then(r => {
                    this.router.navigate([`/platform/product-tab/${urlSegment.path}/${this.product.id}/${this.version.id}`])
                })
            }
        })
    }

    chooseTab(tab: string): void {
        // if (tab === TabType.feesAndRates.name) return
        this.currentTab = this.configService.converterTabToRouter(tab);
        //设置定时器, 解决失焦问题
        //当页面控件保留焦点时点击按钮, 会先触发按钮点击事件然后触发失焦保存事件
        this.focusService.waitBlur(() => {
            this.router.navigateByUrl(`/platform/product-tab/${this.currentTab}/${this.product.id}/${this.version.id}`);
        });
    }

    isChange(tabType: number): boolean {
        return this.changeTabs.some(c => c.tabType == tabType);
    }

    backPage() {
        const versionType = this.version.type
        if (versionType !== 'History' && this.from !== 'history') {
            if (this.currentUserService.isAdminUser()) {
                this.router.navigateByUrl('/platform/product')
            } else {
                this.router.navigateByUrl('/platform/product-box')
            }
        } else {
            this.backHistory()
        }
    }

    backHistory() {
        this.versionRepository.versionById(this.product.versionId).subscribe(res => {
            this.version = res.data || this.version;
            this.version.id = res.data?.id || Constants.VERSION;
            this.chooseTab(TabType.changeHistory.name);
        })
    }

    rejectConfirm(): void {
        const modalRef = this.ngbModal.open(RejectModalComponent, {
            size: 'w644',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.result.then(res => {
            console.log('confirm')
            this.updateVersionStatus(VersionStatus.Rejected.value)
        }, err => {
            console.log('cancel')
        })
    }

    discardConfirm(): void {
        const modalRef = this.ngbModal.open(ConfirmModalComponent, {
            size: 'w644',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.modal.title = 'Are you sure to discard draft?'
        modalRef.componentInstance.modal.text = 'Discarding draft will delete all the changes you made. Are you sure?'
        modalRef.componentInstance.modal.cancelText = 'No, do nothing'
        modalRef.componentInstance.modal.confirmText = 'Yes, discard all changes'
        modalRef.result.then(res => {
            console.log('confirm')
            this.editDiscardDraft()
        }, err => {
            console.log('cancel')
        })
    }

    editDiscardDraft(): void {
        this.versionRepository.discard(this.version.id).subscribe(res => {
            if (res.statusCode === 200) {
                // this.getVersionNoParams()
                if (this.currentUserService.isSupplierUser()) {
                    this.router.navigateByUrl(`/platform/product-box-detail/overview/${res.data.id}/${res.data.versionId}}/${TabType.overview.value}`)
                } else {
                    if (this.from === 'view') {
                        this.router.navigateByUrl(`/platform/product-box-detail/overview/${res.data.id}/${res.data.versionId}}/${TabType.overview.value}`)
                    } else {
                        this.router.navigateByUrl('/platform/product')
                    }
                }
            } else {
                this.toastRepository.showDanger(res.msg || 'Failed operation')
            }
        }, err => {
        })
    }

    getVersionNoParams(): void {
        this.versionRepository.supplierVersion().subscribe(res => {
            this.version = res.data || this.version;
            this.version.id = res.data?.id || Constants.VERSION;
            this.version.type = this.version.type || VersionType.Publish.value;
            this.chooseTab(TabType.overview.name);
        })
    }
}
