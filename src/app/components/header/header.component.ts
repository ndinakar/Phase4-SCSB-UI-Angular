import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { urls } from '@config/urls';
import { environment } from 'src/environments/environment';
import { RolesPermissionsService } from '@service/rolesPermissions/roles-permissions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  LOGOUT = urls.LOGOUT;
  userName: string;
  userDesc: string;
  tempUserName: string;
  url: string = '';
  rolesRes: Object;
  constructor(private cookieService: CookieService,private rolesService: RolesPermissionsService) { }

  ngOnInit(): void {
    this.url = environment.homeUrl + this.LOGOUT + this.cookieService.get('CSRF-TOKEN');
    this.rolesRes = this.rolesService.getRes();
    this.tempUserName = this.cookieService.get('userName');
    if (this.tempUserName) {
      localStorage.setItem("userName", this.tempUserName);
      localStorage.setItem("userDesc", this.rolesRes['userDesc']);
      this.userName = localStorage.getItem("userName");
      this.userDesc = localStorage.getItem("userDesc");
    }
  }
}
