import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ComparisonInfo} from "../model/po/comparisonInfo";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private nextSubject = new Subject<object>();
    nextObservable = this.nextSubject.asObservable();
    private backSubject = new Subject<object>();
    backObservable = this.backSubject.asObservable();
    comparison: ComparisonInfo;

    constructor() {
    }

    next(): void {
        this.nextSubject.next();
    }

    back(): void {
        this.backSubject.next();
    }
}
