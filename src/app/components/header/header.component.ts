import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  LOGOUT = urls.LOGOUT;
  userName: string;
  url: string = '';
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.url = environment.homeUrl + this.LOGOUT + this.cookieService.get('CSRF-TOKEN');
    this.userName = this.cookieService.get('userName');
  }
}
