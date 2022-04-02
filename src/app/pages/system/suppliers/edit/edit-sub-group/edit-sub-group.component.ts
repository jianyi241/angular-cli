import {Component, OnInit} from '@angular/core';
import {GroupInfo} from "../../../../../model/po/groupInfo";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../../service/config.service";
import {LocalStorageObServable} from "../../../../../observable/local-storage-observable";
import {ToastRepository} from "../../../../../repository/toast-repository";
import {FileRepository} from "../../../../../repository/file-repository";
import {SupplierRepository} from "../../../../../repository/supplier-repository";
import {TabType} from "../../../../../model/enums/tab-type";
import {Constants} from "../../../../../model/constants";
import {Reminder} from "../../../../../model/vo/reminder";
import {Version} from "../../../../../model/po/version";
import {VersionRepository} from "../../../../../repository/version-repository";
import {GroupStatus} from "../../../../../model/enums/group-status";

@Component({
    selector: 'app-edit-sub-group',
    templateUrl: './edit-sub-group.component.html',
    styleUrls: ['./edit-sub-group.component.less']
})
export class EditSubGroupComponent implements OnInit {
    version: Version = new Version();
    subGroup: GroupInfo = new GroupInfo();
    config = {...Constants.EDITOR_CONFIG};
    currentTab: number;

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                private storage: LocalStorageObServable,
                public configService: ConfigService,
                private toastRepository: ToastRepository,
                private versionRepository: VersionRepository,
                private fileRepository: FileRepository,
                private supplierRepository: SupplierRepository) {
    }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.parseRouteParam();
        this.versionDetail();
        this.initByCurrentTab();
        this.detail();
        this.parent();
    }

    goBack(): void {
        let tabType = TabType.parseEnum(this.currentTab);
        let tab = tabType.name.toLowerCase().replace(' ', '-');
        this.route.navigateByUrl(`/supplier/supplier-tab/${tab}/${this.version.id}`);
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            this.version.id = params['version'];
            this.currentTab = parseInt(params['tab']);
            this.subGroup.parentId = params['parentId'] == Constants.NON_ID ? '' : params['parentId'];
            this.subGroup.id = params['id'] == Constants.NON_ID ? '' : params['id'];
        })
    }

    versionDetail(): void {
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data;
        })
    }

    initByCurrentTab(): void {
        this.subGroup.tabType = this.currentTab;
        switch (this.currentTab) {
            case TabType.overview.value:
                break;
            case TabType.information.value:
                break;
            case TabType.esg.value:
                break;
            case TabType.features.value:
                break;
            case TabType.feesAndRates.value:
                break;
            case TabType.changeHistory.value:
                break;
        }
    }

    detail(): void {
        if (!this.subGroup.id) {
            return;
        }
        this.supplierRepository.subGroupDetail(this.subGroup.id, this.version.id).subscribe(res => {
            this.subGroup = Object.assign(this.subGroup, res.data);
        });
    }

    parent(): void {
        this.supplierRepository.groupDetail(this.subGroup.parentId, this.version.id).subscribe(res => {
            this.subGroup.parentName = res.data.name;
        })
    }

    archive(): void {
        this.subGroup.status = GroupStatus.Archive.value;
        this.saveSubGroup();
    }

    saveSubGroup() {
        if (!this.subGroup.name) {
            this.toastRepository.showDanger('Name is required.')
            return;
        }
        this.supplierRepository.saveGroup(this.subGroup).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess(`${this.subGroup.id ? 'Update' : 'Save'} Successfully.`);
            this.subGroup.id = res.data.id;
            this.subGroup.moveFlag = res.data.moveFlag;
            this.storage.getItem<Reminder>('reminder' + this.currentTab).subscribe(data => {
                data.subGroupId = res.data.id;
                this.storage.setItem<Reminder>('reminder' + this.currentTab, data);
            });
        });
    }
}
