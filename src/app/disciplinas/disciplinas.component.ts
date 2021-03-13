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
    this.disciplinas = this.disciplinaService.todos();
    this.header = ['Nome', 'Descrição'];
    this.props = ['nome', 'descricao'];
  }

  salvar() {
    try {
      const disciplina = this.disciplinaService.salvar(this.editando.id, this.nome, this.descricao);
      if (this.editando!.id != 0) { //permite a alteração novamente
        this.editando = disciplina ? disciplina : {id: 0, nome: '', descricao: ''};
      }
      this.erroSalvar = false;
    } catch (error) {
      this.erroSalvar = true;
    }
  }

  closeAlert() {this.erroSalvar = null;}

  excluir(disciplina :any) {
    if (this.editando?.id != 0) {
      alert("Você não pode excluir uma disciplina em modo edição.");
    } else if ( confirm("Tem certeza que quer remover a disciplina '"+ disciplina.nome +"' ?") ) {
      this.disciplinaService.excluir(disciplina);
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