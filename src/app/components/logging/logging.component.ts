import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TreeNode } from 'primeng/api';
import { DashBoardService } from 'src/app/services/dashBoard/dash-board.service';
import { MonitoringService } from 'src/app/services/monitoring/monitoring.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  data: TreeNode;
  loggingURL: string;
  embedLogURL: string;

  constructor(private monitoring: MonitoringService, public sanitizer: DomSanitizer, private dashBoardService: DashBoardService) { }

  ngOnInit(): void {
    this.dashBoardService.validate_logging('monitoring');
    this.monitoring.pullData().subscribe(
      (res) => {
        this.data = res;
        this.loggingURL = this.data['loggingURL'];
        this.embedLogURL = this.data['embedLogURL'];
      });
  }

}
