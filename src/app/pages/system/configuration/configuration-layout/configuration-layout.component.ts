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
                private toastRepository: ToastRepository,
                private router: Router) {
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
                if (this.router.url == '/configuration/configuration-tab') {
                    this.chooseTab(TabType.overview.name);
                }
                if (this.version.type === VersionType.Draft.value) {
                    this.getEditFlag()
                }
            });
        } else {
            this.versionRepository.supplierVersion().subscribe(res => {
                this.version = res.data || this.version;
                this.version.id = res.data?.id || Constants.VERSION;
                this.version.type = this.version.type || VersionType.Publish.value;
                this.chooseTab(TabType.overview.name);
                if (this.version.type === VersionType.Draft.value) {
                    this.getEditFlag()
                }
            })
        }
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


    pushConfig(): void {
        if (this.saveService.saveCheck(environment.baseURL + '/supplier/publish')) {
            return
        }
        this.configurationRepository.pushConfig().subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.version = res.data || this.version;
            let urlSegment = this.activeRouter.firstChild.snapshot.url[0];
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
            this.version.id = res.data?.id || Constants.VERSION;
            this.chooseTab(TabType.changeHistory.name);
        })
    }
}
