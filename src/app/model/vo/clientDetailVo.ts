import {CurrentUser} from "./currentUser";
import {ClientInfo} from "../po/clientInfo";
import {ClientMemberInfo} from "../po/clientMemberInfo";

export class ClientDetailVo extends ClientInfo{
    clientMembers?: Array<ClientMemberInfo> = new Array<ClientMemberInfo>();
    adviser?: CurrentUser
}
