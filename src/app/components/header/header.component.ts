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
  userName: string;
  username: string;
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {
    this.username = this.userName;
  }

  baseUrl = urls.baseUrl;
  api = urls.api;

  ngOnInit(): void {
    this.userName = this.cookieService.get('userName');
  }

  logout() {
    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true,
      observe: 'response' as 'response'
    };
    this.http.get(this.baseUrl + this.api + '/logout', httpOptions).subscribe((res) => {
      if (res) {
        this.cookieService.deleteAll();
        sessionStorage.clear();
        localStorage.setItem('casUrlStatus', 'false');
        this.router.navigate(['home']);
      }
    });
  }

}
