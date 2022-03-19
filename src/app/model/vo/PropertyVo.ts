import {PropertyInfo} from "../po/propertyInfo";
import {Attachment} from "../attachment";

export class PropertyVo extends PropertyInfo {
    propValue?: string;
    productDesc?: string;
    uploading?: boolean = false;
    attachmentVo?: Attachment = new Attachment();
}