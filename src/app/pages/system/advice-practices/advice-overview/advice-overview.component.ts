import {Component, OnInit} from '@angular/core';
import {AdviceRepository} from "../../../../repository/advice-repository";
import {ActivatedRoute, Router} from "@angular/router";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {ToastRepository} from "../../../../repository/toast-repository";
import {FileRepository} from "../../../../repository/file-repository";
import {PracticeService} from "../../../../service/practice.service";

@Component({
    selector: 'app-advice-overview',
    templateUrl: './advice-overview.component.html',
    styleUrls: ['./advice-overview.component.less']
})
export class AdviceOverviewComponent implements OnInit {
    uploading = false;

    constructor(private adviceRepository: AdviceRepository,
                public practiceService: PracticeService,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
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
                        this.practiceService.practice.attachmentVo = res.data[0];
                    }
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }
}
