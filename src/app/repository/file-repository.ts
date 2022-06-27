import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpResult } from '../model/common/http-result';

@Injectable({
    providedIn: 'root'
})
export class FileRepository {
    constructor(private http: HttpClient) { }

    public uploadFile(dir, file): any {
        const body = new FormData();
        body.append('files', file);
        return this.http.post<HttpResult<any>>(environment.baseURL + `/file/upload/${dir}`, body, {}).toPromise();
    }

    // 下载fees模板
    // public downloadProductTemplate(): Promise<HttpResult<any>> {
    //     return this.http.get<HttpResult<any>>(environment.baseURL + `/file/download/productTemplate`).toPromise<HttpResult<any>>();
    // }
}
