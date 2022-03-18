import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GroupInfo} from "../model/po/groupInfo";
import {ProductInfo} from "../model/po/productInfo";
import {ProductPropInfo} from "../model/po/productPropInfo";

@Injectable({
    providedIn: 'root'
})
export class PlatformRepository {

    constructor(private http: HttpClient) {

    }

    productList(): Observable<HttpResult<Array<ProductInfo>>> {
        return this.http.get<HttpResult<Array<ProductInfo>>>(environment.baseURL + `/product/getProductList`);
    }

    groupAndPropList(productId: string): Observable<HttpResult<Array<GroupInfo>>> {
        return this.http.get<HttpResult<Array<GroupInfo>>>(environment.baseURL + `/product/getGroupAndProp/${productId}`);
    }

    productPropList(tabType: number, productId: string, groupId?: string): Observable<HttpResult<Array<ProductPropInfo>>> {
        let url = groupId ? `/product/getProductPropList/${tabType}/${productId}/${groupId}` : `/product/getProductPropList/${tabType}/${productId}`;
        return this.http.get<HttpResult<Array<ProductPropInfo>>>(environment.baseURL + url);
    }

    saveGroup(productProp: ProductPropInfo): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + `/product/saveOrUpdateProp`, productProp);
    }

    productDetail(id: string): Observable<HttpResult<ProductInfo>> {
        return this.http.get<HttpResult<ProductInfo>>(environment.baseURL + `/product/getProductInfo/${id}`);
    }
}
