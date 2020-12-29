import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAdmin = true;
  isLogging = true;
  isMonitoring = true;
  isJobs = true;
  isUserRoles = true;
  isRoles = true;
  isReports = true;
  isBulkRequest = true;
  isRequest = true;
  isCollection = true;
  isSearch = true;
  constructor() {

  }

  ngOnInit(): void {

  }

}
