import {Component, OnInit} from '@angular/core';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from "../../../../../service/config.service";
import {GroupInfo} from "../../../../../model/po/groupInfo";
import {SupplierRepository} from "../../../../../repository/supplier-repository";
import {LocalStorageObServable} from "../../../../../observable/local-storage-observable";
import {ToastRepository} from "../../../../../repository/toast-repository";
import {FileRepository} from "../../../../../repository/file-repository";
import {TabType} from "../../../../../model/enums/tab-type";
import {Constants} from "../../../../../model/constants";
import {Reminder} from "../../../../../model/vo/reminder";
import {Version} from "../../../../../model/po/version";
import {VersionRepository} from "../../../../../repository/version-repository";


@Component({
    selector: 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls: ['./edit-group.component.less']
})
export class EditGroupComponent implements OnInit {
    version: Version = new Version();
    group: GroupInfo = new GroupInfo();
    currentTab: number;
    uploading = false;
    config = {...Constants.EDITOR_CONFIG};

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                private storage: LocalStorageObServable,
                public configService: ConfigService,
                private versionRepository: VersionRepository,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository,
                private supplierRepository: SupplierRepository) {
        this.group.tabType = TabType.features.value;
    }

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        this.parseRouteParam();
        this.versionDetail();
        this.initByCurrentTab();
        this.detail();
    }

    initByCurrentTab(): void {
        this.group.tabType = this.currentTab;
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

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            this.version.id = params['version'];
            this.currentTab = params['tab'];
            this.group.id = params['id'] == Constants.NON_ID ? '' : params['id'];
        })
    }

    versionDetail(): void {
        this.versionRepository.versionById(this.version.id).subscribe(res => {
            this.version = res.data;
        })
    }

    detail(): void {
        if (!this.group.id) {
            return;
        }
        this.supplierRepository.groupDetail(this.group.id, this.version.id).subscribe(res => {
            this.group = Object.assign(this.group, res.data);
        })
    }

    goBack(): void {
        let tabType = TabType.parseEnum(this.currentTab);
        let tab = tabType.name.toLowerCase().replace(' ', '-');
        this.route.navigateByUrl(`/supplier/supplier-tab/${tab}/${this.version.id}`);
    }

    droppedFile(files: NgxFileDropEntry[]): void {
        if (files[0].fileEntry.isFile) {
            const fileEntry = files[0].fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
                if (!file.type.includes('image')) {
                    this.toastRepository.showDanger('Unsupported file types');
                    return;
                }
                this.uploading = true;
                this.fileRepository.uploadFile('img', file).then(res => {
                    this.uploading = false;
                    if (res.statusCode == 200) {
                        this.group.attachmentVo = res.data[0];
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }

    saveGroup() {
        if (!this.group.name) {
            this.toastRepository.showDanger('Name is required.')
            return;
        }
        this.supplierRepository.saveGroup(this.group).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg)
                return;
            }
            this.storage.getItem<Reminder>('reminder').subscribe(data => {
                data.groupId = res.data.id;
                this.storage.setItem<Reminder>('reminder', data);
            });
            this.toastRepository.showSuccess(`${this.group.id ? 'Update' : 'Save'} Successfully.`);
            this.group.id = res.data.id;
        });
    }
}
