import {PropertyInfo} from "../po/propertyInfo";
import {Attachment} from "../attachment";
import {ProductPropInfo} from "../po/productPropInfo";

export class PropertyVo extends PropertyInfo {
    propValue?: string;
    productDesc?: string;
    uploading?: boolean = false;
    compChecked: boolean = false;
    essential: boolean = false;
    attachmentVo?: Attachment = new Attachment();
    productPropVo?: ProductPropInfo = new ProductPropInfo();
}
