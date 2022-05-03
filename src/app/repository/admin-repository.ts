import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RoleInfo} from "../model/po/roleInfo";
import {AdminInfo} from "../model/po/adminInfo";
import {Condition} from "../model/condition";
import {Page} from "../model/vo/page";

@Injectable({
    providedIn: 'root'
})
export class AdminRepository {

    constructor(private http: HttpClient) {
    }

    // 获取admin role列表
    getAdminRoles(): Observable<HttpResult<Array<RoleInfo>>> {
        return this.http.get<HttpResult<Array<RoleInfo>>>(environment.baseURL + '/admin/queryAdminRoleList')
    }

    // 根据userId获取管理员信息
    getAdminInfo(userId: string): Observable<HttpResult<AdminInfo>> {
        return this.http.get<HttpResult<AdminInfo>>(environment.baseURL + '/admin/queryAdminInfo/' + userId)
    }

    // 获取管理员列表(分页)
    getAdminInfoList(condition: Condition): Observable<HttpResult<Page<AdminInfo>>> {
        return this.http.post<HttpResult<Page<AdminInfo>>>(environment.baseURL + '/admin/queryAdminList', condition)
    }

    // 新增或修改admin
    updateOrSaveAdmin(adminInfo: AdminInfo): Observable<HttpResult<AdminInfo>> {
        return this.http.post<HttpResult<AdminInfo>>(environment.baseURL + '/admin/saveOrUpdateAdmin', adminInfo)
    }
}

