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

    groupList(tabType: number): Observable<HttpResult<Array<GroupInfo>>> {
        return this.http.get<HttpResult<Array<GroupInfo>>>(environment.baseURL + `/supplier/groupList/${tabType}`);
    }

    propList(groupId: string): Observable<HttpResult<Array<PropertyInfo>>> {
        return this.http.get<HttpResult<Array<PropertyInfo>>>(environment.baseURL + `/supplier/propList/${groupId}`);
    }

    saveGroup(group: GroupInfo): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/supplier/saveOrUpdateGroup`, group);
    }

    saveProp(prop: PropertyInfo): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/supplier/saveOrUpdateProperty`, prop);
    }

    groupDetail(id: string): Observable<HttpResult<GroupInfo>> {
        return this.http.get<HttpResult<GroupInfo>>(environment.baseURL + `/supplier/groupConfig/${id}`);
    }

    subGroupDetail(id: string): Observable<HttpResult<GroupInfo>> {
        return this.http.get<HttpResult<GroupInfo>>(environment.baseURL + `/supplier/subGroupConfig/${id}`);
    }

    propDetail(id: string): Observable<HttpResult<PropertyInfo>> {
        return this.http.get<HttpResult<PropertyInfo>>(environment.baseURL + `/supplier/propConfig/${id}`);
    }

}
