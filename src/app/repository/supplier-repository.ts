import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GroupInfo} from "../model/po/groupInfo";
import {PropertyInfo} from "../model/po/propertyInfo";

@Injectable({
    providedIn: 'root'
})
export class SupplierRepository {

    constructor(private http: HttpClient) {

    }

    public groupList(tabType: number): Observable<HttpResult<Array<GroupInfo>>> {
        return this.http.get<HttpResult<Array<GroupInfo>>>(environment.baseURL + `/supplier/groupList/${tabType}`);
    }

    public propList(groupId: string): Observable<HttpResult<Array<PropertyInfo>>> {
        return this.http.get<HttpResult<Array<PropertyInfo>>>(environment.baseURL + `/supplier/propList/${groupId}`);
    }

    public saveGroup(group: GroupInfo): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/supplier/saveOrUpdateGroup`, group);
    }

    public saveProp(prop: PropertyInfo): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/supplier/saveOrUpdateProperty`, prop);
    }

}
