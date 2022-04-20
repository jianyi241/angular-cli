import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {InviteUser, LoginUser, RestPassword, VerifyCode} from "../model/user";
import {Authentication} from "../model/vo/authentication";
import {CurrentUser} from "../model/vo/currentUser";
import {SignupVo} from "../model/vo/signupVo";

@Injectable({
    providedIn: 'root'
})
export class UserRepository {

    constructor(private http: HttpClient) {

    }

    login(loginUser: LoginUser): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<LoginUser>>(environment.baseURL + '/authentication/password', loginUser);
    }

    resetPassword(restPassword: RestPassword): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/user/v1/updatePassword`, restPassword);
    }

    forgotPassword(account: string): Observable<HttpResult<any>> {
        return this.http.get<HttpResult<any>>(environment.baseURL + `/user/v1/forgetPassword/${account}`, {});
    }

    getCurrentUser(): Observable<HttpResult<Authentication>> {
        return this.http.get<HttpResult<Authentication>>(environment.baseURL + `/user/v1/current`);
    }

    updateProfile(currentUser: CurrentUser): Observable<HttpResult<Authentication>> {
        return this.http.post<HttpResult<Authentication>>(environment.baseURL + `/user/v1/updateUserInfo`, currentUser);
    }

    signup(signup: SignupVo): Observable<HttpResult<Authentication>> {
        return this.http.post<HttpResult<Authentication>>(environment.baseURL + `/user/v1/signUp`, signup);
    }

    checkEmailUnique(email: string): Observable<HttpResult<any>> {
        return this.http.get<HttpResult<any>>(environment.baseURL + `/user/v1/queryUserByEmail/${email}`);
    }

    verifyCode(verify: VerifyCode): Observable<HttpResult<VerifyCode>> {
        return this.http.post<HttpResult<VerifyCode>>(environment.baseURL + '/user/v1/validUser', verify);
    }

    queryInvitationInfo(verify: VerifyCode): Observable<HttpResult<InviteUser>> {
        return this.http.post<HttpResult<InviteUser>>(environment.baseURL + '/user/v1/queryUserByOpenIdAndToken', verify);
    }

    inviteUser(inviteUser: InviteUser): Observable<HttpResult<InviteUser>> {
        return this.http.post<HttpResult<InviteUser>>(environment.baseURL + '/user/v1/inviteSignup', inviteUser);
    }

    resendActiveEmail(openId: string): Observable<HttpResult<any>> {
        return this.http.get<HttpResult<any>>(environment.baseURL + `/email/resendActiveEmail/${openId}`)
    }
}
