import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from '../shared/generic-service';
import { Professor } from '../shared/models/professor.model';

interface teste {

}

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  //public novoId :number = 4;
  //public professores :Professor[] = [];
  //public professorAchado :Professor | null = null;
  private genericService :GenericService<Professor>;

  constructor(protected http: HttpClient) {
    this.genericService = new GenericService(http, `${environment.API_FAKE}professores`);
  }

  todos() {
    return this.genericService.findAll();
  }

  salvar(id :number, professor: Object) {
    return this.genericService.save(id, professor);
  }

  excluir(professor :Professor) {
    return this.genericService.delete(professor.id);
  }
}