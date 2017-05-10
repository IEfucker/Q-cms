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
import {TestService} from "./test.service"

import { DataListComponent } from './data-list/data-list.component';
import { QDetailComponent } from './q-detail/q-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TagComponent } from './tag/tag.component';
import { QListComponent } from './q-list/q-list.component';
import { TListComponent } from './t-list/t-list.component'

import { ListStateService } from "./list-state.service"

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    QDetailComponent,
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
    TestService
    // ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
