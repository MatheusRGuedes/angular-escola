//Classe pra servir como um modelo de dados para um professor

import { Disciplina } from "./disciplina.model";

export class Professor {
    id :number;
    nome :string;
    endereco :string;
    disciplina? :Disciplina;

    constructor(id: number, nome :string, endereco :string, disciplina? :Disciplina) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.disciplina = disciplina;
    }
}