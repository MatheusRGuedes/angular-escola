//Classe pra servir como um modelo de dados para um professor

import { Disciplina } from "./disciplina.model";

export class Professor {
    id :number;
    nome :string;
    endereco :string;
    salario :number;
    disciplina? :Disciplina;

    constructor(id: number, nome :string, endereco :string, salario :number,
        disciplina? :Disciplina) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.salario = salario;
        this.disciplina = disciplina;
    }
    
    //retorna de acordo com a mascara do ngx-mask
    salarioFormatado() : string {
        return this.salario ? this.salario.toString().replace('.', ',') : "";
    }
}