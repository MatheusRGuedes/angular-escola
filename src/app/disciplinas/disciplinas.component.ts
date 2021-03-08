import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../disciplina.model'

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {

  public disciplinas = <any>[];

  public paginaAtual = 1; //ao carregar o componente, inicializa na página 1
  public qntddPorPag = 5; // cada pagina terá 5 itens

  constructor() { }

  ngOnInit(): void {
    this.disciplinas = [
      new Disciplina('Língua Portuguesa', 'O objetivo é ler e produzir textos de qualidade, além de desenvolver a oralidade.'),
      new Disciplina('Arte', 'O objetivo é de vender artes na práia.'),
      new Disciplina('Educação Física'),
      new Disciplina('Matemática', 'Desenvolver o seu raciocínio lógico e estimular a sua curiosidade.'),
      new Disciplina('História', 'Compreender os processos e os sujeitos históricos, desvendar as relações entre grupos.'),
      new Disciplina('Geografia', 'Entender a dinâmica do espaço para auxiliar no planejamento das ações do homem sobre ele.'),
      new Disciplina('Ciências', 'Compreender o mundo e atuar como indivíduo e cidadão, utilizando conhecimentos de natureza científica.'),
      new Disciplina('Redação', 'É convencer o leitor da tese apresentada por meio de uma boa argumentação'),
      new Disciplina('Língua Estrangeira Moderna - Inglês', 'percepção de sua própria cultura por meio do conhecimento da cultura de outros povos.'),
      new Disciplina('Ensino Religioso', 'É o estudo das diferentes manifestações do sagrado no coletivo')
    ];
  }

  selecionado = null;
  nome: string = '';
  descricao :string = '';
  editando :Disciplina | null = null;

  selecionar(disciplina: any) {
    if (this.selecionado == null || (this.selecionado != null && this.selecionado != disciplina)) {
      this.selecionado = disciplina;
    } else { //se selecionado 2x
      this.selecionado = null;
    }
  }

  salvar() {
    if (this.editando != null) {
      console.log("Editando..");
      let index = this.disciplinas.indexOf(this.editando);
      //faz a edição dps de ter pego o index do obj selecionado
      this.editando.nome = this.nome;
      this.editando.descricao = this.descricao;
      this.disciplinas.splice(index, 1, this.editando);
    } else {
      console.log("Gravando: " + this.nome +" "+ this.descricao);
      const disciplina = new Disciplina(this.nome, this.descricao);
      this.disciplinas.push(disciplina);
      this.nome = '';
      this.descricao = '';
    }
  }

  excluir(disciplina :any) {
    if (this.editando != null) {
      alert("Você não pode excluir uma disciplina em modo edição.");
    } else if ( confirm("Tem certeza que quer remover a disciplina '"+ disciplina.nome +"' ?") ) {
      let index = this.disciplinas.indexOf(disciplina);
      this.disciplinas.splice(index, 1); //remove um item começando do index da disciplina selecionada
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
    this.editando = null;
  }
}
