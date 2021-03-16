import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';

//Responsável pela paginação
import { NgxPaginationModule } from 'ngx-pagination';

//Componentes
import { AppComponent } from './app.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { TabelaComponent } from './shared/tabela/tabela.component';

//Serviços
import { DisciplinasService } from './disciplinas/disciplinas.service';

/*
  providers --> informa pr os demais componentes do módulo App, q os serviços estão disponiveis para o uso
*/

@NgModule({
  declarations: [
    AppComponent,
    DisciplinasComponent,
    TabelaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [DisciplinasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
