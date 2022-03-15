import {Attachment} from './attachment';

export class CurrentUser {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    openId?: string;
    mobile?: string;
    status?: number;
    avatar: Attachment;
}

export class RestPassword {
    validToken: string;
    password: string;
    confirmPassword: string;
}

export class LoginUser {
    account?: string;
    password?: string;
    accessToken?: string;
}
