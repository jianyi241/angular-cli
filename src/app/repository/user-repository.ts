import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginUser, RestPassword} from "../model/user";
import {Authentication} from "../model/vo/authentication";

@Injectable({
    providedIn: 'root'
})
export class UserRepository {

    constructor(private http: HttpClient) {

    }

    public login(loginUser: LoginUser): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<LoginUser>>(environment.baseURL + '/authentication/password', loginUser);
    }

    public resetPassword(restPassword: RestPassword): Observable<HttpResult<any>> {
        return this.http.put<HttpResult<any>>(environment.baseURL + `/public/auth/v0/reset`, restPassword);
    }

    public forgotPassword(account: string): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/public/auth/v0/forget`, { account });
    }

    public getCurrentUser(): Observable<HttpResult<Authentication>> {
        return this.http.get<HttpResult<Authentication>>(environment.baseURL + `/user/v1/current`);
    }

}
