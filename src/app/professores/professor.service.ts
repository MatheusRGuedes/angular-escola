import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disciplina } from '../shared/models/disciplina.model';
import { Professor } from '../shared/models/professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  public novoId :number = 4;
  
  //adicionar registros
  public professores :Professor[] = [];
  public professorAchado :Professor | null = null;

  public readonly API_URL :string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  todos() {
    return this.http.get<Professor[]>(this.API_URL + "/professores");
  }

  encontrar(id :number) {
    return this.professores.find((professor) => id === professor.id);
  }

  salvar(id :number, nome :string, endereco :string, disciplina :Disciplina) {
    const professor = {"nome": nome, "endereco": endereco, "disciplina": disciplina}
    if (id) {
      /*this.professores.find((professor) => {
        if (id === professor.id) {
          professor.nome = nome;
          professor.endereco = endereco;
          professor.disciplina = disciplina;
          this.professorAchado = professor;
        }
      });*/
      return this.http.put<Professor>(this.API_URL +"/professores/"+id, professor);

      //return this.professorAchado;
    } else {
      //this.professores.push(new Professor(this.novoId, nome, endereco, disciplina));
      //this.novoId++; 
      return this.http.post(this.API_URL+"/professores", professor);
    }

    //return {"id": 0, "nome": "", "endereco": "", "disciplina": undefined};
  }

  excluir(professor :Professor) {
    return this.http.delete(this.API_URL+"/professores/"+professor.id);
  }
}