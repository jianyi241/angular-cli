import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../model/constants";
import {ReviewRepository} from "../../repository/review-repository";
import {ComparisonVo} from "../../model/vo/comparisonVo";
import {CurrentUserService} from "../../service/current-user.service";
import {ComparisonAnalyseInfo} from "../../model/po/comparisonAnalyseInfo";
import {AnalysisType} from "../../model/enums/analysis-type";
import {DueService} from "../../service/due.service";
import {Commons} from "../../utils/Commons";
import {ComparisonStatus} from "../../model/enums/comparison-status";
import {ToastRepository} from "../../repository/toast-repository";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-due-header',
    templateUrl: './due-header.component.html',
    styleUrls: ['./due-header.component.less']
})
export class DueHeaderComponent implements OnInit {
    public isScrollFixed: boolean;

    constructor(public router: Router,
                private activatedRoute: ActivatedRoute,
                private toastRepository: ToastRepository,
                public dueService: DueService,
                private modalService: NgbModal,
                private currentUserService: CurrentUserService,
                private reviewRepository: ReviewRepository,) {
        this.dueService.due = new ComparisonVo();
        this.dueService.due.companyId = this.currentUserService.currentUser().companyId;
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.dueService.due.clientId = params['clientId'];
        })
        let comparisonId = this.activatedRoute?.firstChild?.snapshot?.params['id'];
        if (comparisonId && comparisonId != Constants.NON_ID) {
            this.reviewRepository.getCompareDetail(comparisonId).subscribe(res => {
                Object.assign(this.dueService.due, res.data);
                this.dueService.initNotify();
            });
        }
    }

    save(callback?: () => void) {
        this.dueService.save(callback);
    }

    next() {
        this.dueService.next();
    }

    goBack() {
        this.dueService.back();
    }

    getDynamicAnaName(analysis: ComparisonAnalyseInfo): string {
        let analysisType = AnalysisType.parseEnum(analysis.name);
        return analysisType?.name || '';
    }

    getDynamicAnaLinks(analysis: ComparisonAnalyseInfo): Array<string> {
        let analysisType = AnalysisType.parseEnum(analysis.name);
        return analysisType?.links || [];
    }

    totalDynamicAna(): number {
        return this.dueService.due.analyseVoList.length + 2;
    }

    saveTemplate() {
        this.dueService.templateSave();
    }

    complete() {
        let copy = Commons.deepCopy(this.dueService.due);
        copy.status = ComparisonStatus.Completed.value;
        this.reviewRepository.saveDue(copy).subscribe(res => {
            if (res.statusCode != 200) {
                this.toastRepository.showDanger(res.msg);
                return;
            }
            this.toastRepository.showSuccess("Save successfully.")
        })
    }

    leaveDue() {
        this.dueService.leave();
    }
}
