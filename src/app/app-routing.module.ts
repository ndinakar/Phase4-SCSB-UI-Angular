import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BulkrequestComponent } from './components/bulkrequest/bulkrequest.component';
import { CollectionComponent } from './components/collection/collection.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'logout', component: HomeComponent },
  { path: 'openMarcRecord', component: OpenMarcComponent,
  canActivate: [ AuthGuard ], },
  {
    path: '',
    component: DashboardComponent, // this is the component with the <router-outlet> in the template
    
    children: [
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'collection',
        component: CollectionComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'request/:barcode',
        component: RequestComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'request',
        component: RequestComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'bulkrequest',
        component: BulkrequestComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'userRoles',
        component: UserRolesComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'jobs',
        component: JobsComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'monitoring',
        component: MonitoringComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'logging',
        component: LoggingComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [ AuthGuard ],
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
