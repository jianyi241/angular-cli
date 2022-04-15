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
