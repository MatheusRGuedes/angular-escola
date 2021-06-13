import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Disciplina } from '../shared/models/disciplina.model';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { DisciplinasService } from './disciplinas.service';

/**
 * ViewChild --> indica uma referência a um elemento no DOM
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
  descricao :string = '';
  nomePesquisa :string = '';
  editando :Disciplina = {id: 0, nome: '', descricao: ''};
  //erroSalvar :boolean | null = null;

  @ViewChild(AlertComponent) alertChild :AlertComponent | null = null;
  //tipoAlerta :string = '';
  //msgAlert : string = '';

  //usará pr fazer injeção de dependencia e criar uma instância em disciplinaService
  constructor(private disciplinaService :DisciplinasService) { }

  ngOnInit(): void {
    this.atualizaLista();
    this.header = ['Nome', 'Descrição'];
    this.props = ['nome', 'descricao'];
  }

  ngAfterViewInit() {
    this.alertChild = new AlertComponent();
    //console.log(this.alertChild);
  }

  atualizaLista() {
    this.disciplinaService.todos().subscribe(disciplinas => this.disciplinas = disciplinas,
      () => {
        this.alertChild!.openAlert('danger', 'Ops! Erro ao carregar dados. Porfavor, tente novamente mais tarde.');
      });
  }

  salvar() {
    this.disciplinaService.salvar(this.editando.id, this.nome, this.descricao)
    .subscribe(disciplinaSalva => {
        this.cancelar();
        this.alertChild!.openAlert('success', "Disciplina gravada com sucesso!");
        this.atualizaLista();
      },
      error => { //caso ocorrer um erro, executa essa func
        console.error(error); 
        this.alertChild!.openAlert('danger', "Erro ao gravar, tente novamente.");
      }
    );
  }

  excluir(disciplina :any) {
    if (this.editando?.id != 0) {
      alert("Você não pode excluir uma disciplina em modo edição.");
    } else if ( confirm("Tem certeza que quer remover a disciplina '"+ disciplina.nome +"' ?") ) {
      //delete nao retorna resultado, msm assim o subscribe é obrigatório pr executar a solicitação do delete
      this.disciplinaService.excluir(disciplina).subscribe(
        sussess => {
          this.alertChild!.openAlert('success', "Disciplina excluída com sucesso!");
          this.atualizaLista();
        },
        error => {
          this.alertChild!.openAlert('danger', "Erro ao excluir, tente novamente.");
          console.log(error);
        }
      );
    }
  }

  editar(disciplina :any) {
    this.editando = disciplina;
    this.nome = disciplina.nome;
    this.descricao = disciplina.descricao;
  }

  pesquisar() {
    if (this.nomePesquisa.trim() != "") {
      this.disciplinaService.encontrarPorNome(this.nomePesquisa).subscribe(
        (disciplinas) => this.disciplinas = disciplinas,
        (error) => {
          this.alertChild?.openAlert('danger', 'Não foi possível encontrar disciplinas.');
        }
      )
    } else {
      this.atualizaLista();
    }
  }

  cancelar() {
    this.nome = '';
    this.descricao = '';
    this.editando = {id: 0, nome: '', descricao: ''};
  }

  //nao consegui acessar o elemento alerta do filho nessa classe, por isso deixei os métodos no AlertComponent
}