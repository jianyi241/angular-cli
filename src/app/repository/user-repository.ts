import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult } from '../model/common/http-result';
import { CurrentUser, LoginUser, RestPassword } from '../model/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserRepository {

    constructor(private http: HttpClient) {

    }

    public login(loginUser: LoginUser): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<LoginUser>>(environment.baseURL + '/public/auth/v0/login', loginUser);
    }

    public resetPassword(restPassword: RestPassword): Observable<HttpResult<CurrentUser>> {
        return this.http.put<HttpResult<CurrentUser>>(environment.baseURL + `/public/auth/v0/reset`, restPassword);
    }

    public forgotPassword(account: string): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/public/auth/v0/forget`, { account });
    }

    public getCurrentUser(): Observable<HttpResult<CurrentUser>> {
        return this.http.get<HttpResult<CurrentUser>>(environment.baseURL + `/user/v1/current`);
    }

}
