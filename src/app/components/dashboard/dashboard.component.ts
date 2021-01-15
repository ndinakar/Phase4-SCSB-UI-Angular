import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { RolesPermissionsService } from 'src/app/services/rolesPermissions/roles-permissions.service';
import { SearchService } from 'src/app/services/search/search.service';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { urls } from 'src/config/urls';
@Component({
  selector: 'app-maindashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  baseUrl = urls.baseUrl;
  res: Object;
  constructor(private http: HttpClient,
    private router: Router, private rolesService: RolesPermissionsService, private loginService: LoginService, private searchService: SearchService
    ,private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.res = this.rolesService.getRes();
  }
  checkPermission(prefix) {
    this.searchService.checkPermission(prefix).subscribe(
      res => {
        if (!res.body == true) {
          this.router.navigate['/home'];
        }
      },
      (error)=>{
        
      }
    );
  }
}

