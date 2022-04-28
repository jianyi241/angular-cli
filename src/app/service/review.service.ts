import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private nextSubject = new Subject<object>();
    nextObservable = this.nextSubject.asObservable();
    private backSubject = new Subject<object>();

    backObservable = this.backSubject.asObservable();

    constructor() {
    }

    next(): void {
        this.nextSubject.next();
    }

    back(): void {
        this.backSubject.next();
    }
}
