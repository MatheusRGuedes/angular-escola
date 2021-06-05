import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';

//Responsável pela paginação
import { NgxPaginationModule } from 'ngx-pagination';

//Componentes
import { AppComponent } from './app.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { TabelaComponent } from './shared/tabela/tabela.component';
import { AlertComponent } from './shared/alert/alert.component';
import { HomeComponent } from './home/home.component';
import { ProfessoresComponent } from './professores/professores.component';

//Serviços
import { DisciplinasService } from './disciplinas/disciplinas.service';
import { ProfessorService } from './professores/professor.service';

//Pipes
import { TypeofPipe } from './shared/pipes/typeof.pipe'

/*
  providers --> informa pr os demais componentes do módulo App, q os serviços estão disponiveis para o uso
*/

@NgModule({
  declarations: [
    AppComponent,
    DisciplinasComponent,
    TabelaComponent,
    AlertComponent,
    HomeComponent,
    ProfessoresComponent,
    TypeofPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DisciplinasService, ProfessorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
