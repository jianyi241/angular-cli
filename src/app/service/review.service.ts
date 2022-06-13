import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ComparisonVo} from "../model/vo/comparisonVo";
import {AnalysisType} from "../model/enums/analysis-type";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ReviewTipComponent} from "../pages/reviews/review-tip/review-tip.component";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private nextSubject = new Subject<object>();
    nextObservable = this.nextSubject.asObservable();
    private saveSubject = new Subject<() => void>();
    saveObservable = this.saveSubject.asObservable();
    private backSubject = new Subject<object>();
    backObservable = this.backSubject.asObservable();
    private initComparisonSubject = new Subject<object>();
    initComparisonObservable = this.initComparisonSubject.asObservable();
    private leaveReviewSubject = new Subject<object>();
    leaveReviewObservable = this.leaveReviewSubject.asObservable();
    comparison: ComparisonVo;
    cacheSaveData: Array<any> = [];

    constructor(private router: Router, private modalService: NgbModal) {
    }

    next(): void {
        this.nextSubject.next();
    }

    save(callback?: () => void): void {
        this.saveSubject.next(callback);
    }

    back(): void {
        this.backSubject.next();
    }

    initNotify(): void {
        this.initComparisonSubject.next();
    }

    leave(): void {
        console.log('back list')
        this.leaveReviewSubject.next();
    }

    dealLeave(data: any[]): void {
        let cache = this.cacheSaveData.join(',');
        let curr = data.join(',');
        if (cache !== curr) {
            const modalRef = this.modalService.open(ReviewTipComponent, {
                backdrop: 'static',
                size: 'small',
                windowClass: 'tip-popup-modal',
                centered: true
            });
            modalRef.componentInstance.title = 'Are you sure to exit?';
            modalRef.componentInstance.info = `You’re about to exit the comparison, would you like to save your changes?`;
            modalRef.componentInstance.btnText = 'Save and exit';
            modalRef.componentInstance.btnCancelText = 'Clear and exit';
            modalRef.result.then(() => {
                this.save(() => {
                    this.router.navigateByUrl('/supplier/comparisons-list');
                });
            }).catch((flag) => {
                flag && this.router.navigateByUrl('/supplier/comparisons-list');
            })
        } else {
            this.router.navigateByUrl('/supplier/comparisons-list');
        }
    }

    preStep(anaType: AnalysisType): void {
        let index = this.comparison.analyseVoList.findIndex(a => a.name == anaType.value);
        let analyseInfo = this.comparison.analyseVoList[index - 1];
        switch (analyseInfo?.name) {
            case AnalysisType.feature.value:
                this.router.navigateByUrl(`/review/feature-comparison/${this.comparison.id}`);
                break;
            case AnalysisType.metric.value:
                this.router.navigateByUrl(`/review/metric-comparison/${this.comparison.id}`);
                break;
            case AnalysisType.fee.value:
                this.router.navigateByUrl(`/review/fee-comparison/${this.comparison.id}`);
                break;
            default:
                this.router.navigateByUrl(`/review/comparison-setup/${this.comparison.id}`);
        }
    }

    nextStep(anaType?: AnalysisType): void {
        let index = anaType ? this.comparison.analyseVoList.findIndex(a => a.name == anaType.value) : -1;
        let analyseInfo = this.comparison.analyseVoList[index + 1];
        switch (analyseInfo?.name) {
            case AnalysisType.feature.value:
                this.router.navigateByUrl(`/review/feature-selection/${this.comparison.id}`);
                break;
            case AnalysisType.metric.value:
                this.router.navigateByUrl(`/review/metric-selection/${this.comparison.id}`);
                break;
            case AnalysisType.fee.value:
                this.router.navigateByUrl(`/review/fee-comparison/${this.comparison.id}`);
                break;
            default:
                this.router.navigateByUrl(`/review/summary/${this.comparison.id}`);
                break;
        }
    }

    getCurrentAnaStep(value: string): number {
        if (this.comparison.analyseVoList && this.comparison.analyseVoList.length > 0) {
            return this.comparison.analyseVoList.findIndex(a => a.name == value) + 2;
        }
    }

    cacheCurrentStepSaveData(data: any[]) {
        this.cacheSaveData = data;
    }



}
