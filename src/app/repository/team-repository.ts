import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Page} from "../model/vo/page";
import {TeamInfo} from "../model/po/teamInfo";
import {TeamCondition} from "../model/condition/team-condition";

@Injectable({
    providedIn: 'root'
})
export class TeamRepository {

    constructor(private http: HttpClient) {
    }

    teamList(condition: TeamCondition): Observable<HttpResult<Page<TeamInfo>>> {
        return this.http.post<HttpResult<Page<TeamInfo>>>(environment.baseURL + '/team/queryTeamMemberList', condition);
    }

    teamDetail(id: string): Observable<HttpResult<TeamInfo>> {
        return this.http.get<HttpResult<TeamInfo>>(environment.baseURL + `/team/queryTeamMember/${id}`);
    }

    saveTeam(teamInfo: TeamInfo): Observable<HttpResult<TeamInfo>> {
        return this.http.post<HttpResult<TeamInfo>>(environment.baseURL + '/team/saveOrUpdateTeamMember', teamInfo);
    }

    resendInvite(openId: string): Observable<HttpResult<any>> {
        return this.http.get<HttpResult<any>>(environment.baseURL + `/email/resendInviteEmail/${openId}`);
    }

}
