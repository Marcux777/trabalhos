export class Tarefa {
    id: number;
    descricao: string;
    status: string;
    projeto: string;

    constructor(id: number, descricao: string, status: string, projeto: string) {
        this.id = id;
        this.descricao = descricao;
        this.status = status;
        this.projeto = projeto;
    }
}