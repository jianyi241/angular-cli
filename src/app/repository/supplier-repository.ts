import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AdminInfo} from "../model/po/adminInfo";
import {Page} from "../model/vo/page";
import {SupplierInfo} from "../model/po/supplierInfo";
import {RoleInfo} from "../model/po/roleInfo";
import {SupplierCondition} from "../model/condition/supplier-condition";

@Injectable({
    providedIn: 'root'
})
export class SupplierRepository {

    constructor(private http: HttpClient) {
    }

    getSupplierList(condition: SupplierCondition): Observable<HttpResult<Page<SupplierInfo>>> {
        return this.http.post<HttpResult<Page<any>>>(environment.baseURL + '/supplier/querySuppliersList', condition);
    }

    getSupplierRoles(): Observable<HttpResult<Array<RoleInfo>>> {
        return this.http.get<HttpResult<Array<RoleInfo>>>(environment.baseURL + '/supplier/querySupplierRole');
    }

    saveSupplier(supplier: SupplierInfo): Observable<HttpResult<SupplierInfo>> {
        return this.http.post<HttpResult<AdminInfo>>(environment.baseURL + '/supplier/saveOrUpdateSupplier', supplier);
    }

    getSupplierDetail(id: string): Observable<HttpResult<SupplierInfo>> {
        return this.http.get<HttpResult<SupplierInfo>>(environment.baseURL + `/supplier/querySupplierInfo/${id}`);
    }
}
