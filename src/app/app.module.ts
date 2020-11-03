import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select'; 

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';
import { BulkrequestComponent } from './components/bulkrequest/bulkrequest.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RolesComponent } from './components/roles/roles.component';
import { AppConfig } from 'src/config/app.config.service';
import { APP_INITIALIZER } from '@angular/core';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { LoggingComponent } from './components/logging/logging.component';
import { NgxSpinnerModule } from "ngx-spinner";

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
  providers: [ AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppConfig]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
