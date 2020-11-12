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

  displayJobs(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.baseUrl + this.prefix + "/jobs",
      {
        headers: appHeaders.getHeaders()
      });
  }
  scheduleJobs(postData: ScheduleJobsForm): Observable<TreeNode[]> {
    console.log(postData.cronExpression);
    return this.httpClient.post<TreeNode[]>(this.baseUrl + this.prefix + "/jobs", postData,
      {
        headers: appHeaders.getHeaders()
      });
  }
}
