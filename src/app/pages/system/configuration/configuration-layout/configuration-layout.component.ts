import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../../../service/config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VersionRepository} from "../../../../repository/version-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {ConfigurationRepository} from "../../../../repository/configuration-repository";
import {ToastRepository} from "../../../../repository/toast-repository";
import {Version} from "../../../../model/po/version";
import * as moment from "moment";
import {Constants} from "../../../../model/constants";
import {SaveService} from "../../../../service/save.service";
import {environment} from "../../../../../environments/environment";
import {VersionType} from "../../../../model/enums/version-type";
import {VersionStatus} from "../../../../model/enums/version-status";
import {PlatformRepository} from "../../../../repository/platform-repository";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmModalComponent} from "../../modal/confirm-modal/confirm-modal.component";
import {NgxLoadingSpinnerService} from "@k-adam/ngx-loading-spinner";

@Component({
    selector: 'app-configuration-layout',
    templateUrl: './configuration-layout.component.html',
    styleUrls: ['./configuration-layout.component.less']
})
export class ConfigurationLayoutComponent implements OnInit {
    version: Version = new Version();
    currentTab: string;
    pushFlag: boolean;
    titleFlag: boolean;
    hasApproveCount: number;
    totalCount: number;

    constructor(public configService: ConfigService,
                private activeRouter: ActivatedRoute,
                private saveService: SaveService,
                private versionRepository: VersionRepository,
                private configurationRepository: ConfigurationRepository,
                private platformRepository: PlatformRepository,
                private toastRepository: ToastRepository,
                private router: Router,
                private ngbModal: NgbModal,
                private spinnerService: NgxLoadingSpinnerService) {
    }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.getVersion();
    }

    getVersion(): void {
        let versionId = this.activeRouter.firstChild?.snapshot?.params[Constants.VERSION];
        let url = this.activeRouter.firstChild?.snapshot?.url;
        this.currentTab = url && url.length > 0 ? url[0].path : undefined;
        if (versionId && versionId != Constants.VERSION) {
            this.versionRepository.versionById(versionId).subscribe(res => {
                this.version = res.data || this.version;
                this.configService.currentVersion = res.data
                if (this.router.url == '/configuration/configuration-tab') {
                    this.chooseTab(TabType.overview.name);
                }
            });
        } else {
            this.getVersionNoParams()
        }
    }

    getVersionNoParams(): void {
        this.versionRepository.supplierVersion().subscribe(res => {
            this.version = res.data || this.version;
            this.configService.currentVersion = res.data
            this.version.id = res.data?.id || Constants.VERSION;
            this.version.type = this.version.type || VersionType.Publish.value;
            this.chooseTab(TabType.overview.name);
        })
    }

    showButtons(type: number): boolean {
        if (type === 1) {
            return this.version.type ===  VersionType.Publish.value
        } else if (type === 2) {
            return this.version.type ===  VersionType.Draft.value && VersionStatus.Normal.value === this.version.versionStatus
        } else if (type === 3) {
            return this.version.type === VersionType.Draft.value && VersionStatus.WaitPublish.value === this.version.versionStatus
        }
        return false
    }

    chooseTab(tab: string): void {
        if (tab == TabType.feesAndRates.name) {
            return;
        }
        this.currentTab = this.configService.converterTabToRouter(tab);
        this.router.navigateByUrl(`/configuration/configuration-tab/${this.currentTab}/${this.version.id}`);
    }

    showTip(type: string) {
        if (type === 'history') {
            return this.version.type === 'History'
        }  else if (type === 'frozenParent') {
            return this.version.type !== 'History'
        }else if (type === 'frozen') {
            return this.version.type === 'Draft' && this.titleFlag
        }
        return false
    }

    hiddenEditBtn(type: string) {
        if (type === 'tipPublishBtn') {
            return !this.pushFlag
        } else if (type === 'publishBtn') {
            return (!this.pushFlag && this.titleFlag) || this.version.type === 'Publish'
        } else if (type === 'editBtn') {
            return this.version.type !== 'Publish' && this.configService.isEditable(this.version.type)
        }
        return true
    }

    editConfig(): void {
        if (this.saveService.saveCheck(environment.baseURL + `/supplier/editModel`)) {
            return
        }
        this.configurationRepository.editConfig().subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.version = res.data || this.version;
            this.configService.currentVersion = res.data
            let urlSegment = this.activeRouter.firstChild.snapshot.url[0];
            this.router.navigateByUrl(`/configuration/configuration-tab/${urlSegment.path}/${this.version.id}`)
            if (this.version.type === VersionType.Draft.value) {
                this.getEditFlag()
            }
        });
    }

    getEditFlag(): void {
        this.configurationRepository.getAllProductPushFlag().subscribe(res => {
            const {hasApproveCount, pushFlag, total,titleFlag} = res.data
            this.hasApproveCount = hasApproveCount
            this.pushFlag = pushFlag
            this.totalCount = total
            this.titleFlag = titleFlag
        },err => {
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
                this.getVersionNoParams()
            } else {
                this.toastRepository.showDanger(res.msg || 'Failed operation')
            }
        }, err => {
        })
    }

    pushSupplier(): void {
        let version = JSON.parse(JSON.stringify(this.version))
        version.versionStatus = VersionStatus.WaitPublish.value
        this.versionRepository.updateVersionStatus(version).subscribe(res => {
            if (res.statusCode !== 200) {
                this.toastRepository.showDanger(res.msg || 'Failed operation')
            } else {
                this.version = res.data
                this.configService.currentVersion = res.data
                console.log('new version ', this.version)
                this.toastRepository.showSuccess('Save successfully.')
            }
        }, err => {
        })
    }

    pushConfig(): void {
        if (this.saveService.saveCheck(environment.baseURL + '/supplier/publish')) {
            return
        }
        this.spinnerService.show()
        this.configurationRepository.pushConfig().subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                this.spinnerService.hide()
                return;
            }
            this.version = res.data || this.version;
            this.configService.currentVersion = res.data
            let urlSegment = this.activeRouter.firstChild.snapshot.url[0];
            this.spinnerService.hide()
            this.router.navigateByUrl(`/`, {
                skipLocationChange: true
            }).then(r => {
                this.router.navigate([`/configuration/configuration-tab/${urlSegment.path}/${this.version.id}`])
            })
        })
    }

    getVersionName() {
        return `Release ${moment(this.version.updateTime).format('D MMM YY')}`
    }

    getVersionInfo() {
        return `Released ${moment(this.version.updateTime).format('H:mm a D MMM YY')} by Recep Peker`
    }

    backHistory() {
        this.versionRepository.supplierVersion().subscribe(res => {
            this.version = res.data || this.version;
            this.configService.currentVersion = res.data
            this.version.id = res.data?.id || Constants.VERSION;
            this.chooseTab(TabType.changeHistory.name);
        })
    }
}
