import {ProductInfo} from "../po/productInfo";
import {ProductPropInfo} from "../po/productPropInfo";

export class ProductVo extends ProductInfo {
    checked: boolean = true;
    productPropVoList?: Array<ProductPropInfo> = [];
}
