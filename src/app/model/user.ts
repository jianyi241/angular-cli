import {UserInfo} from "./po/userInfo";

export class RestPassword {
    openId: string;
    validToken: string;
    password: string;
    confirmPassword: string;
}

export class LoginUser {
    account?: string;
    password?: string;
    accessToken?: string;
}

export class VerifyCode {
    openId: string;
    token: string;
    code: string;
}

export class InviteUser extends UserInfo {
    password: string;
    confirmPassword: string;
    practiceName: string;
    validToken: string;
}