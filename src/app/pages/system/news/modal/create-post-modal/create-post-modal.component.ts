import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../../../model/constants";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {ToastRepository} from "../../../../../repository/toast-repository";
import {FileRepository} from "../../../../../repository/file-repository";

Constants.EDITOR_CONFIG.editorplaceholder = 'What do you want to post?'
@Component({
    selector: 'app-create-post-modal',
    templateUrl: './create-post-modal.component.html',
    styleUrls: ['./create-post-modal.component.less']
})
export class CreatePostModalComponent implements OnInit {

    config = {...Constants.EDITOR_CONFIG};
    uploading: boolean = false
    platformOptions = [{
        propName: 'BT Panorama',
        propValue: 'BT Panorama',
        visitUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202009%2F23%2F20200923185609_rQUdj.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658715908&t=2092f0f49a23b6ef929d97c86295c82b'
    }, {
        propName: 'Netwealth',
        propValue: 'Netwealth',
        visitUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202105%2F29%2F20210529001057_aSeLB.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658912029&t=bda754ed6c35cbb7162d6190c1195425'
    }, {
        propName: 'Suitability Hub',
        propValue: 'Suitability Hub',
        visitUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F05%2F20210705140730_666eb.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658912045&t=5e864acf418d64a3c50d1105f8af5aed '
    }]
    platform = {
        propName: 'BT Panorama',
        propValue: 'BT Panorama',
        visitUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202009%2F23%2F20200923185609_rQUdj.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658715908&t=2092f0f49a23b6ef929d97c86295c82b'
    }
    longText: string = ''
    imageList = [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202009%2F23%2F20200923185609_rQUdj.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658715908&t=2092f0f49a23b6ef929d97c86295c82b',
        'https://img0.baidu.com/it/u=4208173036,4288504561&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=422',
        'https://img1.baidu.com/it/u=1688680882,2943600730&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=362',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F3a%2F99%2F66%2F3a996646c1ad85975106393955102a40.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658728358&t=bc863be1da187139236e236845b99cf3',
        'https://img1.baidu.com/it/u=963199490,1397250471&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=370',
        'https://img1.baidu.com/it/u=963199490,1397250471&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=370'
    ];
    imageItemStyle: object = {
        borderRadius: 0
    };

    constructor(private ngbActiveModal: NgbActiveModal,
                private toastRepository: ToastRepository,
                private fileRepository: FileRepository) {
    }

    ngOnInit(): void {
    }

    close(): void {
        this.ngbActiveModal.close()
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

                    }
                    console.log('res => ', res)
                });
            });
        } else {
            this.toastRepository.showDanger('Unsupported file types');
        }
    }

    removeImageByIndex($event: number) {
        console.log('event ', $event)
    }
}
