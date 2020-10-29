import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams,HttpHandler } from '@angular/common/http';
import { RolesComponent } from './roles.component';
declare var $: any;
fdescribe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesComponent ],
      providers:[HttpClient,HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Testing Fields', () => {
    expect(component.rolesVal).toBeUndefined();
    expect(component.roleName).toBeUndefined();
    component.resetFields();
    component.searchRoles();
    //expect().toHaveBeenCalled();
    component.pageNumber=2;
    component.rolesVal=[];
    component.roleName= "test";
    component.permissionName = "test";
    component.setPostData('searchRole');
    component.permissionNameId="Test";
    component.deletePermissionNameId = ["test"];
    component.setPostData('createRole');
    component.setPostData('firstCall');
    component.setPostData('lastCall');
    component.setPostData('previousCall');
    component.setPostData('nextCall');
    component.setPostData('deleteRole');
    component.setPostData('pageSize');
    //component.pagination();
    component.saveEditedRole(1,'test','test','test');
    component.editRole(1,'test','test','test');
    component.deleteRole(1,'test','test','test');
    component.createRole();
    component.pageNumber=2;
    component.rolesVal=[];
    component.pagination();
  });
});
