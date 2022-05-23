import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {ComparisonVo} from "../model/vo/comparisonVo";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class DueService {
    private searchReview: Subject<string> = new Subject<string>();
    private searchReviewObservable: Observable<string> = this.searchReview.asObservable();
    private searchClient: Subject<string> = new Subject<string>();
    private searchClientObservable: Observable<string> = this.searchClient.asObservable();
    private toggleArchived: Subject<boolean> = new Subject<boolean>();
    private toggleArchivedObservable: Observable<boolean> = this.toggleArchived.asObservable();
    private nextSubject = new Subject<object>();
    nextObservable = this.nextSubject.asObservable();
    private saveSubject = new Subject<object>();
    saveObservable = this.saveSubject.asObservable();
    private backSubject = new Subject<object>();
    backObservable = this.backSubject.asObservable();
    private initComparisonSubject = new Subject<object>();
    initComparisonObservable = this.initComparisonSubject.asObservable();
    private templateSubject = new Subject<object>();
    templateObservable = this.templateSubject.asObservable();
    due: ComparisonVo;

    constructor(private router: Router) {
    }

    reviewSearch(keyword: string): void {
        this.searchReview.next(keyword);
    }

    reviewObservable(callback: (data: string) => void): Subscription {
        return this.searchReviewObservable.subscribe(data => {
            callback(data);
        });
    }

    clientSearch(keyword: string): void {
        this.searchClient.next(keyword);
    }

    clientObservable(callback: (data: string) => void): Subscription {
        return this.searchClientObservable.subscribe(data => {
            callback(data);
        })
    }

    archivedToggle(archived: boolean): void {
        this.toggleArchived.next(archived);
    }

    archivedObservable(callback: (data: boolean) => void): Subscription {
        return this.toggleArchivedObservable.subscribe(data => {
            callback(data);
        })
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

    templateSave(): void {
        this.templateSubject.next();
    }

    initNotify(): void {
        this.initComparisonSubject.next();
    }

}
