import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CompareFeatureVo} from "../model/vo/compareFeatureVo";
import {CompareMetricVo} from "../model/vo/compareMetircVo";
import {Page} from "../model/vo/page";
import {ComparisonInfo} from "../model/po/comparisonInfo";
import {ComparisonCondition} from "../model/condition/comparisonCondition";
import {TeamInfo} from "../model/po/teamInfo";
import {AnalyseTypeVo} from "../model/vo/analyseTypeVo";
import {ComparisonVo} from "../model/vo/comparisonVo";
import {GroupVo} from "../model/vo/groupVo";
import {ComparisonPropertyInfo} from "../model/po/comparisonPropertyInfo";
import {ComparisonProductVo} from "../model/vo/comparisonProductVo";
import {ComparisonCommentInfo} from "../model/po/comparisonCommentInfo";

@Injectable({
    providedIn: 'root'
})
export class ReviewRepository {

    constructor(private http: HttpClient) {

    }

    compareList(comparisonId: string): Observable<HttpResult<CompareFeatureVo>> {
        return this.http.get<HttpResult<CompareFeatureVo>>(environment.baseURL + `/compare/getFeatureTabInfo/${comparisonId}`);
    }

    getFeatureGroupAndProperty(comparisonId: string): Observable<HttpResult<Array<GroupVo>>> {
        return this.http.get<HttpResult<Array<GroupVo>>>(environment.baseURL + `/compare/queryFeatureGroupAndProperty/${comparisonId}`);
    }

    getMetricComparison(): Observable<HttpResult<CompareMetricVo>> {
        return this.http.get<HttpResult<CompareMetricVo>>(environment.baseURL + '/compare/queryStep3TabInfo');
    }

    getComparisonList(condition: ComparisonCondition): Observable<HttpResult<Page<ComparisonInfo>>> {
        return this.http.post<HttpResult<Page<ComparisonInfo>>>(`${environment.baseURL}/compare/queryComparisonList`, condition);
    }

    getCompareDetail(comparisonId: string): Observable<HttpResult<ComparisonVo>> {
        return this.http.get<HttpResult<ComparisonVo>>(environment.baseURL + `/compare/queryComparisonInfo/${comparisonId}`);
    }

    getAnalyseType(): Observable<HttpResult<Array<AnalyseTypeVo>>> {
        return this.http.get<HttpResult<Array<AnalyseTypeVo>>>(environment.baseURL + `/compare/queryAnalyseType`);
    }

    getSupplierUser(): Observable<HttpResult<Array<TeamInfo>>> {
        return this.http.get<HttpResult<Array<TeamInfo>>>(environment.baseURL + '/compare/querySupplierUser');
    }

    getComment(comparisonId: string, analyseId: string, productId: string): Observable<HttpResult<ComparisonCommentInfo>> {
        return this.http.get<HttpResult<ComparisonCommentInfo>>(environment.baseURL + `/compare/queryComment/${comparisonId}/${analyseId}/${productId}`);
    }

    saveComparison(comparison: ComparisonVo): Observable<HttpResult<ComparisonVo>> {
        return this.http.post<HttpResult<ComparisonVo>>(environment.baseURL + `/compare/saveOrUpdateComparison`, comparison);
    }

    saveComment(comparisonComment: ComparisonCommentInfo): Observable<HttpResult<ComparisonVo>> {
        return this.http.post<HttpResult<ComparisonVo>>(environment.baseURL + `/compare/saveOrUpdateComment`, comparisonComment);
    }

    ///suitability/compare/saveComparisonProperty
    saveComparisonProperty(comparisonProperties: Array<ComparisonPropertyInfo>): Observable<HttpResult<ComparisonVo>> {
        return this.http.post<HttpResult<ComparisonVo>>(environment.baseURL + `/compare/saveComparisonProperty`, comparisonProperties);
    }

    changeProductStatus(product: ComparisonProductVo) {
        return this.http.post<HttpResult<ComparisonVo>>(environment.baseURL + `/compare/changeProductStatus`, product);
    }
}
