import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResult} from '../model/common/http-result';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RoleInfo} from "../model/po/roleInfo";
import {Page} from "../model/vo/page";
import PostInfo from "../model/po/postInfo";
import {PostCondition} from "../model/condition/post-condition";
import {GroupInfo} from "../model/po/groupInfo";

@Injectable({
    providedIn: 'root'
})
export class PostRepository {

    constructor(private http: HttpClient) {
    }

    getPostPageList(condition: PostCondition): Observable<HttpResult<Page<PostInfo>>> {
        return this.http.post<HttpResult<Page<PostInfo>>>(environment.baseURL + '/v1/post/pages', condition)
    }

    updatePostStatus({id, archived, status}): Observable<HttpResult<PostInfo>> {
        return this.http.post<HttpResult<PostInfo>>(environment.baseURL + '/v1/post/changeStatus', {id, archived, status})
    }

    saveOrUpdatePost(postInfo: PostInfo): Observable<HttpResult<PostInfo>> {
        return this.http.post<HttpResult<PostInfo>>(environment.baseURL + '/v1/post/saveOrUpdatePost', postInfo)
    }

    getGroupOptions(): Observable<HttpResult<Array<GroupInfo>>> {
        return this.http.get<HttpResult<Array<GroupInfo>>>(environment.baseURL + '/v1/post/groupOptions')
    }
}

