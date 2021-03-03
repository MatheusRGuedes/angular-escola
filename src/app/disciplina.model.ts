
//Classe pra servir como um modelode dados para uma disciplina

export class Disciplina {

    nome: string;
    descricao: string | undefined;

    //? -> opcional
    constructor(nome: string, descricao?: string) {
        this.nome = nome;
        this.descricao = descricao;
    }
}