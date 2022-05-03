import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GroupInfo} from "../model/po/groupInfo";
import {ProductInfo} from "../model/po/productInfo";
import {ProductPropInfo} from "../model/po/productPropInfo";
import {Constants} from "../model/constants";
import {ProductFormVo} from "../model/vo/productFormVo";
import {Version} from "../model/po/version";
import {SubProduct} from "../model/po/subProduct";
import {ProductAccessVo} from "../model/vo/productAccessVo";

@Injectable({
    providedIn: 'root'
})
export class PlatformRepository {

    constructor(private http: HttpClient) {

    }

    productList(): Observable<HttpResult<Array<ProductInfo>>> {
        return this.http.get<HttpResult<Array<ProductInfo>>>(environment.baseURL + `/product/getProductList`);
    }

    getAllProduct(): Observable<HttpResult<Array<ProductAccessVo>>> {
        return this.http.get<HttpResult<Array<ProductAccessVo>>>(environment.baseURL + `/product/queryAllProduct`);
    }

    groupAndPropList(productId: string): Observable<HttpResult<Array<GroupInfo>>> {
        return this.http.get<HttpResult<Array<GroupInfo>>>(environment.baseURL + `/product/getGroupAndProp/${productId}`);
    }

    editProduct(productId: string): Observable<HttpResult<Version>> {
        return this.http.get<HttpResult<Version>>(environment.baseURL + `/product/editProduct/${productId}`);
    }

    publishProduct(productId: string): Observable<HttpResult<Version>> {
        return this.http.get<HttpResult<Version>>(environment.baseURL + `/product/publish/${productId}`);
    }

    productPropList(tabType: number, productId: string, groupId?: string): Observable<HttpResult<Array<ProductPropInfo>>> {
        let url = groupId ? `/product/getProductPropList/${tabType}/${productId}/${groupId}` : `/product/getProductPropList/${tabType}/${productId}`;
        return this.http.get<HttpResult<Array<ProductPropInfo>>>(environment.baseURL + url);
    }

    saveProductProp(productProp: ProductPropInfo): Observable<HttpResult<ProductPropInfo>> {
        return this.http.post<HttpResult<ProductPropInfo>>(environment.baseURL + `/product/saveOrUpdateProp`, productProp);
    }

    productDetail(id: string): Observable<HttpResult<ProductInfo>> {
        return this.http.get<HttpResult<ProductInfo>>(environment.baseURL + `/product/getProductInfo/${id}`);
    }

    getProductPropList(tabType: number, productId: string, versionId: string): Observable<HttpResult<ProductFormVo>> {
        let url = versionId != Constants.VERSION ? `/product/getProductTabInfo/${tabType}/${productId}/${versionId}` : `/product/getProductTabInfo/${tabType}/${productId}`;
        return this.http.get<HttpResult<ProductFormVo>>(environment.baseURL + url);
    }

    getModelPublishChangeFlag(productId: string): Observable<HttpResult<Version>> {
        return this.http.get<HttpResult<Version>>(environment.baseURL + `/product/getModelPublishChangeFlag/${productId}`);
    }

    getChangeTabs(): Observable<HttpResult<Array<any>>> {
        return this.http.get<HttpResult<Array<any>>>(environment.baseURL + `/product/getChangeTabs`);
    }

    versionList(productId: string): Observable<HttpResult<Array<Version>>> {
        return this.http.get<HttpResult<Array<Version>>>(environment.baseURL + `/product/getProductVersionList/${productId}`);
    }

    saveSubProduct(subProduct: SubProduct): Observable<HttpResult<SubProduct>> {
        return this.http.post<HttpResult<SubProduct>>(environment.baseURL + '/product/saveSubProduct', subProduct);
    }
}
