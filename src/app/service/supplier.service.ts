import {Injectable} from '@angular/core';
import {SupplierInfo} from "../model/po/supplierInfo";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    supplier: SupplierInfo

    private refreshTeamSubject = new Subject<object>();
    refreshTeamObservable = this.refreshTeamSubject.asObservable()

    constructor() {
    }

    refreshTeam() {
        this.refreshTeamSubject.next()
    }

}
