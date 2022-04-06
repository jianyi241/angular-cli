import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-review-header',
    templateUrl: './review-header.component.html',
    styleUrls: ['./review-header.component.less']
})
export class ReviewHeaderComponent implements OnInit {

    public isScrollFixed: boolean;

    constructor(private router: Router) {
    }

    ngOnInit(): void {

    }


    next() {
        this.router.navigateByUrl('/review/feature-comparison');
    }
}
