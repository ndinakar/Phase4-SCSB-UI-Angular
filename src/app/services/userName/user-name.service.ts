import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userName: string;
  constructor() { }
  saveName(name) {
    this.userName = name;
  }
  getName() {
    return this.userName;
  }
}
