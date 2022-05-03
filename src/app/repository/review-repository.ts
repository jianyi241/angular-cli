import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CompareFeatureVo} from "../model/vo/compareFeatureVo";
import {ProductFormVo} from "../model/vo/productFormVo";
import {CompareMetricVo} from "../model/vo/compareMetircVo";
import {Page} from "../model/vo/page";
import {ComparisonInfo} from "../model/po/comparisonInfo";
import {ComparisonCondition} from "../model/condition/comparisonCondition";
import {AnalyseTypeInfo} from "../model/po/analyseTypeInfo";

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

    getComparisonList(condition: ComparisonCondition): Observable<HttpResult<Page<ComparisonInfo>>> {
        return this.http.post<HttpResult<Page<ComparisonInfo>>>(`${environment.baseURL}/compare/queryComparisonList`, condition);
    }

    getCompareDetail(comparisonId: string): Observable<HttpResult<ComparisonInfo>> {
        return this.http.get<HttpResult<ComparisonInfo>>(environment.baseURL + `/compare/queryComparisonInfo/${comparisonId}`);
    }

    getAnalyseType(): Observable<HttpResult<Array<AnalyseTypeInfo>>> {
        return this.http.get<HttpResult<Array<AnalyseTypeInfo>>>(environment.baseURL + `/compare/queryAnalyseType`);
    }
}
