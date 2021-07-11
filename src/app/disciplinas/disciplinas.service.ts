import { Injectable } from '@angular/core';
import { Disciplina } from '../shared/models/disciplina';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../shared/generic-service';
import { environment } from 'src/environments/environment';

/*
  Classe de serviço para separar a regra de negócio do controler
  - injectable --> indica ao angular q é um serviço

  - os verbos do http retornam um objeto Objserver q está aguardando o servidor enviar a resposta, após o 
     cliente receber a resposta (assincrono), é executado o subscribe (cliente) e invoca função de 
     sucesso/erro ou completo, em seguida é chamado a função d callback passada no parametro d carregarDados
*/

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  //public novo_id :number = 10;
  //public disciplinas :Disciplina[] = [];
  //public discEncontrada :Disciplina | null = null; 
  private readonly DISCIPLINA_URL :string = `${environment.API_FAKE}disciplinas`;
  private genericService :GenericService<Disciplina>;

  constructor(public http: HttpClient) {
    this.genericService = new GenericService(http, this.DISCIPLINA_URL);
  }

  todos() {
    return this.genericService.findAll();
  }

  salvar(id :number, nome :string, codigo :string) {
    return this.genericService.save(id, 
      {
        "nome": nome, 
        "codigo": codigo
      }
    );
  }

  encontrar(id: number)  {
    return this.genericService.findOne(id);
  }

  //https://angular.io/api/common/http/HttpClient#http-request-example
  encontrarPorNome(nome :string) {
    return this.http.get<Disciplina[]>(`${this.DISCIPLINA_URL}?nome=${nome}`);
  }

  excluir(disciplina :Disciplina) {
    /*if (disciplina && disciplina.id != null) {
      this.encontrar(disciplina.id).subscribe(disciplina => {
        console.log(disciplina)
        this.discEncontrada = disciplina;
      });
    }

    if (this.discEncontrada) {
      this.discEncontrada = null;*/
      return this.genericService.delete(disciplina.id);
    /*} else {
      this.discEncontrada = null;
      throw new Error('Erro! Disciplina não encontrada.');
    }*/
  }
}