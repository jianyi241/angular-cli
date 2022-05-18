import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GroupInfo} from "../model/po/groupInfo";
import {PropertyInfo} from "../model/po/propertyInfo";
import {Version} from "../model/po/version";
import {Sort} from "../model/vo/sort";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationRepository {

    constructor(private http: HttpClient) {

    }

    groupList(tabType: number, versionId: string): Observable<HttpResult<Array<GroupInfo>>> {
        return this.http.get<HttpResult<Array<GroupInfo>>>(environment.baseURL + `/supplier/groupList/${tabType}/${versionId}`);
    }

    propList(groupId: string, versionId: string): Observable<HttpResult<Array<PropertyInfo>>> {
        return this.http.get<HttpResult<Array<PropertyInfo>>>(environment.baseURL + `/supplier/propList/${groupId}/${versionId}`);
    }

    propListByType(tabType: number, versionId: string): Observable<HttpResult<Array<PropertyInfo>>> {
        return this.http.get<HttpResult<Array<PropertyInfo>>>(environment.baseURL + `/supplier/propListByTab/${tabType}/${versionId}`);
    }

    saveGroup(group: GroupInfo): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/supplier/saveOrUpdateGroup`, group);
    }

    saveProp(prop: PropertyInfo): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/supplier/saveOrUpdateProperty`, prop);
    }

    groupDetail(id: string, versionId: string): Observable<HttpResult<GroupInfo>> {
        return this.http.get<HttpResult<GroupInfo>>(environment.baseURL + `/supplier/groupConfig/${id}/${versionId}`);
    }

    subGroupDetail(id: string, versionId: string): Observable<HttpResult<GroupInfo>> {
        return this.http.get<HttpResult<GroupInfo>>(environment.baseURL + `/supplier/subGroupConfig/${id}/${versionId}`);
    }

    propDetail(id: string, versionId: string): Observable<HttpResult<PropertyInfo>> {
        return this.http.get<HttpResult<PropertyInfo>>(environment.baseURL + `/supplier/propConfig/${id}/${versionId}`);
    }

    editConfig(): Observable<HttpResult<Version>> {
        return this.http.get<HttpResult<Version>>(environment.baseURL + `/supplier/editModel`);
    }

    pushConfig(): Observable<HttpResult<Version>> {
        return this.http.get<HttpResult<Version>>(environment.baseURL + '/supplier/publish')
    }

    sortGroup(sort: Sort): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<GroupInfo>>(environment.baseURL + '/supplier/changeGroupSort', sort);
    }

    sortProp(sort: Sort): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<GroupInfo>>(environment.baseURL + '/supplier/changePropSort', sort);
    }

    versionList(): Observable<HttpResult<Array<Version>>> {
        return this.http.get<HttpResult<Array<Version>>>(environment.baseURL + `/supplier/getVersionList`);
    }

    getAllProductPushFlag(): Observable<HttpResult<any>> {
        return this.http.get<HttpResult<any>>(environment.baseURL + '/supplier/getAllProductPushFlag');
    }
}
