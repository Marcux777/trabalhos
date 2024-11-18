import { Tarefa } from './Tarefa';

export class GestorTarefas {
    private tarefas: Tarefa[];

    constructor() {
        this.tarefas = [];
    }

    adicionarTarefa(tarefa: Tarefa): void {
        this.tarefas.push(tarefa);
    }

    atualizarStatus(id: number, status: string): void {
        const tarefa = this.tarefas.find(t => t.id === id);
        if (tarefa) {
            tarefa.status = status;
        }
    }

    consultarTarefasPorProjeto(projeto: string): Tarefa[] {
        return this.tarefas.filter(t => t.projeto === projeto);
    }
}