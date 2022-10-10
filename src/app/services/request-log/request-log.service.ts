import { Injectable } from '@angular/core';
import {urls} from "@config/urls";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TreeNode} from "primeng/api";
import {appHeaders} from "@config/headers";

@Injectable({
  providedIn: 'root'
})
export class RequestLogService {
  constructor(private httpClient: HttpClient) { }
  PREFIX = urls.REQUEST_LOG;

  getAllRequests(postData): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/reports", postData,
        {
          headers: appHeaders.getHeaders()
        });
  }

    submitAllRequests(postData): Observable<TreeNode[]> {
        return this.httpClient.post<TreeNode[]>(this.PREFIX + "/submit", postData,
            {
                headers: appHeaders.getHeaders()
            });
    }
}
