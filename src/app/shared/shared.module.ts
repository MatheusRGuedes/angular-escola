import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
//Components
import { TabelaComponent } from './components/tabela/tabela.component';
import { AlertComponent } from './components/alert/alert.component';
//Pipes
import { TypeofPipe } from './pipes/typeof.pipe';

@NgModule({
  declarations: [
    TabelaComponent, 
    AlertComponent, 
    TypeofPipe
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forChild()
  ]
})
export class SharedModule { }
