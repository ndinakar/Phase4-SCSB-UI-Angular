import { Injectable, OnInit } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AppConfig implements OnInit {
  path: string;
  properties: TreeNode[];
  ngOnInit(): void {}
  load() {
    var data = require('src/assets/external.properties.json');
    this.properties = data;
    this.path = this.properties['path'];
  }
  public getProperty() {
    return this.properties['path'];
  }
}