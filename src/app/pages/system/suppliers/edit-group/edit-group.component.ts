import {Component, OnInit, ViewChild} from '@angular/core';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from "../../../../service/config.service";
import {GroupInfo} from "../../../../model/po/groupInfo";
import {CKEditorComponent} from "@ckeditor/ckeditor5-angular";
import {SupplierRepository} from "../../../../repository/supplier-repository";
import {LocalStorageObServable} from "../../../../observable/local-storage-observable";
import {ToastRepository} from "../../../../repository/toast-repository";
import {FileRepository} from "../../../../repository/file-repository";
import {TabType} from "../../../../model/enums/tab-type";
import {Constants} from "../../../../model/constants";


@Component({
    selector: 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls: ['./edit-group.component.less']
})
export class EditGroupComponent implements OnInit {
    id: string;
    group: GroupInfo = new GroupInfo();
    reminder: any;
    type: string;
    Editor = ClassicEditor;
    config: {
        placeholder: 'Description',
    };
    @ViewChild('editor')
    editorComponent: CKEditorComponent;

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
        for (const droppedFile of files) {
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    if (!file.type.includes('image')) {
                        this.toastRepository.showDanger('Unsupported file types');
                        return;
                    }
                    let fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = () =>  {
                        this.group.visitUrl = fileReader.result?.toString();
                    }
                    this.fileRepository.uploadFile('img', file);
                });
            } else {
                this.toastRepository.showDanger('Unsupported file types');
            }
        }
    }

    initEditConfig() {
    }

    saveGroup() {
        this.supplierRepository.saveGroup(this.group).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg)
                return;
            }
            this.toastRepository.showSuccess(`${this.id ? 'Update' : 'Save'} Successfully.`);
        });
    }
}
