import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  AdminPanelDiv = true;
  IMSLocationDiv = true;
  enableOnBoardDiv: boolean = false;
  enableIMSLocationDiv : boolean = false;
  uploadRes: TreeNode [];
  resIMS: TreeNode [];
  errorMessageDiv = false;
  choosenFile: string = '';
  onBoardFile: boolean;
  successMessageDiv = false;
  onBoardStatusDiv = false;
  onBoardIMSStatusDiv = false;
  fileToUpload: File = null;
  constructor(private adminService: AdminService) { }
  ngOnInit(): void {

  }
  handleFileInput(files: FileList) {
    this.fileToUpload = null;
    this.choosenFile = '';
    this.fileToUpload = files.item(0);
    this.choosenFile = this.fileToUpload.name;
    this.validateUploadFile();
  }
  uploadFileToActivity() {
    if ((this.choosenFile == undefined || this.choosenFile == '')) {
      this.onBoardFile = true;
    } else {
      this.onBoardFile = false;
      this.adminService.upload(this.fileToUpload).subscribe(
        res => {
          this.uploadRes = res;
          this.onBoardStatusDiv = true;
          //this.successMessageDiv = true;
          //this.errorMessageDiv = true;
          this.choosenFile='';
        }, error => {
        });
    }
  }
  uploadIMSFIle(){
    if ((this.choosenFile == undefined || this.choosenFile == '')) {
      this.onBoardFile = true;
    } else {
      this.onBoardFile = false;
      this.adminService.uploadIMSLocations(this.fileToUpload).subscribe(
        res => {
          this.resIMS = res;
          this.onBoardIMSStatusDiv = true;
          //this.successMessageDiv = true;
          //this.errorMessageDiv = true;
          this.choosenFile='';
        }, error => {
        });
    }
  }
  validateUploadFile() {
    if ((this.choosenFile == undefined || this.choosenFile == '')) {
      this.onBoardFile = true;
    } else {
      this.onBoardFile = false;
    }
  }
  enableOnBoardDivs(){
    this.onBoardStatusDiv = false;
  }
  enableOnBoardIMSDivs(){
    this.onBoardIMSStatusDiv = false;
  }
}
