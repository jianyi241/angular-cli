import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-existed-modal',
    templateUrl: './existed-modal.component.html',
    styleUrls: ['./existed-modal.component.less']
})
export class ExistedModalComponent implements OnInit {

    constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {
    }


    ngOnInit(): void {
    }

    close(): void {
        this.activeModal.close();
    }
}
