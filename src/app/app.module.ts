import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { ButtonModule, DataTableModule, MenubarModule, InputTextModule, InputTextareaModule, MultiSelectModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { QuestionService } from "./question.service";
import { TagService } from "./tag.service"

import { DataListComponent } from './data-list/data-list.component';
import { DataDetailComponent } from './data-detail/data-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    DataDetailComponent,
    PageNotFoundComponent
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
    MultiSelectModule
  ],
  providers: [
    QuestionService,
    TagService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
