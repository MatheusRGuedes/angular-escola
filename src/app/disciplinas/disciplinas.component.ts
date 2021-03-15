import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../disciplina.model';
import { DisciplinasService } from './disciplinas.service';

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
  editando :Disciplina = {id: 0, nome: '', descricao: ''};
  erroSalvar :boolean | null = null;

  //usará pr fazer injeção de dependencia e criar uma instância em disciplinaService
  constructor(private disciplinaService :DisciplinasService) { }

  ngOnInit(): void {   
    this.atualizaLista();
    this.header = ['Nome', 'Descrição'];
    this.props = ['nome', 'descricao'];
  }

  atualizaLista() {
    this.disciplinaService.todos().subscribe(disciplinas => this.disciplinas = disciplinas);
  }

  salvar() {
    this.disciplinaService.salvar(this.editando.id, this.nome, this.descricao)
    .subscribe(disciplinaSalva => {
        this.cancelar();
        this.erroSalvar = false;
        this.atualizaLista();
      },
      error => { //caso ocorrer um erro, executa essa func
        console.error(error); 
        this.erroSalvar = true;
      }
    );
  }

  closeAlert() {this.erroSalvar = null;}

  excluir(disciplina :any) {
    if (this.editando?.id != 0) {
      alert("Você não pode excluir uma disciplina em modo edição.");
    } else if ( confirm("Tem certeza que quer remover a disciplina '"+ disciplina.nome +"' ?") ) {
      //delete nao retorna resultado, msm assim o subscribe é obrigatório pr executar a solicitação do delete
      this.disciplinaService.excluir(disciplina).subscribe(
        sussess => {
          this.erroSalvar = false;
          this.atualizaLista();
        },
        error => {
          this.erroSalvar = true;
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

  cancelar() {
    this.nome = '';
    this.descricao = '';
    this.editando = {id: 0, nome: '', descricao: ''};
  }
}