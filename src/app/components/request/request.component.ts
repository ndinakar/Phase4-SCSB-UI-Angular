import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor() { }
  searchBar = false;
  create_request = true;
  ngOnInit(): void {
  }
  loadSearchRequest() {
    this.searchBar = !this.searchBar;
    this.create_request = !this.create_request;
    console.log("test"+this.create_request+" bar"+this.searchBar)
  }
  loadCreateRequest() {
    this.searchBar = !this.searchBar;
    this.create_request = !this.create_request;
  }
  createRequest() { }
}
