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
  baseUrl = urls.baseUrl;
  prefix = urls.dashBoard;
  checkPermission(prefix: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + this.prefix + "/checkPermission",
      appHeaders.httpOptions());
  }
  getVersionNumber(): Observable<string> {
    return this.httpClient.get<string>(this.baseUrl + this.prefix + "/getVersionNumberService",
      appHeaders.httpOptions());
  }
}
