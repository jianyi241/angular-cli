import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ComparisonVo} from "../model/vo/comparisonVo";

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

    constructor() {
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
}
