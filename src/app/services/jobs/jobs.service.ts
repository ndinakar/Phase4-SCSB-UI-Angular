import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { ScheduleJobsForm } from 'src/app/model/ScheduleJobsForm';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private httpClient: HttpClient) { }
  baseUrl = urls.baseUrl;
  prefix = urls.jobs;
  httpOptions(){
    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true
    };
    return httpOptions;
  }
  displayJobs(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/jobs",this.httpOptions());
  }
  scheduleJobs(postData: ScheduleJobsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/jobs", postData,this.httpOptions());
  }
}
