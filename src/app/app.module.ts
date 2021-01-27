import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { CookieService } from 'ngx-cookie-service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { NgxSpinnerModule } from "ngx-spinner";
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TreeTableModule } from 'primeng/treetable';
import { AppConfig } from 'src/config/app.config.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { BulkrequestComponent } from './components/bulkrequest/bulkrequest.component';
import { CollectionComponent } from './components/collection/collection.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataExportComponent } from './components/data-export/data-export.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoggingComponent } from './components/logging/logging.component';
import { LoginComponent } from './components/login/login.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { OpenMarcComponent } from './components/open-marc/open-marc.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RequestComponent } from './components/request/request.component';
import { RolesComponent } from './components/roles/roles.component';
import { SearchComponent } from './components/search/search.component';
import { UserRolesComponent } from './components/user-roles/user-roles.component';

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
    DataExportComponent,
    DashboardComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    CollectionComponent,
    OpenMarcComponent
  ],
  imports: [
    LoggerModule.forRoot({ level: NgxLoggerLevel.TRACE }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxSpinnerModule,
    CommonModule,
    TreeTableModule,
    BrowserAnimationsModule,
    TableModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    ContextMenuModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AppConfig, CookieService, AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [AppConfig]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
