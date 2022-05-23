import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../service/config.service";
import {AddClientModalComponent} from "../modal/add-client-modal/add-client-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DueRepository} from '../../../../repository/due-repository';
import {DueService} from "../../../../service/due.service";
import {Constants} from "../../../../model/constants";


@Component({
    selector: 'app-review-list',
    templateUrl: './review-list.component.html',
    styleUrls: ['./review-list.component.less']
})
export class ReviewListComponent implements OnInit {
    currentSwitch: string = 'review'
    currentReviewSwitch: string = 'listView'
    reviewKeyword: string = "";
    clientKeyword: string = "";
    showArchived = true;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private dueRepository: DueRepository,
                public configService: ConfigService,
                private dueService: DueService,
                private ngbModal: NgbModal) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(res => {
            if (res.type != 'client') {
                this.currentSwitch = 'review';
                this.currentReviewSwitch = res.type;
            } else {
                this.currentSwitch = res.type;
            }
        })
    }

    ngOnDestroy(): void {
    }


    switchTable(val: string, type: string = 'client'): void {
        if (type === 'review') {
            this.router.navigateByUrl(`/advice-review/review-list/${val}`);
        } else {
            this.router.navigateByUrl(`/advice-review/review-list/${type}`);
        }
    }

    addFunc(): void {
        if (this.currentSwitch === 'review') {
            this.router.navigateByUrl(`/due/due-setup/${Constants.NON_ID}`)
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


    searchReview() {
        this.dueService.reviewSearch(this.reviewKeyword);
    }

    searchClient() {
        this.dueService.clientSearch(this.clientKeyword);
    }

    toggleArchived() {
        this.showArchived = !this.showArchived;
        this.dueService.archivedToggle(this.showArchived);
    }
}
