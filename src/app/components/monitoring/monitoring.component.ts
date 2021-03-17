import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TreeNode } from 'primeng/api';
import { DashBoardService } from 'src/app/services/dashBoard/dash-board.service';
import { MonitoringService } from 'src/app/services/monitoring/monitoring.service';

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

  constructor(private monitoring: MonitoringService, public sanitizer: DomSanitizer, private dashBoardService: DashBoardService) { }

  ngOnInit(): void {
    this.dashBoardService.validate_monitoring('monitoring');
    this.monitoring.pullData().subscribe(
      (res) => {
        this.data = res;
        this.scsbURL = this.data['scsbURL'];
        this.dockerURL = this.data['dockerURL'];
        this.awsURL = this.data['awsURL'];
      });
  }

}
