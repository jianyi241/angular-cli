import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-deselect-features-tip',
    templateUrl: './due-tip.component.html',
    styleUrls: ['./due-tip.component.less']
})
export class DueTipComponent implements OnInit {

    title: string;
    info: string;
    btnText: string;
    btnCancelText: string = 'No, will do it later';

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

    dismiss(): void {
        this.activeModal.dismiss();
    }

    close() {
        this.activeModal.close();
    }

}
