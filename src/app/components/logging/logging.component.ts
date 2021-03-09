import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MonitoringService } from 'src/app/services/monitoring/monitoring.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  data: TreeNode;
  loggingURL: string;
  embedLogURL: string;

  constructor(private monitoring: MonitoringService, public sanitizer: DomSanitizer, private dashBoard: DashboardComponent) { }

  ngOnInit(): void {
    this.dashBoard.validate_logging('monitoring');
    this.monitoring.pullData().subscribe(
      (res) => {
        this.data = res;
        this.loggingURL = this.data['loggingURL'];
        this.embedLogURL = this.data['embedLogURL'];
      });
  }

}
