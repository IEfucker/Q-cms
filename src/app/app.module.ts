import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { ButtonModule, DataTableModule, MenubarModule, InputTextModule, InputTextareaModule, MultiSelectModule, ConfirmDialogModule } from 'primeng/primeng';
// import { ConfirmationService } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { QuestionService } from "./question.service";
import { TagService } from "./tag.service"

import { DataListComponent } from './data-list/data-list.component';
import { DataDetailComponent } from './data-detail/data-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TagComponent } from './tag/tag.component';
import { QListComponent } from './q-list/q-list.component';
import { TListComponent } from './t-list/t-list.component'

import { ListStateService } from "./list-state.service"

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    DataDetailComponent,
    PageNotFoundComponent,
    TagComponent,
    QListComponent,
    TListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ButtonModule,
    DataTableModule,
    MenubarModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    // ConfirmDialogModule
  ],
  providers: [
    QuestionService,
    TagService,
    ListStateService,
    // ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
