import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const started = Date.now();

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(
            `✅ Request for ${req.urlWithParams} took ${elapsed} ms.`,
          );
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const elapsed = Date.now() - started;
        console.error(
          `❌ Request for ${req.urlWithParams} failed after ${elapsed} ms.`,
        );

        let errorMsg = 'An unexpected error occurred.';
        if (error.error?.message) {
          errorMsg = error.error.message;
        } else if (error.status === 0) {
          errorMsg = 'Cannot connect to server. Please try again later.';
        } else if (error.status >= 500) {
          errorMsg = 'Server error, please try again later.';
        } else if (error.status === 404) {
          errorMsg = 'Resource not found.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMsg,
          confirmButtonColor: '#d33',
        });

        return throwError(() => error);
      }),
    );
  }
}
