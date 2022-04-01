import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../../../service/config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VersionRepository} from "../../../../repository/version-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {ToastRepository} from "../../../../repository/toast-repository";
import {Version} from "../../../../model/po/version";

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
        let versionId = this.activeRouter.firstChild?.snapshot?.params['version'];
        if (versionId && versionId != 'version') {
            this.versionRepository.versionById(versionId).subscribe(res => {
                this.version = res.data || this.version;
                if (this.router.url == '/supplier/supplier-tab') {
                    this.chooseTab(TabType.overview.name);
                }
            });
        } else {
            this.versionRepository.supplierVersion().subscribe(res => {
                this.version = res.data || this.version;
                this.version.id = res.data?.id || 'version';
                this.chooseTab(TabType.overview.name);
            })
        }

    }


    chooseTab(tab: string): void {
        if (tab == TabType.feesAndRates.name) {
            return
        }
        this.currentTab = tab.toLowerCase().replace(' ', '-');
        this.router.navigateByUrl(`/supplier/supplier-tab/${this.currentTab}/${this.version.id}`);
    }

    editConfig(): void {
        this.supplierRepository.editConfig().subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.version = res.data || this.version;
            let urlSegment = this.activeRouter.firstChild.snapshot.url[0];
            this.router.navigateByUrl(`/supplier/supplier-tab/${urlSegment.path}/${this.version.id}`)
        })
    }
















    pushConfig(): void {

    }
}
