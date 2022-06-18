import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';

const routes: Routes = [
  {path: '', redirectTo: 'test', pathMatch: 'full'},
  {path: 'test', component: PruebaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
