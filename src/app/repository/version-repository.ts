import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Version} from "../model/po/version";

@Injectable({
    providedIn: 'root'
})
export class VersionRepository {

    constructor(private http: HttpClient) {

    }

    versionById(id: string): Observable<HttpResult<any>> {
        return this.http.get<HttpResult<any>>(environment.baseURL + `/supplier/getVersion/${id}`);
    }

    supplierVersion(): Observable<HttpResult<Version>> {
        return this.http.get<HttpResult<Version>>(environment.baseURL + '/supplier/getVersion');
    }

    // version()



}
