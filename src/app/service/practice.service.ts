import {Injectable} from '@angular/core';
import {PracticeInfo} from "../model/po/practiceInfo";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PracticeService {
    practice: PracticeInfo;

    private refreshTeamSubject = new Subject<object>();
    refreshTeamObservable = this.refreshTeamSubject.asObservable()

    constructor() {
    }

    refreshTeam() {
        this.refreshTeamSubject.next()
    }
}
