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
import {Constants} from "../model/constants";
import {NgxLoadingSpinnerService} from "@k-adam/ngx-loading-spinner";
import {ConfigService} from "../service/config.service";
import {ReviewService} from "../service/review.service";


@Injectable()
export class HttpResultInterceptor implements HttpInterceptor {

    constructor(private storage: LocalStorageObServable,
                private saveService: SaveService,
                private configService: ConfigService,
                private toastRepository: ToastRepository,
                private reviewService: ReviewService,
                private ngxLoadingSpinnerService: NgxLoadingSpinnerService,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let clone;
        //base url
        const baseUrl = request.url;
        //random url clear cache
        let url = baseUrl + (baseUrl.indexOf('?') > 0 ? '&' : '?') + 'random=' + new Date().getTime();
        const accessToken = localStorage.getItem(Constants.ACCESS_TOKEN);
        if (accessToken) {
            let headers = request.headers.set(Constants.ACCESS_TOKEN, accessToken);
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
                    //authentication code check
                    if (event.body.statusCode == 401) {
                        this.toastRepository.showDanger(event.body.msg);
                        this.router.navigateByUrl('/login');
                        return;
                    }
                    //authorization code check
                    if (event.body.statusCode == 403) {
                        this.toastRepository.showDanger(event.body.msg);
                        this.router.navigateByUrl('/login');
                        return;
                    }
                    return event;
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (this.saveService.has(baseUrl)) {
                    this.saveService.delete(baseUrl);
                }
                this.ngxLoadingSpinnerService.hide();
                this.configService.platformLoading = false
                this.reviewService.hideLoading()
                this.toastRepository.showDanger(error.statusText);
                throw error;
            })
        );
    }

    handleError(errorResponse: any): OperatorFunction<HttpEvent<any>, any> {
        throw errorResponse;
    }
}
