import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpResult} from '../model/common/http-result';

@Injectable({
    providedIn: 'root'
})
export class FileRepository {
    constructor(private http: HttpClient) {
    }

    public uploadFile(dir, file): any {
        const body = new FormData();
        body.append('files', file);
        return this.http.post<HttpResult<any>>(environment.baseURL + `/file/upload/${dir}`, body, {}).toPromise();
    }

    downloadFile(url: string, fileName: string) {
        let newVar = this.http.get(environment.baseURL + url, {responseType: 'blob'});
        newVar.subscribe((data) => {
            let dataUrl = window.URL.createObjectURL(data);
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = dataUrl;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(dataUrl);
            document.body.removeChild(link);
        })
    }
}
