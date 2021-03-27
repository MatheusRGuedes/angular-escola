import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { HomeComponent } from './home/home.component';

/*
  Arquivo do nível do topo

  appRoutes            --> Objeto do tipo routes que vai armazenas objtetos contendo todas as rotas disponíveis;
  RouterModule.forRoot --> irá configurar o mudulo e disponibilizar as rotas
                       --> Qnd o softaware é executado, o angular busca uma combinação da URL no browser com as rotas definidas(de
                           cima para baixo), chamando o shell component (appComponent);
*/

//usada para navegação entre as páginas do projeto 
const appRoutes : Routes = [
  { path: 'disciplinas', component: DisciplinasComponent },
  { path: '', component: HomeComponent},

  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
