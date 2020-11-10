import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollectionComponent } from '../collection/collection.component';
import { DashboardComponent } from './dashboard.component';
import { OpenMarcComponent } from '../open-marc/open-marc.component';
import { SearchComponent } from '../search/search.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


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
