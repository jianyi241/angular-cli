import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GroupInfo} from "../model/po/groupInfo";

@Injectable({
    providedIn: 'root'
})
export class PlatformRepository {

    constructor(private http: HttpClient) {

    }

    groupList(tabType: number): Observable<HttpResult<Array<GroupInfo>>> {
        return this.http.get<HttpResult<Array<GroupInfo>>>(environment.baseURL + `/supplier/groupList/${tabType}`);
    }

    saveGroup(group: GroupInfo): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/supplier/saveOrUpdateGroup`, group);
    }
}
