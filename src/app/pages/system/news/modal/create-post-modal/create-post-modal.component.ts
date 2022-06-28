import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../../../model/constants";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

Constants.EDITOR_CONFIG.editorplaceholder = 'What do you want to post?'
@Component({
    selector: 'app-create-post-modal',
    templateUrl: './create-post-modal.component.html',
    styleUrls: ['./create-post-modal.component.less']
})
export class CreatePostModalComponent implements OnInit {

    config = {...Constants.EDITOR_CONFIG};
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

    constructor(private ngbActiveModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

    close(): void {
        this.ngbActiveModal.close()
    }
}
