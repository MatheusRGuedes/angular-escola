import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//Responsáveis pela paginação
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';

@NgModule({
  declarations: [
    AppComponent,
    DisciplinasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
