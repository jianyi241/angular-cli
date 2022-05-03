import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../../../model/constants";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {ToastRepository} from "../../../../../repository/toast-repository";
import {FileRepository} from "../../../../../repository/file-repository";
import {SupplierService} from "../../../../../service/supplier.service";

@Component({
    selector: 'app-supplier-overview',
    templateUrl: './supplier-overview.component.html',
    styleUrls: ['./supplier-overview.component.less']
})
export class SupplierOverviewComponent implements OnInit {
    config = {...Constants.EDITOR_CONFIG};
    uploading = false;

    constructor(public supplierService: SupplierService,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository) {

    }

    ngOnInit(): void {

    }

    droppedFile(files: NgxFileDropEntry[]) {
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
                        console.log('upload img result ===> ', res)
                        this.supplierService.supplier.attachmentVo = res.data[0];
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }

}
