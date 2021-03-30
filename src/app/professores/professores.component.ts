import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Disciplina } from '../shared/models/disciplina.model';
import { Professor } from '../shared/models/professor.model';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  form :FormGroup = new FormGroup({});

  public header :string[] = [];
  public props :string[] = [];
  public professores :Professor[] = [];
  public editando :Professor | null = null;

  constructor(private formBuilder :FormBuilder) {
    this.form = formBuilder.group({
      nome: [""], endereco: [""], disciplina: [""]
    });
  }

  ngOnInit(): void {
    this.header = ["Nome", "Endereço", "Disciplina"];
    this.props = ["nome", "endereco", "disciplina.nome"];
  }

  gravar() {
    let nome = this.form.value.nome;
    let endereco = this.form.value.endereco;
    let disciplina = undefined;

    if (this.form.value.disciplina != "") {
      let disci = this.form.value.disciplina + "";
      disciplina = {
        "id": Number.parseInt(disci.split('-')[0]), 
        "nome": disci.split('-')[1], 
        "descricao": ""};
    }    
    
    this.professores.push(new Professor(1, nome, endereco, disciplina));
    console.log(this.professores);

    this.form.reset({nome: "", endereco: "", disciplina: ""}); //setando cd um pr n bugar o select
  }

  editar(professor :any) {}
  excluir(professor :any) {}
}
