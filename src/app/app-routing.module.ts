import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataListComponent } from './data-list/data-list.component'
import { DataDetailComponent } from './data-detail/data-detail.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'


const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: DataListComponent },
    { path: "q", component: DataDetailComponent },
    { path: "q/:id", component: DataDetailComponent },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }