import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  AdminPanelDiv = true;
  messsage: string;
  choosenFile: string='';
  onBoardFile: boolean;
  constructor(private adminService: AdminService) { }
  fileToUpload: File = null;
  ngOnInit(): void {
  }
  handleFileInput(files: FileList) {
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
        this.messsage = res;
      }, error => {
        console.log(error);
      });
    }
  }
  validateUploadFile(){
    if ((this.choosenFile == undefined || this.choosenFile == '')) {
      this.onBoardFile = true;
    } else {
      this.onBoardFile = false;
    }
  }
}
