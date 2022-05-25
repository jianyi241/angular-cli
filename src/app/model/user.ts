import {UserInfo} from "./po/userInfo";
import {BaseModel} from "./po/baseModel";

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

export class VerifyCode extends BaseModel{
    openId: string;
    token: string;
    code: string;
    account?: string;
    status?: string;
    password?: string;
    loginTime?: string;
}

export class InviteUser extends UserInfo {
    password: string;
    confirmPassword: string;
    practiceName: string;
    validToken: string;
}

export class SupplierSend {
    email?: string;
    name?: string;
    phone?: string;
    message?: string;
}
