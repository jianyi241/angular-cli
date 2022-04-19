import {UserInfo} from "../po/userInfo";

export class SignupVo extends UserInfo{
    password?: string;
    confirmPassword?: string;
    practiceName?: string;
    practiceRoleId?: string;
}
