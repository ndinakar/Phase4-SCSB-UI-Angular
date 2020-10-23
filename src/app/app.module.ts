import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';
import { BulkrequestComponent } from './components/bulkrequest/bulkrequest.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RolesComponent } from './components/roles/roles.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    RequestComponent,
    BulkrequestComponent,
    ReportsComponent,
    RolesComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
