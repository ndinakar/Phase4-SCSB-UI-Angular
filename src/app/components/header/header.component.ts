import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appHeaders } from 'src/config/headers';
import { urls } from 'src/config/urls';
import { UserService } from '../../services/userName/user-name.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;
  constructor(private router: Router, private http: HttpClient,private userService: UserService) { }
 
  baseUrl = urls.baseUrl;

  ngOnInit(): void {
    this.userName=this.userService.getName();
  }
  logout() {
    const httpOptions = {
      headers: appHeaders.getHeaders(),
      withCredentials: true,
      observe: 'response' as 'response'
    };
    this.http.get(this.baseUrl+'/home/logout',httpOptions).subscribe((res)=>{
      if(res){
        this.router.navigate(['/home']);
      }
    });
  }

}
