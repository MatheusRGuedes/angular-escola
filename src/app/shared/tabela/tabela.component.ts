import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/*
  Input é a entrada de dados/recursos que o componente disciplina fornece,
  Output é a saída de dados, onde é feito uma notificação ao componente disciplina pr determinada ação
  EventEmitter -> emite o evento com parâmetro do tipo any
*/

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})

export class TabelaComponent implements OnInit {

  @Input()
  public header :string[] = [];

  @Input()
  public props :string[] = [];

  @Input()
  public registros = <any>[];

  @Input()
  public editando :any = null;

  @Output()
  onEditar = new EventEmitter<any>();

  @Output()
  onExcluir = new EventEmitter<any>();

  public paginaAtual = 1; //ao carregar o componente, inicializa na página 1
  public qntddPorPag = 5; // cada pagina terá 5 itens
  
  constructor() { }

  ngOnInit(): void {
  }

  //esses eventos irão notificar o parent para invocar seus metodos 
  editar(obj :any) {
    this.onEditar.emit(obj);
  }
  excluir(obj :any) {
    this.onExcluir.emit(obj);
  }
}