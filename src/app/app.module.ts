import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppConfig } from 'src/config/app.config.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BulkrequestComponent } from './components/bulkrequest/bulkrequest.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { HomeComponent } from './components/home/home.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoggingComponent } from './components/logging/logging.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RequestComponent } from './components/request/request.component';
import { RolesComponent } from './components/roles/roles.component';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';


export function appInit(appConfig: AppConfig) {
  return () => appConfig.load();
}
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    RequestComponent,
    BulkrequestComponent,
    ReportsComponent,
    RolesComponent,
    UserRolesComponent,
    JobsComponent,
    MonitoringComponent,
    LoggingComponent,
    AdminComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardModule,
    NgSelectModule,
    NgxSpinnerModule
  ],
  providers: [AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppConfig]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
