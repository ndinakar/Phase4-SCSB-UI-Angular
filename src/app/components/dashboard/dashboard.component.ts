import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from 'src/app/services/dashBoard/dash-board.service';
import { RolesPermissionsService } from 'src/app/services/rolesPermissions/roles-permissions.service';
import { urls } from 'src/config/urls';
@Component({
  selector: 'app-maindashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  baseUrl = urls.baseUrl;
  res: Object;
  isAuthenticated = false;
  constructor(private http: HttpClient,
    private router: Router, private rolesService: RolesPermissionsService, private dashBoardService: DashBoardService) { }

  ngOnInit(): void {
    this.res = this.rolesService.getRes();
  }
  checkPermission(prefix) {
    this.dashBoardService.checkPermission(prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          this.router.navigate(['home']);
        }
      },
      (error) => {
        this.router.navigate(['home']);
      }
    );
  }
}

