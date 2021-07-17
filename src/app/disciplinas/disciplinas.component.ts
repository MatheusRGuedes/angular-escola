import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Disciplina } from '../shared/models/disciplina';
import { DisciplinasService } from './disciplinas.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/components/alert/alert.service';
import { HttpParams } from '@angular/common/http';

/**
 * ViewChild --> indica uma referência a um elemento no DOM
 * Subscription --> Gerencia cada recurso subscribe preso, ou seja, que aguarda receber notificação;
 *              --> Possui unsubscribe q fecha o recebimento de notificações (evita vazamento memoria);
 *              --> Quando o componte é destroído (removido do DOM), é fechado esse recurso;
 */

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {

  public header :string[] = [];
  public props :string[] = [];
  public disciplinas :Disciplina[] = [];

  nome: string = '';
  codigo :string = '';
  nomePesquisa :string = '';
  codigoPesquisa :string = '';
  editando :Disciplina = {id: 0,  codigo: '', nome: ''};
  disciplinaSubscription :Subscription = new Subscription();

  //@ViewChild(AlertComponent) alertChild :AlertComponent = new AlertComponent();

  //usará pr fazer injeção de dependencia e criar uma instância em disciplinaService
  constructor(private disciplinaService :DisciplinasService,
    private alertService :AlertService) { }

  ngOnInit(): void {
    this.atualizaLista();
    this.header = ['Código', 'Nome'];
    this.props = ['codigo', 'nome'];
  }

  ngOnDestroy(): void {
    console.log("DisciplinasComponent destroy!");
    this.disciplinaSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    //this.alertChild = new AlertComponent();
    //console.log(this.alertChild);
  }

  atualizaLista() {
    this.disciplinaSubscription = this.disciplinaService.todos().subscribe(
      disciplinas => this.disciplinas = disciplinas,
      () => {
        this.alertService.error('Erro ao carregar dados. Porfavor, tente mais tarde.');
      });
  }

  salvar() {
    this.disciplinaService.salvar(this.editando.id, this.nome, this.codigo)
    .subscribe(disciplinaSalva => {
        this.cancelar();
        this.alertService.success('Disciplina gravada com sucesso!');
        this.atualizaLista();
      },
      error => { //caso ocorrer um erro, executa essa func
        console.error(error); 
        this.alertService.error("Erro ao gravar, tente mais tarde.");
      }
    );
  }

  excluir(disciplina :any) {
    if (this.editando?.id != 0) {
      alert("Você não pode excluir uma disciplina em modo edição.");
    } else if ( confirm("Tem certeza que deseja remover a disciplina '"+ disciplina.nome +"' ?") ) {
      //delete nao retorna resultado, msm assim o subscribe é obrigatório pr executar a solicitação do delete
      this.disciplinaService.excluir(disciplina).subscribe(
        sussess => {
          this.alertService.success('Disciplina excluída com sucesso!');
          this.atualizaLista();
        },
        error => {
          this.alertService.error('Erro ao excluir, tente mais tarde.');
          console.log(error);
        }
      );
    }
  }

  editar(disciplina :any) {
    this.editando = disciplina;
    this.codigo = disciplina.codigo;
    this.nome = disciplina.nome;
  }

  pesquisar() {
    let searchParams = new HttpParams();

    if (this.nomePesquisa) searchParams = searchParams.append('nome', this.nomePesquisa);
    if (this.codigoPesquisa) searchParams = searchParams.append('codigo', this.codigoPesquisa);
    
    this.disciplinaService.encontrarPorNome(searchParams).subscribe(
      (disciplinas) => this.disciplinas = disciplinas,
      (error) => {
        this.alertService.error('Erro ao encontrar disciplinas. Tente mais tarde.');
        console.log(error);
      }
    )
  }

  cancelar() {
    this.codigo = '';
    this.nome = '';
    this.editando = {id: 0,  codigo: '', nome: ''};
  }
}