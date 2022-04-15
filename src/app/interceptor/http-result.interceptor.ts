import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable, OperatorFunction} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LocalStorageObServable} from '../observable/local-storage-observable';
import {Router} from '@angular/router';
import {ToastRepository} from "../repository/toast-repository";
import {SaveService} from "../service/save.service";


@Injectable()
export class HttpResultInterceptor implements HttpInterceptor {

    constructor(private storage: LocalStorageObServable,
                private saveService: SaveService,
                private toastRepository: ToastRepository,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let clone;
        //base url
        const baseUrl = request.url;
        //random url clear cache
        let url = baseUrl + (baseUrl.indexOf('?') > 0 ? '&' : '?') + 'random=' + new Date().getTime();
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            let headers = request.headers.set('access_token', accessToken);
            clone = {headers, url: url};
        } else {
            clone = {url: url};
        }
        request = request.clone(clone);
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //save flag
                    if (this.saveService.has(baseUrl)) {
                        this.saveService.delete(baseUrl);
                    }
                    return event;
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (this.saveService.has(baseUrl)) {
                    this.saveService.delete(baseUrl);
                }
                this.toastRepository.showDanger(error.statusText);
                throw error;
            })
        );
    }

    handleError(errorResponse: any): OperatorFunction<HttpEvent<any>, any> {
        throw errorResponse;
    }
}
