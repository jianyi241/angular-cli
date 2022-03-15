import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, ObservableInput, OperatorFunction, throwError} from 'rxjs';
import {map, catchError, retry} from 'rxjs/operators';
import {LocalStorageObServable} from '../observable/local-storage-observable';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';


@Injectable()
export class HttpResultInterceptor implements HttpInterceptor {

    constructor(private storage: LocalStorageObServable, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = request.headers.set('Client-Id', environment.arcadeAuth.clientId);
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            headers = headers.set('Authorization', `Bearer ${accessToken}`);
        }
        request = request.clone({
            headers,
            url: request.url + (request.url.indexOf('?') > 0 ? '&' : '?') + 'random=' + new Date().getTime()
        });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body.statusCode === 401) {
                        this.storage.removeItem('accessToken');
                        this.storage.removeItem('UserInfo');
                        return;
                    }
                    console.log(event);
                    return event;
                }
                return event;

            }),
            catchError(this.handleError)
        );
    }

    handleError(errorResponse: any): OperatorFunction<HttpEvent<any>, any> {
        throw errorResponse;
    }
}
