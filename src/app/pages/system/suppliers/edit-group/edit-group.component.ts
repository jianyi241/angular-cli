import {Component, OnInit} from '@angular/core';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from "../../../../service/config.service";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {LocalStorageObServable} from "../../../../observable/local-storage-observable";
import {ToastRepository} from "../../../../repository/toast-repository";
import {FileRepository} from "../../../../repository/file-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {Constants} from "../../../../model/constants";
import {Reminder} from "../../../../model/vo/reminder";


@Component({
    selector: 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls: ['./edit-group.component.less']
})
export class EditGroupComponent implements OnInit {
    id: string;
    group: GroupInfo = new GroupInfo();
    uploading = false;
    config = {...Constants.EDITOR_CONFIG};

    constructor(private route: Router,
                private activatedRoute: ActivatedRoute,
                private storage: LocalStorageObServable,
                public configService: ConfigService,
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
        this.initEditConfig();
    }

    parseRouteParam(): void {
        this.activatedRoute.params.subscribe(params => {
            if (params['id'] != Constants.NON_ID) {
                this.id = params['id'];
                this.detail();
            }
        })
    }

    detail(): void {
        this.supplierRepository.groupDetail(this.id).subscribe(res => {
            this.group = Object.assign(this.group, res.data);
        })
    }

    goBack(): void {
        this.route.navigateByUrl('/supplier/comparison/4');
    }

    onReady(editor): void {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

    dropped(files: NgxFileDropEntry[]): void {
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

    initEditConfig() {
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
            this.toastRepository.showSuccess(`${this.id ? 'Update' : 'Save'} Successfully.`);
            this.id = res.data.id;
            this.group.id = this.id;
        });
    }

    /*editorDataChange($event: CKEditor4.EventInfo) {
        console.log($event);
    }*/
}
