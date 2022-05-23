import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DueListVo} from "../model/vo/dueListVo";
import {ClientCondition} from "../model/condition/client-condition";
import {ClientListVo} from "../model/vo/clientListVo";
import {ClientInfo} from "../model/po/clientInfo";
import {ClientDetailVo} from "../model/vo/clientDetailVo";

@Injectable({
    providedIn: 'root'
})
export class ClientRepository {

    constructor(private http: HttpClient) {
    }

    getPage(condition: ClientCondition): Observable<HttpResult<Array<ClientListVo>>> {
        return this.http.post<HttpResult<Array<ClientListVo>>>(environment.baseURL + '/client/page', condition);
    }

    getList(): Observable<HttpResult<Array<ClientInfo>>> {
        return this.http.get<HttpResult<Array<ClientInfo>>>(environment.baseURL + '/client/list');
    }

    getDetail(id: string): Observable<HttpResult<ClientDetailVo>> {
        return this.http.get<HttpResult<ClientDetailVo>>(environment.baseURL + `/client/${id}`);
    }

    save(client: ClientDetailVo): Observable<HttpResult<ClientDetailVo>> {
        return this.http.post<HttpResult<ClientDetailVo>>(environment.baseURL + '/client/save', client);
    }

    getClientReviews(id: string): Observable<HttpResult<DueListVo>> {
        return this.http.get<HttpResult<DueListVo>>(environment.baseURL + `/client/review/${id}`);
    }
}

