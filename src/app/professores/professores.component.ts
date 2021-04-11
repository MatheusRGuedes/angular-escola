import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisciplinasService } from '../disciplinas/disciplinas.service';
import { Disciplina } from '../shared/models/disciplina.model';
import { Professor } from '../shared/models/professor.model';
import { ProfessorService } from './professor.service';

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
  public editando :Professor | null = {"id": 0, "nome": "", "endereco": "", "disciplina": undefined};

  disciplinas :Disciplina[] = [];

  constructor(private formBuilder :FormBuilder, private disciplinaService :DisciplinasService, 
      private professorService :ProfessorService) {
    this.form = formBuilder.group({
      nome: ['', Validators.required], 
      endereco: ['', Validators.required], 
      disciplina: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.header = ["Nome", "Endereço", "Disciplina"];
    this.props = ["nome", "endereco", "disciplina.nome"];
    
    this.recuperarDisciplinas();
    this.atualizaTable();
  }

  atualizaTable() {
    this.professorService.todos().subscribe(
      (professores) => { //ok
        this.professores = professores;
      }, (error) => {
        console.error("Não foi possível recuperar professores.");
      });
  }

  recuperarDisciplinas() {
    this.disciplinaService.todos().subscribe(
      (disciplinas) => {
        this.disciplinas = disciplinas;
      }, (error) => {
        console.error("Erro ao recuperar disciplinas.");
        this.disciplinas = [];
      });
  }

  //observable assincrono pro angular lidar com variaveis
  async gravaAssincrono(idDisciplina :number, nome :string, endereco :string) {
    this.disciplinaService.encontrar(idDisciplina).subscribe(
      (disc) => { //função de callback como assincrona, possibilitando usar otras promisses sem problemas
        let disciplina :Disciplina = disc;
        this.professorService.salvar(this.editando!.id, nome, endereco, disciplina).subscribe(
          (professor) => {
            this.atualizaTable();
            this.limparForm();
          }, (error) => {
            console.error("Não foi possível gravar o professor.");
          }
        );
    }, (error) => {
      console.error("Disciplina não encontrada.");
    });
  }

  async gravar() { /* pegarei os valores dos inputs e buscarei a disciplina -> jogarei para o service */
    let nome = (this.form.value.nome + "").trim();
    let endereco = (this.form.value.endereco+"").trim();

    console.log(this.form);
    if (this.form.valid) {
      await this.gravaAssincrono(this.form.value.disciplina, nome, endereco);
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
    this.form.get(['disciplina'])?.setValue(professor.disciplina.id);
  }

  excluir(professor :any) {
    if (this.editando?.id != 0) {
      alert("Você não pode excluir um professor em modo edição.");
    } else if (confirm("Deseja remover o professor "+professor.nome+" ?")) {
      this.professorService.excluir(professor).subscribe(
        () => {
          this.atualizaTable();
        }, (error) => {
          console.error("Não foi possível excluir o professor.");
        }
      );
    }
  }

  campoInvalido(campo :string) :boolean | undefined {
    return (
      !this.form.get(campo)?.valid && this.form.get(campo)?.dirty
    );
  }

  limparForm() {
    this.form.reset({nome: "", endereco: "", disciplina: ""}); //setando cd um pr n bugar o select
    this.editando = {"id": 0, "nome": "", "endereco": "", "disciplina": undefined};
  }
}