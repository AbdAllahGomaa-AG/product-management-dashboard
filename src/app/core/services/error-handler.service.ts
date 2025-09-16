import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: any) {
    console.error('App Error:', error);
    alert('An error occurred: ' + error.message);
  }
}
