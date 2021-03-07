import { Component } from '@angular/core';
import { Disciplina } from './disciplina.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public paginaAtual = 1; //ao carregar o componente, inicializa na página 1
  public qntddPorPag = 5; // cada pagina terá 5 itens

  selecionado = null;
  nome: string = '';
  descricao :string = '';
  editando :Disciplina | null = null;

  disciplinas = [
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
      let nome = this.nome;
      let descricao = this.descricao;
      this.disciplinas.splice(index, 1, new Disciplina(nome, descricao));
    } else {
      console.log("Gravando: " + this.nome +" "+ this.descricao);
      const disciplina = new Disciplina(this.nome, this.descricao);
      this.disciplinas.push(disciplina);
      this.nome = '';
      this.descricao = '';
    }
  }

  excluir(disciplina :any) {
    if ( confirm("Tem certeza que quer remover a disciplina '"+ disciplina.nome +"' ?") ) {
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

  mudaQtddItensPorPagina(event :any) {
    console.log(event);
  }
}