import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-deselect-features-tip',
    templateUrl: './review-tip.component.html',
    styleUrls: ['./review-tip.component.less']
})
export class ReviewTipComponent implements OnInit {

    title: string;
    info: string;
    btnText: string;
    btnCancelText: string = 'No, will do it later';

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

    dismiss(flag: boolean): void {
        this.activeModal.dismiss(flag);
    }

    close() {
        this.activeModal.close();
    }

}
