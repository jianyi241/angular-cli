import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReviewService} from "../../service/review.service";

@Component({
    selector: 'app-review-header',
    templateUrl: './review-header.component.html',
    styleUrls: ['./review-header.component.less']
})
export class ReviewHeaderComponent implements OnInit {

    public isScrollFixed: boolean;

    constructor(private router: Router, private reviewService: ReviewService) {
    }

    ngOnInit(): void {

    }


    next() {
        this.reviewService.next();
    }

    goBack() {
        this.router.navigateByUrl('/review/feature-selection');
    }
}
