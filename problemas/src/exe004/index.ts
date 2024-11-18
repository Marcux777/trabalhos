import { GestorTarefas } from "./GestorTarefas";
import { Tarefa } from "./Tarefa";

const gestor = new GestorTarefas();

// Função para adicionar tarefas
function adicionarTarefas(): void {
    const tarefa1 = new Tarefa(1, "Implementar login", "Pendente", "Autenticação");
    const tarefa2 = new Tarefa(2, "Criar página inicial", "Pendente", "Frontend");
    const tarefa3 = new Tarefa(3, "Configurar banco de dados", "Pendente", "Backend");

    gestor.adicionarTarefa(tarefa1);
    gestor.adicionarTarefa(tarefa2);
    gestor.adicionarTarefa(tarefa3);

    console.log("Tarefas adicionadas:");
    console.log(gestor);
}

// Função para atualizar o status de uma tarefa
function atualizarStatusTarefa(id: number, novoStatus: string): void {
    gestor.atualizarStatus(id, novoStatus);
    console.log(`Status da tarefa ${id} atualizado para "${novoStatus}".`);
}

// Função para consultar tarefas por projeto
function consultarTarefasPorProjeto(projeto: string): void {
    const tarefas = gestor.consultarTarefasPorProjeto(projeto);
    console.log(`Tarefas do projeto "${projeto}":`);
    tarefas.forEach(tarefa => {
        console.log(`ID: ${tarefa.id}, Descrição: ${tarefa.descricao}, Status: ${tarefa.status}`);
    });
}

// Executando as funções de teste
adicionarTarefas();
atualizarStatusTarefa(2, "Em Andamento");
consultarTarefasPorProjeto("Frontend");