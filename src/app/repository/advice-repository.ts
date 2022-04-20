import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Page} from "../model/vo/page";
import {PracticeInfo} from "../model/po/practiceInfo";
import {AdviceCondition} from "../model/condition/advice-condition";
import {TeamCondition} from "../model/condition/team-condition";
import {TeamInfo} from "../model/po/teamInfo";
import {RoleInfo} from "../model/po/roleInfo";

@Injectable({
    providedIn: 'root'
})
export class AdviceRepository {

    constructor(private http: HttpClient) {

    }

    practiceList(condition: AdviceCondition): Observable<HttpResult<Page<PracticeInfo>>> {
        return this.http.post<HttpResult<Page<PracticeInfo>>>(environment.baseURL + `/advice/queryPracticeList`, condition);
    }

    teamList(condition: TeamCondition): Observable<HttpResult<Page<TeamInfo>>> {
        return this.http.post<HttpResult<Page<TeamInfo>>>(environment.baseURL + '/advice/queryTeamMemberList', condition);
    }

    teamMembers(condition: TeamCondition): Observable<HttpResult<Page<TeamInfo>>> {
        return this.http.post<HttpResult<Page<TeamInfo>>>(environment.baseURL + `/advice/queryTeamMember`, condition);
    }

    practiceDetail(id: string): Observable<HttpResult<PracticeInfo>> {
        return this.http.get<HttpResult<PracticeInfo>>(environment.baseURL + `/advice/queryPractice/${id}`);
    }

    teamDetail(id: string): Observable<HttpResult<TeamInfo>> {
        return this.http.get<HttpResult<TeamInfo>>(environment.baseURL + `/advice/queryTeamMember/${id}`);
    }

    savePractice(practice: PracticeInfo): Observable<HttpResult<PracticeInfo>> {
        return this.http.post<HttpResult<PracticeInfo>>(environment.baseURL + '/advice/saveOrUpdatePractice', practice);
    }

    saveTeam(teamInfo: TeamInfo): Observable<HttpResult<TeamInfo>> {
        return this.http.post<HttpResult<TeamInfo>>(environment.baseURL + '/advice/saveOrUpdateTeamMember', teamInfo);
    }

    getAccountRoles(): Observable<HttpResult<Array<RoleInfo>>> {
        return this.http.get<HttpResult<Array<RoleInfo>>>(environment.baseURL + '/advice/queryRoleList');
    }

    getPracticeRoles(): Observable<HttpResult<Array<RoleInfo>>> {
        return this.http.get<HttpResult<Array<RoleInfo>>>(environment.baseURL + '/advice/queryPracticeRoleList');
    }

    resendInvite(openId: string): Observable<HttpResult<any>> {
        return this.http.get<HttpResult<any>>(environment.baseURL + `/email/resendInviteEmail/${openId}`);
    }
}
