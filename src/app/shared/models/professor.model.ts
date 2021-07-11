import { Disciplina } from "./disciplina";

// Servir como um modelo de dados para um professor

interface professorModel {
    id :number;
    nome :string;
    endereco :string;
    salario :number;
    disciplinas? :Disciplina[];

    salarioFormatado:() => string;
}

export class Professor implements professorModel {
    id :number;
    nome :string;
    endereco :string;
    salario :number;
    disciplinas? :Disciplina[];

    constructor(id: number, nome :string, endereco :string, salario :number,
        disciplinas? :Disciplina[]) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.salario = salario;
        this.disciplinas = disciplinas;
    }
    
    //retorna de acordo com a mascara do ngx-mask
    salarioFormatado() : string {
        return this.salario ? this.salario.toString().replace('.', ',') : "";
    }
}