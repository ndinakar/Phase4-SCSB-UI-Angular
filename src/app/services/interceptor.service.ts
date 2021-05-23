import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DashBoardService } from './dashBoard/dash-board.service';
@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    constructor(private dashBoardService : DashBoardService) { }
    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
            const authReq = req.clone({
                headers: req.headers
                    .set('api_path', 'search')
            });
        return next.handle(authReq)
            .pipe(
                tap(evt => {
                    if (evt instanceof HttpResponse) {
                        this.dashBoardService.validateUser(evt);
                    }
                }),
                catchError(this.handleError)
            )
    };
}