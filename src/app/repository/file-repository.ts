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
}