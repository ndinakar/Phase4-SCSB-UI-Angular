import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  constructor(private httpClient: HttpClient) { }
  prefix = urls.dashBoard;
  checkPermission(prefix: string): Observable<boolean> {
    return this.httpClient.get<boolean>(prefix + "/checkPermission",
      appHeaders.httpOptions());
  }
  getVersionNumber(): Observable<string> {
    return this.httpClient.get<string>(this.prefix + "/getVersionNumberService",
      {
        headers: appHeaders.getHeaders()
      });
  }
}
