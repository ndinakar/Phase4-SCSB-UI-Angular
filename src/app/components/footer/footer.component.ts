import { Component, OnInit } from '@angular/core';
import { DashBoardService } from '@service/dashBoard/dash-board.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private dashBoardService: DashBoardService) { }
  versionNumber: string;
  ngOnInit(): void {
    this.dashBoardService.getVersionNumber().subscribe(
      res => {
        this.versionNumber = res['versionNumber'];
      },
      (error) => {
        this.dashBoardService.errorNavigation();
      });
  }
}
