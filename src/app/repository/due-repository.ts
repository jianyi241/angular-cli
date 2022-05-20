import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DueListVo} from "../model/vo/dueListVo";
import {DueCondition} from "../model/condition/due-condition";

@Injectable({
    providedIn: 'root'
})
export class DueRepository {

    constructor(private http: HttpClient) {
    }

    // 获取due列表
    getPage(condition: DueCondition): Observable<HttpResult<Array<DueListVo>>> {
        return this.http.post<HttpResult<Array<DueListVo>>>(environment.baseURL + '/due/page', condition);
    }

    // 获取due看板
    getBoard(condition: DueCondition): Observable<HttpResult<Map<string, Array<DueListVo>>>> {
        return this.http.post<HttpResult<Map<string, Array<DueListVo>>>>(environment.baseURL + '/due/board/', condition);
    }

    // 获取due看板
    save(due: DueListVo): Observable<HttpResult<DueListVo>> {
        return this.http.post<HttpResult<DueListVo>>(environment.baseURL + '/due/save', due);
    }
}

