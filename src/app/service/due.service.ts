import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {ComparisonVo} from "../model/vo/comparisonVo";
import {Router} from "@angular/router";
import {DueTipComponent} from "../pages/dues/due-tip/due-tip.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
    private saveSubject = new Subject<() => void>();
    saveObservable = this.saveSubject.asObservable();
    private backSubject = new Subject<object>();
    backObservable = this.backSubject.asObservable();
    private initComparisonSubject = new Subject<object>();
    initComparisonObservable = this.initComparisonSubject.asObservable();
    private templateSubject = new Subject<object>();
    templateObservable = this.templateSubject.asObservable();
    private leaveReviewSubject = new Subject<object>();
    leaveReviewObservable = this.leaveReviewSubject.asObservable();
    due: ComparisonVo;
    cacheSaveData: Array<any> = [];

    constructor(private router: Router, private modalService: NgbModal) {
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

    save(callback?: () => void): void {
        this.saveSubject.next(callback);
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


    leave(): void {
        this.leaveReviewSubject.next();
    }

    dealLeave(data: any[]): void {
        let cache = this.cacheSaveData.join(',');
        let curr = data.join(',');
        if (cache !== curr) {
            const modalRef = this.modalService.open(DueTipComponent, {
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
                    this.router.navigateByUrl('/advice-review/review-list/list-view');
                });
            }).catch((flag) => {
                flag && this.router.navigateByUrl('/advice-review/review-list/list-view');
            })
        } else {
            this.router.navigateByUrl('/advice-review/review-list/list-view');
        }
    }

    cacheCurrentStepSaveData(data: any[]) {
        this.cacheSaveData = data;
    }
}
