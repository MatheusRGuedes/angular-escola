import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';

//Componentes
import { AppComponent } from './app.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { TabelaComponent } from './shared/components/tabela/tabela.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { HomeComponent } from './home/home.component';
import { ProfessoresComponent } from './professores/professores.component';

//Serviços
import { DisciplinasService } from './disciplinas/disciplinas.service';
import { ProfessorService } from './professores/professor.service';

//Pipes
import { TypeofPipe } from './shared/pipes/typeof.pipe';

/**seta a localização da aplicação -- PESQUISAR*/
import { LOCALE_ID } from '@angular/core'; 
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

/*
  providers --> informa pr os demais componentes do módulo App, q os serviços estão disponiveis para o uso
  forRoot   --> Permite carregar um módulo de maneira rápida, qnd o aplicativo é iniciado. Permite acessar
                o provedor d qualquer ponto do aplicativo, q n seja carregado lentamente.
  forChild  --> Usado pra carregar o provedor no módulos filhos, de maneira lenta (sob demanda), contrário
                do forRoot. No final, o provedor virá dele.
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
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    DisciplinasService, 
    ProfessorService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
