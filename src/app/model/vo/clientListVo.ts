import {Attachment} from "../attachment";
import {ClientInfo} from "../po/clientInfo";

export class ClientListVo extends ClientInfo{
    totalDue?: number;
    username?: string;
    userAvatar?: Attachment;
}
