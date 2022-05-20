import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {AddClientModalComponent} from "../modal/add-client-modal/add-client-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DueRepository} from "../../../../repository/due-repository";


@Component({
    selector: 'app-review-list',
    templateUrl: './review-list.component.html',
    styleUrls: ['./review-list.component.less']
})
export class ReviewListComponent implements OnInit {
    currentSwitch: string = 'review'
    currentReviewSwitch: string = 'listView'

    constructor(private router: Router,
                private dueRepository: DueRepository,
                public configService: ConfigService,
                private ngbModal: NgbModal) {
    }

    ngOnInit(): void {
        this.init();
    }

    ngOnDestroy(): void {
    }

    init(): void {
    }

    switchTable(val: string, type: string = 'client'): void {
        if (type === 'review') {
            this.currentReviewSwitch = val
            return
        }
        this.currentSwitch = val
    }

    addFunc(): void {
        if (this.currentSwitch === 'review') {
            this.toDetail()
        } else {
            this.router.navigateByUrl('/advice-review/add-client/Overview')
        }
    }

    toDetail(): void {
        // this.router.navigateByUrl(`/admin/detail/${type}/${id || Constants.NON_ID}`)
        this.showAddClientModal()
    }

    showAddClientModal(): void {
        const modal = this.ngbModal.open(AddClientModalComponent, {
            size: 'w644',
            windowClass: 'tip-popup-modal',
            centered: true
        })
        // modal.componentInstance.
    }


}
