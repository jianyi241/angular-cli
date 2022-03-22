import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CompareVo} from "../model/vo/compareVo";

@Injectable({
    providedIn: 'root'
})
export class ReviewRepository {

    constructor(private http: HttpClient) {

    }

    compareList(productIds: Array<string>): Observable<HttpResult<CompareVo>> {
        return this.http.post<HttpResult<CompareVo>>(environment.baseURL + `/compare/compareProduct`, productIds);
    }
}
