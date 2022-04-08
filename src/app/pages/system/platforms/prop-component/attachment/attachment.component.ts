import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {PropertyVo} from "../../../../../model/vo/PropertyVo";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {ToastRepository} from "../../../../../repository/toast-repository";
import {FileRepository} from "../../../../../repository/file-repository";

@Component({
    selector: 'attachment',
    templateUrl: './attachment.component.html',
    styleUrls: ['./attachment.component.less']
})
export class AttachmentComponent implements OnInit {
    @Input()
    prop: PropertyVo;
    @Input()
    index: number;
    @Input()
    disable: boolean;
    @Input()
    editable: boolean;
    @Input()
    tabType: number;
    @Input()
    prop_class: string;
    @Input()
    change: EventEmitter<PropertyVo>;
    uploading = false;

    constructor(private toastRepository: ToastRepository, private fileRepository: FileRepository) {
    }

    ngOnInit(): void {
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
                        this.prop.productPropVo.attachmentVo = res.data[0];
                        this.change.emit(this.prop);
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }

}