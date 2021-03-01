import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from 'src/app/services/dashBoard/dash-board.service';
import { RolesPermissionsService } from 'src/app/services/rolesPermissions/roles-permissions.service';
@Component({
  selector: 'app-maindashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  res: Object;
  isAuthenticated = false;
  constructor(private router: Router, private rolesService: RolesPermissionsService, private dashBoardService: DashBoardService) { }

  ngOnInit(): void {
    this.res = this.rolesService.getRes();
  }
  checkPermission(prefix) {
    this.dashBoardService.checkPermission('http://localhost:9091' + '/' + prefix).subscribe(
      response => {
        this.isAuthenticated = response;
        if (this.isAuthenticated == false) {
          this.router.navigate(['home']);
        } else {
          this.reload();
        }
      },
      error => {
        this.router.navigate(['home']);
      }
    );
  }
  reload() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

