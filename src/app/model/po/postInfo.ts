import {Attachment} from "../attachment";
import PostContentInfo from "./postContentInfo";
import PostFeatureInfo from "./postFeatureInfo";
import {BaseModel} from "./baseModel";

export default class PostInfo extends BaseModel{
    archived?: boolean;
    attachments?: Array<Attachment>;
    companyId?: string;
    content?: PostContentInfo;
    features?: Array<PostFeatureInfo>;
    platformName?: string;
    productId?: string;
    productName?: string;
    status?: string;
    subProductId?: string;
    type?: string;
    versionId?: string;
}
