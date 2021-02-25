import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { ReportsForm } from 'src/app/model/ReportsForm';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  constructor(private httpClient: HttpClient) { }
  prefix = urls.MONITORING;

  pullData(): Observable<any> {
    return this.httpClient.get<any>(this.prefix + "/properties",
      {
        headers: appHeaders.getHeaders()
      });
  }
}
