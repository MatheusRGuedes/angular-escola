import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//usada para navegação entre as páginas do projeto 
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
