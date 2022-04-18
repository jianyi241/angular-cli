import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../../../service/config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VersionRepository} from "../../../../repository/version-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {ToastRepository} from "../../../../repository/toast-repository";
import {Version} from "../../../../model/po/version";
import * as moment from "moment";
import {Constants} from "../../../../model/constants";
import {SaveService} from "../../../../service/save.service";
import {environment} from "../../../../../environments/environment";
import {VersionType} from "../../../../model/enums/version-type";

@Component({
    selector: 'app-supplier-layout',
    templateUrl: './supplier-layout.component.html',
    styleUrls: ['./supplier-layout.component.less']
})
export class SupplierLayoutComponent implements OnInit {
    version: Version = new Version();
    currentTab: string;

    constructor(public configService: ConfigService,
                private activeRouter: ActivatedRoute,
                private saveService: SaveService,
                private versionRepository: VersionRepository,
                private supplierRepository: SupplierRepository,
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
                if (this.router.url == '/supplier/supplier-tab') {
                    this.chooseTab(TabType.overview.name);
                }
            });
        } else {
            this.versionRepository.supplierVersion().subscribe(res => {
                this.version = res.data || this.version;
                this.version.id = res.data?.id || Constants.VERSION;
                this.version.type = this.version.type || VersionType.Publish.value;
                this.chooseTab(TabType.overview.name);
            })
        }

    }


    chooseTab(tab: string): void {
        if (tab == TabType.feesAndRates.name) {
            return;
        }
        this.currentTab = this.configService.converterTabToRouter(tab);
        this.router.navigateByUrl(`/supplier/supplier-tab/${this.currentTab}/${this.version.id}`);
    }

    editConfig(): void {
        if (this.saveService.saveCheck(environment.baseURL + `/supplier/editModel`)) {
            return
        }
        this.supplierRepository.editConfig().subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.version = res.data || this.version;
            let urlSegment = this.activeRouter.firstChild.snapshot.url[0];
            this.router.navigateByUrl(`/supplier/supplier-tab/${urlSegment.path}/${this.version.id}`)
        });
    }

    pushConfig(): void {
        if (this.saveService.saveCheck(environment.baseURL + '/supplier/publish')) {
            return
        }
        this.supplierRepository.pushConfig().subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.version = res.data || this.version;
            let urlSegment = this.activeRouter.firstChild.snapshot.url[0];
            this.router.navigateByUrl(`/`, {
                skipLocationChange: true
            }).then(r => {
                this.router.navigate([`/supplier/supplier-tab/${urlSegment.path}/${this.version.id}`])
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
