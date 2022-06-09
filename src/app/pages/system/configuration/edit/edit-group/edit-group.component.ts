import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from "../../../../../service/config.service";
import {GroupInfo} from "../../../../../model/po/groupInfo";
import {ConfigurationRepository} from "../../../../../repository/configuration-repository";
import {LocalStorageObServable} from "../../../../../observable/local-storage-observable";
import {ToastRepository} from "../../../../../repository/toast-repository";
import {FileRepository} from "../../../../../repository/file-repository";
import {TabType} from "../../../../../model/enums/tab-type";
import {Constants} from "../../../../../model/constants";
import {Version} from "../../../../../model/po/version";
import {VersionRepository} from "../../../../../repository/version-repository";
import {GroupStatus} from "../../../../../model/enums/group-status";
import {SaveService} from "../../../../../service/save.service";
import {take} from "rxjs/operators";


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
    editType = 'update'
    config = {...Constants.EDITOR_CONFIG};

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                private storage: LocalStorageObServable,
                public configService: ConfigService,
                public saveService: SaveService,
                private versionRepository: VersionRepository,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository,
                private configurationRepository: ConfigurationRepository) {
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

    readOnly() {
        if (this.editType === 'add') {
            return false
        } else if (this.editType === 'update') {
            return !this.configService.isEditable(this.version.type, this.group.status, 'configuration')
        } else if (this.editType === 'view') {
            return true
        }
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            this.version.id = params[Constants.VERSION];
            this.currentTab = parseInt(params['tab']);
            this.group.id = params['id'] == Constants.NON_ID ? '' : params['id'];
            this.editType = params['type']
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
        this.configurationRepository.groupDetail(this.group.id, this.version.id).subscribe(res => {
            this.group = Object.assign(this.group, res.data);
        })
    }

    goBack(): void {
        let tabType = TabType.parseEnum(this.currentTab);
        let tab =this.configService.converterTabToRouter(tabType.name);
        this.route.navigateByUrl(`/configuration/configuration-tab/${tab}/${this.version.id}`);
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

    updateStatus(status: string): void {
        const _group = JSON.parse(JSON.stringify(this.group))
        _group.status = status;
        this.saveGroup(_group);
    }

    saveGroup(_group: GroupInfo) {
        if (!_group.name) {
            this.toastRepository.showDanger('Name is required.')
            return;
        }
        if (this.saveService.saveCheck(`${environment.baseURL}/supplier/saveOrUpdateGroup`)) {
            return;
        }
        this.configurationRepository.saveGroup(_group).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg)
                return;
            }
            this.toastRepository.showSuccess(`${_group.id ? 'Update' : 'Save'} Successfully.`);
            this.group.id = res.data.id;
            this.group.moveFlag = res.data.moveFlag;
            this.group.status = res.data.status
            this.storage.getItem('reminder' + this.currentTab).pipe(take(5)).subscribe(data => {
                data.groupId = this.group.id;
                this.storage.setItem('reminder' + this.currentTab, data);
            })
        });
    }
}
