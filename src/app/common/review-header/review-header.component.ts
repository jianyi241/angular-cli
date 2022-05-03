import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReviewService} from "../../service/review.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveTemplateTipComponent} from "../../pages/reviews/save-template-tip/save-template-tip.component";

@Component({
    selector: 'app-review-header',
    templateUrl: './review-header.component.html',
    styleUrls: ['./review-header.component.less']
})
export class ReviewHeaderComponent implements OnInit {

    public isScrollFixed: boolean;

    constructor(private router: Router, private reviewService: ReviewService,private modalService: NgbModal) {
    }

    ngOnInit(): void {

    }


    next() {
        this.reviewService.next();
    }

    goBack() {
        this.reviewService.back();
    }

    saveTemplate(): void {
        const modalRef = this.modalService.open(SaveTemplateTipComponent, {
            backdrop: 'static',
            size: 'small',
            windowClass: 'tip-popup-modal',
            centered: true
        });
        modalRef.componentInstance.title = 'Deselect all features?';
        modalRef.componentInstance.info = 'You’ve selected 3 features in this group, are you sure to deselect all of them?';
        modalRef.componentInstance.btnText = 'Yes, deselect all';
        modalRef.componentInstance.btnCancelText = 'No, don’t do anything';

        modalRef.result.then((result) => {

        }, (reason) => {
        });
    }
}
