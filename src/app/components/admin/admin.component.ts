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
  error: TreeNode;
  message: string;
  errorMessageDiv = false;
  choosenFile: string = '';
  onBoardFile: boolean;
  successMessageDiv = false;
  fileToUpload: File = null;
  constructor(private adminService: AdminService) { }
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
          this.message = res;
          this.successMessageDiv = true;
          this.errorMessageDiv = true;
          this.choosenFile='';
          console.log(res);
        }, error => {
          console.log(error);
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
}
