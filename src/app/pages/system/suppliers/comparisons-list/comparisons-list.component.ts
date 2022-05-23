import {Component, OnInit} from '@angular/core';
import {ReviewRepository} from "../../../../repository/review-repository";
import {CurrentUserService} from "../../../../service/current-user.service";
import {ComparisonCondition} from "../../../../model/condition/comparisonCondition";
import {Page} from "../../../../model/vo/page";
import {ComparisonInfo} from "../../../../model/po/comparisonInfo";
import {Router} from "@angular/router";
import {Constants} from "../../../../model/constants";
import {ConfigService} from "../../../../service/config.service";
import {ComparisonVo} from "../../../../model/vo/comparisonVo";
import {ToastRepository} from "../../../../repository/toast-repository";

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
                private toastRepository: ToastRepository,
                private router: Router,
                public configService: ConfigService,
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

    archive(comparison: ComparisonInfo) {
        comparison.archived = true;
        this.saveSample(comparison);
    }

    unarchive(comparison: ComparisonInfo) {
        comparison.archived = false;
        this.saveSample(comparison);
    }


    private saveSample(comparison: ComparisonInfo) {
        let vo = new ComparisonVo();
        Object.assign(vo, comparison);
        this.reviewRepository.saveComparison(vo).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
        });
    }
}
