import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ComparisonVo} from "../model/vo/comparisonVo";
import {AnalysisType} from "../model/enums/analysis-type";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private nextSubject = new Subject<object>();
    nextObservable = this.nextSubject.asObservable();
    private saveSubject = new Subject<object>();
    saveObservable = this.saveSubject.asObservable();
    private backSubject = new Subject<object>();
    backObservable = this.backSubject.asObservable();
    private initComparisonSubject = new Subject<object>();
    initComparisonObservable = this.initComparisonSubject.asObservable();
    comparison: ComparisonVo;

    constructor(private router: Router) {
    }

    next(): void {
        this.nextSubject.next();
    }

    save(): void {
        this.saveSubject.next();
    }

    back(): void {
        this.backSubject.next();
    }

    initNotify(): void {
        this.initComparisonSubject.next();
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
        }
    }
}
