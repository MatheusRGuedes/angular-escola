import { Component, OnInit } from '@angular/core';
import { Professor } from '../shared/models/professor.model';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  public header :string[] = [];
  public props :string[] = [];
  public professores :Professor[] = [];
  public editando :Professor | null = null;

  constructor() { }

  ngOnInit(): void {
    this.header = ["Nome", "Endereço", "Disciplina"];
    this.props = ["nome", "endereco", "disciplina"];
  }

  editar(professor :any) {}
  excluir(professor :any) {}
}
