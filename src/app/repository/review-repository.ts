import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CompareFeatureVo} from "../model/vo/compareFeatureVo";
import {CompareMetricVo, TabVo} from "../model/vo/compareMetircVo";
import {Page} from "../model/vo/page";
import {ComparisonInfo} from "../model/po/comparisonInfo";
import {ComparisonCondition} from "../model/condition/comparisonCondition";
import {TeamInfo} from "../model/po/teamInfo";
import {AnalyseTypeVo} from "../model/vo/analyseTypeVo";
import {ComparisonVo} from "../model/vo/comparisonVo";
import {GroupVo} from "../model/vo/groupVo";
import {ComparisonPropertyInfo} from "../model/po/comparisonPropertyInfo";
import {ComparisonCommentInfo} from "../model/po/comparisonCommentInfo";
import {ComparisonSaveTemplateInfo, ComparisonTemplateInfo} from "../model/po/comparisonTemplateInfo";
import {ComparisonProductInfo} from "../model/po/comparisonProductInfo";
import {SelectionCondition} from "../model/condition/selection-condition";

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

    getBmGroupAndProperty(comparisonId: string): Observable<HttpResult<Array<TabVo>>> {
        return this.http.get<HttpResult<Array<TabVo>>>(environment.baseURL + `/compare/queryBmGroupAndProperty/${comparisonId}`);
    }

    getMetricComparison(comparisonId: string): Observable<HttpResult<CompareMetricVo>> {
        return this.http.get<HttpResult<CompareMetricVo>>(environment.baseURL + `/compare/queryBmTabInfo/${comparisonId}`);
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

    getTemplates(): Observable<HttpResult<Array<ComparisonTemplateInfo>>> {
        return this.http.get<HttpResult<Array<ComparisonTemplateInfo>>>(environment.baseURL + '/compare/getFeatureTemplateList');
    }

    getUsersByType(type: number): Observable<HttpResult<Array<TeamInfo>>> {
        return this.http.get<HttpResult<Array<TeamInfo>>>(environment.baseURL + `/user/v1/queryUsers/${type}`);
    }

    getComment(comparisonId: string, analyseId: string, productId: string): Observable<HttpResult<ComparisonCommentInfo>> {
        return this.http.get<HttpResult<ComparisonCommentInfo>>(environment.baseURL + `/compare/queryComment/${comparisonId}/${analyseId}/${productId}`);
    }

    saveComparison(comparison: ComparisonVo): Observable<HttpResult<ComparisonVo>> {
        return this.http.post<HttpResult<ComparisonVo>>(environment.baseURL + `/compare/saveOrUpdateComparison`, comparison);
    }

    saveDue(comparison: ComparisonVo): Observable<HttpResult<ComparisonVo>> {
        return this.http.post<HttpResult<ComparisonVo>>(environment.baseURL + `/due/save`, comparison);
    }

    saveComment(comparisonComment: ComparisonCommentInfo): Observable<HttpResult<ComparisonVo>> {
        return this.http.post<HttpResult<ComparisonVo>>(environment.baseURL + `/compare/saveOrUpdateComment`, comparisonComment);
    }

    ///suitability/compare/saveComparisonProperty
    saveComparisonProperty(comparisonProperties: Array<ComparisonPropertyInfo>): Observable<HttpResult<ComparisonVo>> {
        return this.http.post<HttpResult<ComparisonVo>>(environment.baseURL + `/compare/saveComparisonProperty`, comparisonProperties);
    }

    propertySelection(condition: SelectionCondition): Observable<HttpResult<any>> {
        return this.http.post<HttpResult<any>>(environment.baseURL + '/compare/featurePropertySelection', condition);
    }


    changeProduct(product: ComparisonProductInfo) {
        return this.http.put<HttpResult<ComparisonProductInfo>>(environment.baseURL + `/compare/changeProduct`, product);
    }

    saveFeatureTemplate(templateInfo:ComparisonSaveTemplateInfo){
        return this.http.post<HttpResult<ComparisonSaveTemplateInfo>>(environment.baseURL + `/compare/saveFeatureTemplate`, templateInfo);
    }
}
