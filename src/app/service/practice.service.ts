import {Injectable} from '@angular/core';
import {PracticeInfo} from "../model/po/practiceInfo";

@Injectable({
    providedIn: 'root'
})
export class PracticeService {
    practice: PracticeInfo;

    constructor() {
    }
}
