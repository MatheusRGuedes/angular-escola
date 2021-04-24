import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisciplinasService } from '../disciplinas/disciplinas.service';
import { AlertComponent } from '../shared/alert/alert.component';
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
  public editando :Professor = {"id": 0, "nome": "", "endereco": "", "disciplina": undefined};

  @ViewChild(AlertComponent) alertChild :AlertComponent = new AlertComponent();

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
        this.alertChild.openAlert("danger", "Ops! Não foi possível carregar os professores.");
      });
  }

  recuperarDisciplinas() {
    this.disciplinaService.todos().subscribe(
      (disciplinas) => {
        this.disciplinas = disciplinas;
      }, (error) => {
        this.alertChild.openAlert("danger", "Ops! Não foi possível carregar as disciplinas");
        this.disciplinas = [];
      });
  }

  //observable assincrono pro angular lidar com variaveis
  async gravaAssincrono(idDisciplina :number, nome :string, endereco :string) {
    this.disciplinaService.encontrar(idDisciplina).subscribe(
      (disc) => { //função de callback como assincrona, possibilitando usar otras promisses sem problemas
        const professor = {"nome": nome, "endereco": endereco, "disciplina": disc}

        this.professorService.salvar(this.editando.id, professor).subscribe(
          (professor) => {
            this.atualizaTable();
            this.limparForm();
            this.alertChild.openAlert('success', 'Professor gravado com sucesso.');
          }, (error) => {
            this.alertChild.openAlert('danger', 'Não foi possível gravar o professor. Tente mais tarde.');
          }
        );
    }, (error) => {
      this.alertChild.openAlert('danger', 'Ops! Disciplina não encontrada.');
    });
  }

  async gravar() { /* pegarei os valores dos inputs e buscarei a disciplina -> jogarei para o service */
    let nome = (this.form.value.nome + "").trim();
    let endereco = (this.form.value.endereco+"").trim();

    //console.log(this.form);
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
    if (this.editando.id != 0) {
      alert("Você não pode excluir um professor em modo edição.");
    } else if (confirm("Deseja remover o professor "+professor.nome+" ?")) {
      this.professorService.excluir(professor).subscribe(
        () => {
          this.atualizaTable();
          this.alertChild.openAlert('success', 'Professor excluído com sucesso.');
        }, (error) => {
          this.alertChild.openAlert('danger', 'Não foi possível excluir o professor. Tente mais tarde.');
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