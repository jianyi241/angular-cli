import {UserInfo} from "../po/userInfo";

export class SignupVo extends UserInfo{
    password?: string;
    confirmPassword?: string;
    practiceName?: string;
    practiceRoleId?: string;
    supplierName?: string;
    updateNewsFlag?: boolean = false;
    commFlag?: boolean = false;
    planFlag?: boolean = false;
}
