import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisciplinasService } from '../disciplinas/disciplinas.service';
import { AlertComponent } from '../shared/components/alert/alert.component';
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
  public editando :Professor = new Professor(0, "", "", 0, undefined);

  @ViewChild(AlertComponent) alertChild :AlertComponent = new AlertComponent();

  disciplinas :Disciplina[] = [];

  constructor(private formBuilder :FormBuilder, private disciplinaService :DisciplinasService, 
      private professorService :ProfessorService) {
    this.form = formBuilder.group({
      nome: ['', Validators.required], 
      endereco: ['', Validators.required], 
      salario: ['', Validators.required],
      disciplina: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.header = ["Nome", "Endereço", "Disciplina", "Salário"];
    this.props = ["nome", "endereco", "disciplina.nome", "salario"];
    
    this.recuperarDisciplinas();
    this.atualizaTable();
  }

  atualizaTable() {
    this.professorService.todos().subscribe(
      (professores) => { //ok
        this.professores = professores.map(
          p => new Professor(p.id, p.nome, p.endereco, p.salario, p.disciplina));
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
  async gravaAssincrono(obj: any) {
    this.disciplinaService.encontrar(obj["disciplina"]).subscribe(
      (disc) => { //função de callback como assincrona, possibilitando usar otras promisses sem problemas
        obj["disciplina"] = disc;

        this.professorService.salvar(this.editando.id, obj).subscribe(
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
    //console.log(this.form);
    if (this.form.valid) {
      let nome = (this.form.value.nome + "").trim();
      let endereco = (this.form.value.endereco+"").trim();
      let salario = Number.parseFloat(this.form.value.salario);
      let disciplina = this.form.value.disciplina;

      await this.gravaAssincrono({nome, endereco, salario, disciplina});
    } else {
      Object.keys(this.form.controls).forEach(campo => {
        //console.log(campo);
        const control = this.form.get(campo);
        control?.markAsDirty();
      })
    }
  }

  editar(professor :Professor) {
    this.limparForm();
    console.log(professor);
    
    this.editando = professor;
    this.form.patchValue({
      "nome": professor.nome,
      "endereco": professor.endereco,
      "disciplina": professor.disciplina?.id,
      "salario": professor.salarioFormatado()
    });
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
    //setando cd um no form pr n bugar o select
    this.form.reset({nome: "", endereco: "", salario: "", disciplina: ""});
    this.editando = new Professor(0, "", "", 0, undefined);
  }
}