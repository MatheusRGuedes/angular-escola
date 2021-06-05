import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './tabela/tabela.component';
import { AlertComponent } from './alert/alert.component';
import { TypeofPipe } from './pipes/typeof.pipe';

@NgModule({
  declarations: [
    TabelaComponent, 
    AlertComponent, 
    TypeofPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
