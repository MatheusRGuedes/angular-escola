import { Injectable } from '@angular/core';
import { Disciplina } from '../disciplina.model';

/*
  Classe de serviço para separar a regra de negócio do controler

  injectable --> indica ao angular q é um serviço
*/

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  public novo_id :number = 10;
  public disciplinas :Disciplina[] = [];

  constructor() {
    this.disciplinas = [
      new Disciplina(1, 'Língua Portuguesa', 'O objetivo é ler e produzir textos de qualidade, além de desenvolver a oralidade.'),
      new Disciplina(2, 'Arte', 'O objetivo é de vender artes na práia.'),
      new Disciplina(3, 'Educação Física'),
      new Disciplina(4, 'Matemática', 'Desenvolver o seu raciocínio lógico e estimular a sua curiosidade.'),
      new Disciplina(5, 'História', 'Compreender os processos e os sujeitos históricos, desvendar as relações entre grupos.'),
      new Disciplina(6, 'Geografia', 'Entender a dinâmica do espaço para auxiliar no planejamento das ações do homem sobre ele.'),
      new Disciplina(7, 'Ciências', 'Compreender o mundo e atuar como indivíduo e cidadão, utilizando conhecimentos de natureza científica.'),
      new Disciplina(8, 'Redação', 'É convencer o leitor da tese apresentada por meio de uma boa argumentação'),
      new Disciplina(9, 'Língua Estrangeira Moderna - Inglês', 'percepção de sua própria cultura por meio do conhecimento da cultura de outros povos.'),
      new Disciplina(10, 'Ensino Religioso', 'É o estudo das diferentes manifestações do sagrado no coletivo')
    ];
  }

  // pegar todas as disciplinas
  todos() {
    return this.disciplinas;
  }

  // metodo de criar ou editar
  salvar(id :number, nome :string, descricao :string) :Disciplina | undefined {
    if (id) { //edição
      console.log("Editando: " + id + " | " + nome +" | "+ descricao);

      let index;
      let disciplina :Disciplina | undefined = this.encontrar(id);
      if (disciplina == undefined) throw new Error('Erro! Disciplina n encontrada para edição.');
      else index = this.disciplinas.indexOf(disciplina);

      disciplina.nome = nome;
      disciplina.descricao = descricao;
      this.disciplinas.splice(index, 1, disciplina);
      return disciplina;

    } else { //gravação
      this.novo_id++;
      const novaDisc = new Disciplina(this.novo_id, nome, descricao);
      this.disciplinas.push(novaDisc);

      console.log("Gravando: " + novaDisc.id + " | " + novaDisc.nome +" | "+ novaDisc.descricao);
      return novaDisc;
    }
  }

  encontrar(id: number): Disciplina | undefined {
    return this.disciplinas.find(disciplina => disciplina.id == id);
  }

  excluir(disciplina :Disciplina) {
    let d = null;

    if (disciplina && disciplina.id != null) {
      d = this.encontrar(disciplina.id);
    }

    if (d) {
      let index = this.disciplinas.indexOf(d);
      this.disciplinas.splice(index, 1); //remove um item começando do index da disciplina selecionada
    } else {
      throw new Error('Erro! Disciplina não encontrada.');
    }
  }
}