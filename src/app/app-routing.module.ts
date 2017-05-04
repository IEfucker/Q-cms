import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataListComponent } from './data-list/data-list.component'
import { QDetailComponent } from './q-detail/q-detail.component'
import { TagComponent } from './tag/tag.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

import { QListComponent } from "./q-list/q-list.component"
import { TListComponent } from "./t-list/t-list.component"


const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    {
        path: 'list',
        component: DataListComponent,
        children: [
            // {path: '', redirectTo: '/list/q', pathMatch: 'full'},
            { path: "q", component: QListComponent, outlet: "list" },
            { path: "t", component: TListComponent, outlet: "list" }
        ]
    },
    { path: "q", component: QDetailComponent },
    { path: "q/:id", component: QDetailComponent },
    { path: "tags", component: TagComponent },
    { path: "**", component: PageNotFoundComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }