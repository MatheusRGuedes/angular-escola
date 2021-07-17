import { Injectable } from '@angular/core';
import { Disciplina } from '../shared/models/disciplina';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericService } from '../shared/generic-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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
  encontrarPorNome(searchParams : HttpParams) {
    const options = { params: searchParams };
    return this.http.get<Disciplina[]>(`${this.DISCIPLINA_URL}`, options);
  }

  excluir(disciplina :Disciplina) {
      return this.genericService.delete(disciplina.id);
  }
}