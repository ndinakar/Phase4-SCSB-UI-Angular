import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';

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
  homeUrl = environment.homeUrl;

  ngOnInit(): void {
    this.userName = this.cookieService.get('userName');
  }

  logout() {
    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true,
      observe: 'response' as 'response'
    };
    this.http.get(this.baseUrl + '/api/logout', httpOptions).subscribe((res) => {
      if (res) {
        this.cookieService.deleteAll();
        sessionStorage.clear()
        this.router.navigate(['home']);
      }
    });
  }

}
