
//Classe pra servir como um modelode dados para uma disciplina

export class Disciplina {
    id: number;
    nome: string;
    descricao: string | undefined;

    //? -> opcional
    constructor(id: number, nome: string, descricao?: string) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }
}