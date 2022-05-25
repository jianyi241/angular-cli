import {UserInfo} from "../po/userInfo";
import {Attachment} from "../attachment";
import {SupplierPublicDetailInfo} from "../po/supplierPublicDetailInfo";
import {SupplierUserProductInfo} from "../po/supplierUserProductInfo";

export class CurrentUser extends UserInfo{
    avatar?: Attachment = new Attachment();
    practiceRoleId?: string;
    adviceRoleId?: string;
    practiceId?: string;
    supplierPublicDetailVo: SupplierPublicDetailInfo = new SupplierPublicDetailInfo();
    supplierUserProductVoList: Array<SupplierUserProductInfo> = new Array<SupplierUserProductInfo>();
}
