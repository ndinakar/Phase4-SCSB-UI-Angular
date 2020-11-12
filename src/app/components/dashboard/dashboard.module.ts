import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TreeTableModule } from 'primeng/treetable';
import { CollectionComponent } from '../collection/collection.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { OpenMarcComponent } from '../open-marc/open-marc.component';
import { SearchComponent } from '../search/search.component';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    CollectionComponent,
    OpenMarcComponent,
  ],
  imports: [
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
  exports: [
    DashboardComponent,
    SearchComponent,
    OpenMarcComponent,
  ],
  providers: []
})
export class DashboardModule { }
