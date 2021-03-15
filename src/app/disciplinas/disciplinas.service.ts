import { Injectable } from '@angular/core';
import { Disciplina } from '../disciplina.model';

import { HttpClient } from '@angular/common/http'
import { take } from 'rxjs/operators';

/*
  Classe de serviço para separar a regra de negócio do controler
  - injectable --> indica ao angular q é um serviço
*/

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  //public novo_id :number = 10;
  //public disciplinas :Disciplina[] = [];
  public discEncontrada :Disciplina | null = null; 

  public readonly API_URL :string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  // os verbos do http retornam um objeto Objserver q está aguardando o servidor enviar a resposta, após o cliente receber a resposta 
  // (assincrono), é executado o subscribe (cliente) e invoca função de sucesso/erro ou completo, em seguida é chamado a função d callback 
  //passada no parametro d carregarDados

  // pegar todas as disciplinas
  todos() {
    return this.http.get<Disciplina[]>(this.API_URL + "/disciplinas");
  }

  // metodo de criar ou editar
  salvar(id :number, nome :string, descricao :string) {
    const disciplina = {"nome": nome, "descricao": descricao};
    if (id) {
      return this.http.put<Disciplina>(this.API_URL+"/disciplinas/"+id, disciplina);
    } 
    else {
      return this.http.post<Disciplina>(this.API_URL+"/disciplinas", disciplina);
    }
  }

  encontrar(id: number)  {
    return this.http.get<Disciplina>(this.API_URL+"/disciplinas/"+id);
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
      return this.http.delete(this.API_URL+"/disciplinas/"+disciplina.id).pipe(take(1)); //ja atualiza o observer assim que voltar com o resultado
    /*} else {
      this.discEncontrada = null;
      throw new Error('Erro! Disciplina não encontrada.');
    }*/
  }
}