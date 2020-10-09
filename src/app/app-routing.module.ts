import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { CollectionComponent } from './components/collection/collection.component';
import { RequestComponent } from './components/request/request.component';
import { BulkrequestComponent } from './components/bulkrequest/bulkrequest.component';
const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'logout', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'search', // child route path
        component: SearchComponent, // child route component that the router renders
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
      }
      
    ]
    },
  // { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
