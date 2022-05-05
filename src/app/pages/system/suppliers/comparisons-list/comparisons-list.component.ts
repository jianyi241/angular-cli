import {Component, OnInit} from '@angular/core';
import {ReviewRepository} from "../../../../repository/review-repository";
import {CurrentUserService} from "../../../../service/current-user.service";
import {ComparisonCondition} from "../../../../model/condition/comparisonCondition";
import {Page} from "../../../../model/vo/page";
import {ComparisonInfo} from "../../../../model/po/comparisonInfo";
import {Router} from "@angular/router";
import {Constants} from "../../../../model/constants";

@Component({
    selector: 'app-comparisons-list',
    templateUrl: './comparisons-list.component.html',
    styleUrls: ['./comparisons-list.component.less']
})
export class ComparisonsListComponent implements OnInit {
    condition: ComparisonCondition = new ComparisonCondition(1, 10);
    comparisonPage: Page<ComparisonInfo> = new Page<ComparisonInfo>();
    page = 4;

    constructor(private reviewRepository: ReviewRepository,
                private router: Router,
                private currentUserService: CurrentUserService) {
        this.condition.companyId = this.currentUserService.currentUser().companyId;
    }

    ngOnInit(): void {
        this.comparisonList();
    }


    comparisonList(): void {
        this.reviewRepository.getComparisonList(this.condition).subscribe(res => {
            Object.assign(this.comparisonPage, res.data);
        })
    }

    pageChange(current: number) {
        this.condition.current = current;
        this.comparisonList();
    }

    save(comparison?: ComparisonInfo) {
        this.router.navigateByUrl(`/review/comparison-setup/${comparison?.id || Constants.NON_ID}`)
    }
}
