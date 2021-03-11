import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashBoardService } from 'src/app/services/dashBoard/dash-board.service';
import { urls } from 'src/config/urls';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  email: string;
  descEmail: string
  url: string;

  constructor(private router: Router, private dashBoardService: DashBoardService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.url = environment.homeUrl + '/logout';
    this.dashBoardService.getEmail().subscribe(
      res => {
        this.email = res['email'];
        this.descEmail = 'mailto:' + this.email;
      },
      (error) => { }
    );
    localStorage.clear();
    this.cookieService.deleteAll()
  }
}
