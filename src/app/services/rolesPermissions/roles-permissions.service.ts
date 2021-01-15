import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsService {
  rolesRes: Object;
  constructor() { }

  setRes(res): void {
    this.rolesRes = res;
  }
  getRes() {
    return this.rolesRes;
  }

}
