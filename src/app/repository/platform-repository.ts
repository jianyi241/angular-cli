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
import {Page} from "../model/vo/page";
import {ProductCondition} from "../model/condition/product-condition";
import PlatformView from "../model/po/platformView";
import {PlatformFee} from "../model/po/platformFee";

@Injectable({
    providedIn: 'root'
})
export class PlatformRepository {

    constructor(private http: HttpClient) {

    }

    productList(): Observable<HttpResult<Array<ProductInfo>>> {
        return this.http.get<HttpResult<Array<ProductInfo>>>(environment.baseURL + `/product/getProductList`);
    }

    getAllProduct(companyId?: string): Observable<HttpResult<Array<ProductAccessVo>>> {
        let url = companyId ? `/product/queryAllProduct/${companyId}` : `/product/queryAllProduct`;
        return this.http.get<HttpResult<Array<ProductAccessVo>>>(environment.baseURL + url);
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

    getProductButtonFlag({productId}): Observable<HttpResult<any>> {
        return this.http.get<HttpResult<any>>(environment.baseURL + `/product/getProductButtonFlag/${productId}`)
    }

    getProductsPage(productCondition: ProductCondition): Observable<HttpResult<Page<ProductInfo>>> {
        return this.http.post<HttpResult<Page<ProductInfo>>>(environment.baseURL + '/product/getPlatformPage', productCondition);
    }

    getProductList(productCondition: ProductCondition): Observable<HttpResult<Array<ProductInfo>>> {
        return this.http.post<HttpResult<Array<ProductInfo>>>(environment.baseURL + '/product/getPlatformList', productCondition);
    }

    addPlatform(): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + '/product/createPlatform',{});
    }

    // getPlatformFreezeData(productId: string,tabType: number): Observable<HttpResult<PlatformOverview | PlatformInformation | PlatformEsg>> {
    //     return this.http.get<HttpResult<PlatformOverview | PlatformInformation | PlatformEsg>>(`${environment.baseURL}/product/getPlatformFreezeData/${productId}/${tabType}`);
    // }

    getPlatformFreezeData<T>(productId: string,tabType: number): Observable<HttpResult<T>> {
        return this.http.get<HttpResult<T>>(`${environment.baseURL}/product/getPlatformFreezeData/${productId}/${tabType}`);
    }

    getPlatformViewByTabType<T>(productId: string,tabType: number): Observable<HttpResult<PlatformView<T>>> {
        return this.http.get<HttpResult<PlatformView<T>>>(`${environment.baseURL}/product/getPlatformViewByTabType/${productId}/${tabType}`);
    }

    importFeeData({productId,versionId, file}):Observable<HttpResult<any>> {
        const body = new FormData();
        body.append('file', file)
        body.append('productId', productId)
        body.append('versionId', versionId)
        return this.http.post<HttpResult<any>>(environment.baseURL + '/product/importFee',body, {});
    }

    getFeeProducts({productId,versionId}): Observable<HttpResult<Array<PlatformFee>>> {
        return this.http.get<HttpResult<Array<PlatformFee>>>(environment.baseURL + `/product/getFeesProducts/${productId}/${versionId}`);
    }

    getPlatformOptions(companyId: string): Observable<HttpResult<Array<ProductInfo>>> {
        return this.http.get<HttpResult<Array<ProductInfo>>>(environment.baseURL + `/product/platformOptions/${companyId}`);
    }

    getProductOptions(platformId: string): Observable<HttpResult<Array<ProductInfo>>> {
        return this.http.get<HttpResult<Array<ProductInfo>>>(environment.baseURL + `/product/productOptions/${platformId}`);
    }
}
