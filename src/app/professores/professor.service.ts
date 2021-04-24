import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../shared/generic-service';
import { Professor } from '../shared/models/professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService extends GenericService<Professor> {

  //public novoId :number = 4;
  //public professores :Professor[] = [];
  //public professorAchado :Professor | null = null;

  constructor(protected http: HttpClient) {
    super(http, "http://localhost:3000/professores");
  }

  todos() {
    return this.findAll();
  }

  salvar(id :number, professor: Object) {
    return this.save(id, professor);
  }

  excluir(professor :Professor) {
    return this.delete(professor.id);
  }
}