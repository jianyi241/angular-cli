import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    nextSubject = new Subject<object>();
    nextObservable = this.nextSubject.asObservable();

    constructor() {
    }

    next(): void {
        this.nextSubject.next();
        this.nextObservable.subscribe()
    }
}
