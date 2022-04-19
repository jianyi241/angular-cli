import {UserInfo} from "../po/userInfo";
import {Attachment} from "../attachment";

export class CurrentUser extends UserInfo{
    avatar?: Attachment = new Attachment();
    practiceRoleId?: string;
    adviceRoleId?: string;
    practiceId?: string;
}
