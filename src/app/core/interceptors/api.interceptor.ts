import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class HttpLoggingInterceptor implements HttpInterceptor {
  constructor(private notification: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log('HTTP Request:', req);

    return next.handle(req).pipe(
      tap((event) => console.log('HTTP Response:', event)),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        this.notification.showError(error.message);
        return throwError(() => error);
      }),
    );
  }
}
