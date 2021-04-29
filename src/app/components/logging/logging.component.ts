import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DashBoardService } from '@service/dashBoard/dash-board.service';
import { MonitoringService } from '@service/monitoring/monitoring.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {
  constructor(private monitoring: MonitoringService, public sanitizer: DomSanitizer, private dashBoardService: DashBoardService) { }
  data: TreeNode;
  loggingURL: string;
  embedLogURL: string;
  ngOnInit(): void {
    this.dashBoardService.validate_logging('monitoring');
    this.monitoring.pullData().subscribe(
      (res) => {
        this.data = res;
        this.loggingURL = this.data['loggingURL'];
        this.embedLogURL = this.data['embedLogURL'];
      },
      (error) => {
        this.dashBoardService.errorNavigation();
      });
  }
}
