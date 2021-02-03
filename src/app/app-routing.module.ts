import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { BulkrequestComponent } from './components/bulkrequest/bulkrequest.component';
import { CollectionComponent } from './components/collection/collection.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataExportComponent } from './components/data-export/data-export.component';
import { HomeComponent } from './components/home/home.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoggingComponent } from './components/logging/logging.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { OpenMarcComponent } from './components/open-marc/open-marc.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RequestComponent } from './components/request/request.component';
import { RolesComponent } from './components/roles/roles.component';
import { SearchComponent } from './components/search/search.component';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'logout', component: HomeComponent },
  { path: 'error', component: ErrorPageComponent },
  {
    path: 'openMarcRecord', component: OpenMarcComponent
  },
  {
    path: '',
    component: DashboardComponent, // this is the component with the <router-outlet> in the template
    canActivate: [AuthGuard],
    children: [
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'collection',
        component: CollectionComponent,
      },
      {
        path: 'request/:barcode',
        component: RequestComponent,
      },
      {
        path: 'request',
        component: RequestComponent,
      },
      {
        path: 'bulkrequest',
        component: BulkrequestComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'roles',
        component: RolesComponent,
      },
      {
        path: 'userRoles',
        component: UserRolesComponent,
      },
      {
        path: 'jobs',
        component: JobsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'monitoring',
        component: MonitoringComponent,
      },
      {
        path: 'logging',
        component: LoggingComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'dataExport',
        component: DataExportComponent,
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false, enableTracing: false, initialNavigation: true, onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
