import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { TreeNode } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { OpenMarcService } from 'src/app/services/openMarc/open-marc.service';

@Component({
  selector: 'app-open-marc',
  templateUrl: './open-marc.component.html',
  styleUrls: ['./open-marc.component.css']
})
export class OpenMarcComponent implements OnInit {
  bibliographicMarcForm: TreeNode[];
  errorMessageDiv = false;
  successMessageDiv = false;
  public id;
  constructor(private openMarcService: OpenMarcService, private spinner: NgxSpinnerService,private routeParams: ActivatedRoute,private titleService:Title) { }

  ngOnInit(): void {
    this.spinner.show();
    this.titleService.setTitle('Marc Record');
    this.routeParams.queryParams.subscribe(params => {
      this.id = parseInt(params['bibId']);
    });
    this.openMarcService.openMarc(this.id).subscribe(
      (res) => {
        this.bibliographicMarcForm = res;
        if(this.bibliographicMarcForm['errorMessage'] !=null){
          this.errorMessageDiv = true;
          this.successMessageDiv = false;
        }else{
          this.errorMessageDiv = false;
          this.successMessageDiv = true;
        }
        this.spinner.hide();
      },
      (error)=>{
        this.spinner.hide();
        console.log(error);
      }
    );
  }
// openMarc(id){
//   this.openMarcService.openMarc(id).subscribe(
//     (res) => {
      
//       this.bibliographicMarcForm = res;
//       if(this.bibliographicMarcForm['errorMessage'] !=null){
//         this.errorMessageDiv = true;
//         this.successMessageDiv = false;
//       }else{
//         this.errorMessageDiv = false;
//         this.successMessageDiv = true;
//       }
//     }
//   );
// }
}
