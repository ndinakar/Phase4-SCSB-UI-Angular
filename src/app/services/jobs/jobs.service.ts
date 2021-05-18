import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { ScheduleJobsForm } from '@model/ScheduleJobsForm';
import { appHeaders } from '@config/headers';
import { urls } from '@config/urls';
@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private httpClient: HttpClient) { }
  PREFIX = urls.JOBS;
  httpOptions() {
    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true
    };
    return httpOptions;
  }
  displayJobs(): Observable<TreeNode[]> {
    return this.httpClient.get<TreeNode[]>(this.PREFIX + "/jobs", this.httpOptions());
  }
  scheduleJobs(postData: ScheduleJobsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/jobs", postData, this.httpOptions());
  }
  getJobParameters(postData: ScheduleJobsForm): Observable<TreeNode[]> {
    return this.httpClient.post<TreeNode[]>(this.PREFIX + "/job-parameters", postData, this.httpOptions());
  }
  getInstitutions(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.PREFIX + "/get-institutions", this.httpOptions());
  }
}
