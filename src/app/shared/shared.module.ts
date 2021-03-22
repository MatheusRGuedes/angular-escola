import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './tabela/tabela.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    TabelaComponent, 
    AlertComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
