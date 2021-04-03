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

  public novoId :number = 4;

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
    this.professores = [
      {id: 1, nome: "Matheus", endereco: "Av. Dom Ruan - SP", disciplina: {id: 3, nome: "Inglês", descricao: ""}},
      {id: 2, nome: "Ruan", endereco: "Rua Teixeira Passos, 102 - RJ", disciplina: {id: 1, nome: "Português", descricao: ""}},
      {id: 3, nome: "yasmim", endereco: "R. Alexandre Frota - vila - RS", disciplina: {id: 5, nome: "Espanhol", descricao: ""}}
    ]
  }

  gravar() { /* pegarei os valores dos inputs e buscarei a disciplina -> jogarei para o service */
    let nome = (this.form.value.nome + "").trim();
    let endereco = (this.form.value.endereco+"").trim();
    let disciplina :Disciplina | undefined = undefined;

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

      if (this.editando != null) {
        this.professores.find((professor) => {
          if (professor.id == this.editando!.id) {
            professor.nome = nome;
            professor.endereco = endereco;
            professor.disciplina = disciplina;
            this.editando = professor;
          }
        });
      } else {
        this.professores.push(new Professor(this.novoId, nome, endereco, disciplina));
        this.novoId++;
        //console.log(this.professores);
      }
    } else {
      Object.keys(this.form.controls).forEach(campo => {
        //console.log(campo);
        const control = this.form.get(campo);
        control?.markAsDirty();
      })
    }
  }

  editar(professor :any) {
    this.limparForm();
    console.log(professor);
    
    this.editando = professor;
    this.form.get('nome')?.setValue(professor.nome);
    this.form.get(['endereco'])?.setValue(professor.endereco);
    this.form.get(['disciplina'])?.setValue(professor.disciplina.id +"-"+ professor.disciplina.nome);
  }

  excluir(professor :any) {
    if (this.editando != null) {
      alert("Você não pode excluir um professor em modo edição.");
    } else if (confirm("Deseja remover o professor "+professor.nome+" ?")) {
      let index = this.professores.indexOf(professor);
      this.professores.splice(index, 1);
    }
  }

  campoInvalido(campo :string) :boolean | undefined {
    return (
      !this.form.get(campo)?.valid && this.form.get(campo)?.dirty
    );
  }

  limparForm() {
    this.form.reset({nome: "", endereco: "", disciplina: ""}); //setando cd um pr n bugar o select
    this.editando = null;
  }
}