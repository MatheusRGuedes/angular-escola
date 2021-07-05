import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concat, Observable } from 'rxjs';
import { DisciplinasService } from '../disciplinas/disciplinas.service';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { AlertService } from '../shared/components/alert/alert.service';
import { Disciplina } from '../shared/models/disciplina';
import { Professor } from '../shared/models/professor.model';
import { ProfessorService } from './professor.service';

/**
 * pesquisar ---> aguardar um observable ser realizado
 */

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

  //@ViewChild(AlertComponent) alertChild :AlertComponent = new AlertComponent();
  disciplinas :Disciplina[] = [];

  constructor(private formBuilder :FormBuilder, private disciplinaService :DisciplinasService, 
    private professorService :ProfessorService, private alertService: AlertService) {
    this.form = formBuilder.group({
      nome: ['', Validators.required], 
      endereco: ['', Validators.required], 
      salario: ['', Validators.required],
      disciplinas: [[]]
    });
  }

  ngOnInit(): void {
    this.header = ["Nome", "Endereço", "Disciplinas", "Salário"];
    this.props = ["nome", "endereco", "disciplinas", "salario"];
    
    this.recuperarDisciplinas();
    this.atualizaTable();
  }

  /* Pesquisar sobre desinscrição ao destruir o componente, usando pipe e o take 
    - https://qastack.com.br/programming/35042929/is-it-necessary-to-unsubscribe-from-observables-created-by-http-methods
  */
  recuperarDisciplinas() {
    this.disciplinaService.todos().subscribe(
      (disciplinas) => {
        this.disciplinas = disciplinas;
      }, (error) => {
        this.alertService.error('Não foi possível carregar as disciplinas.');
        this.disciplinas = [];
      });
  }

  atualizaTable() {
    this.professorService.todos().subscribe(
      (professores) => { //ok
        this.professores = 
          professores.map(p => new Professor(p.id, p.nome, p.endereco, p.salario, p.disciplinas));
      }, (error) => {
        this.alertService.error('Não foi possível carregar os professores.');
      });
  }

  //observable assincrono pro angular lidar com variaveis
  async gravaAssincrono(obj: any) { //console.log(obj["disciplinas"]);
    if (obj["disciplinas"].length > 0) {
      const disciplinas: Disciplina[] = obj["disciplinas"];

      disciplinas.forEach((d, index) => {
        this.disciplinaService.encontrar(d.id).subscribe(
          (disciplina) => {
            if(disciplinas.length == index + 1) {
              this.professorService.salvar(this.editando.id, obj).subscribe( 
                (success) => {
                  this.alertService.success("Professor gravado com sucesso.");
                  this.atualizaTable();
                  this.limparForm();
                }, (error) => this.alertService.error("Erro ao gravar. Tente novamente mais tarde.")
              );
            }
          }, (error) => this.alertService.error("Disciplina(s) não encontrada(s).")
        );
      });
    } else {
      this.professorService.salvar(this.editando.id, obj).subscribe( 
        (success) => {
          this.alertService.success("Professor gravado com sucesso.");
          this.atualizaTable();
          this.limparForm();
        }, (error) => this.alertService.error("Erro ao gravar. Tente novamente mais tarde.")
      );
    }
  }

  async gravar() { /* pegarei os valores dos inputs e buscarei a disciplina -> jogarei para o service */
    //console.log(this.form);
    if (this.form.valid) {
      let nome = (this.form.value.nome + "").trim();
      let endereco = (this.form.value.endereco+"").trim();
      let salario = Number.parseFloat(this.form.value.salario);
      let disciplinas :Disciplina[] = this.form.value.disciplinas;

      //const professor :Professor = {nome, endereco, salario, disciplinas}
      await this.gravaAssincrono({nome, endereco, salario, disciplinas});
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
      "disciplinas": professor.disciplinas,
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
          this.alertService.success('Professor excluído com sucesso.');
        }, (error) => {
          this.alertService.error('Erro ao excluir o professor. Tente mais tarde.');
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
    this.form.reset(
      //{nome: "", endereco: "", salario: "", disciplina: []}
      );
    this.editando = new Professor(0, "", "", 0, undefined);
  }

  //Função para rastrear/comparar as identidades dos options que podem mudar e os dados não
  //É selecionado a opção se o retorno for true
  compareFn(p1: Professor, p2: Professor): boolean {
    //console.log(p1 && p2 ? p1.id === p2.id : p1 === p2);
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }
}