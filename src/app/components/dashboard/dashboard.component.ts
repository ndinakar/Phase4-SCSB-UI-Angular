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
  constructor(private router: Router, private rolesService: RolesPermissionsService) { }

  ngOnInit(): void {
    this.res = this.rolesService.getRes();
  }
  reload() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

