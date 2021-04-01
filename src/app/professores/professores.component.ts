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

  public novoId :number = 1;

  public header :string[] = [];
  public props :string[] = [];
  public professores :Professor[] = [];
  public editando :Professor | null = null;

  constructor(private formBuilder :FormBuilder) {
    this.form = formBuilder.group({
      nome: ['', Validators.required], 
      endereco: ['', Validators.required], 
      disciplina: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.header = ["Nome", "Endereço", "Disciplina"];
    this.props = ["nome", "endereco", "disciplina.nome"];
  }

  gravar() { /* pegarei os valores dos inputs e buscarei a disciplina -> jogarei para o service */
    let nome = (this.form.value.nome + "").trim();
    let endereco = (this.form.value.endereco+"").trim();
    let disciplina = undefined;

    console.log(this.form);
    if (this.form.valid) {
      if (this.form.value.disciplina != "") {
        let disciInput = this.form.value.disciplina + "";
        disciplina = {
          "id": Number.parseInt(disciInput.split('-')[0]), 
          "nome": disciInput.split('-')[1], 
          "descricao": ""
        };
      }    
    
      this.professores.push(new Professor(this.novoId, nome, endereco, disciplina));
      this.novoId++;
      //console.log(this.professores);
    } else {
      Object.keys(this.form.controls).forEach(campo => {
        //console.log(campo);
        const control = this.form.get(campo);
        control?.markAsDirty();
      })
    }
  }

  campoInvalido(campo :string) :boolean | undefined {
    return (
      !this.form.get(campo)?.valid && this.form.get(campo)?.dirty
    );
  }

  limparForm() {
    this.form.reset({nome: "", endereco: "", disciplina: ""}); //setando cd um pr n bugar o select
  }

  editar(professor :any) {}
  excluir(professor :any) {}
}