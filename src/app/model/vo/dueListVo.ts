import {ComparisonInfo} from "../po/comparisonInfo";
import {Attachment} from "../attachment";

export class DueListVo extends ComparisonInfo {
    userAvatar?: Attachment;
    username?: string;
    clientName?: string;
}
