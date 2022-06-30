import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RoleInfo} from "../model/po/roleInfo";
import {Page} from "../model/vo/page";
import PostInfo from "../model/po/postInfo";
import {PostCondition} from "../model/condition/post-condition";

@Injectable({
    providedIn: 'root'
})
export class AdminRepository {

    constructor(private http: HttpClient) {
    }

    // 获取post 分页列表
    getPostPageList(condition: PostCondition): Observable<HttpResult<Page<PostInfo>>> {
        return this.http.post<HttpResult<Page<PostInfo>>>(environment.baseURL + '/v1/post/pages', condition)
    }

    updatePostStatus(
                         id: string,
                         archived: string,
                         status: string
                     ): Observable<HttpResult<PostInfo>> {
        return this.http.post<HttpResult<PostInfo>>(environment.baseURL + '/v1/post/pages', {
            id,
            archived,
            status
        })
    }
}

