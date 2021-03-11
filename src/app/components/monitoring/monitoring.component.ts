import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MonitoringService } from 'src/app/services/monitoring/monitoring.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {
  data: TreeNode;
  scsbURL: string;
  dockerURL: string;
  awsURL: string;

  constructor(private monitoring: MonitoringService, public sanitizer: DomSanitizer, private dashBoard: DashboardComponent) { }

  ngOnInit(): void {
    this.dashBoard.validate_monitoring('monitoring');
    this.monitoring.pullData().subscribe(
      (res) => {
        this.data = res;
        this.scsbURL = this.data['scsbURL'];
        this.dockerURL = this.data['dockerURL'];
        this.awsURL = this.data['awsURL'];
      });
  }

}
