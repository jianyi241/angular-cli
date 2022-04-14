import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CompareFeatureVo} from "../model/vo/compareFeatureVo";
import {ProductFormVo} from "../model/vo/productFormVo";
import {CompareMetricVo} from "../model/vo/compareMetircVo";

@Injectable({
    providedIn: 'root'
})
export class ReviewRepository {

    constructor(private http: HttpClient) {

    }

    compareList(productIds: Array<string>): Observable<HttpResult<CompareFeatureVo>> {
        return this.http.post<HttpResult<CompareFeatureVo>>(environment.baseURL + `/compare/compareProduct`, productIds);
    }

    getProductInfo(tabType: number): Observable<HttpResult<ProductFormVo>> {
        return this.http.get<HttpResult<ProductFormVo>>(environment.baseURL + `/compare/getTabInfo/${tabType}`);
    }

    getMetricComparison(): Observable<HttpResult<CompareMetricVo>> {
        return this.http.get<HttpResult<CompareMetricVo>>(environment.baseURL + '/compare/queryStep3TabInfo');
    }
}
