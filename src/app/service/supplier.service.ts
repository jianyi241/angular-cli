import {Injectable} from '@angular/core';
import {SupplierInfo} from "../model/po/supplierInfo";

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    supplier: SupplierInfo

    constructor() {
    }
}
