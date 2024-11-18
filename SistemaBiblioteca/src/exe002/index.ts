import { Empresa } from "./Empresa";
import { Funcionario } from "./Funcionario";

// Função para cadastrar funcionários
function cadastrarFuncionarios(empresa: Empresa): void {
    const funcionario1 = new Funcionario(1, "Alice", "Desenvolvedora", 5000);
    const funcionario2 = new Funcionario(2, "Bob", "Gerente", 6000);
    const funcionario3 = new Funcionario(3, "Charlie", "Analista", 7000);

    empresa.adicionarFuncionario(funcionario1);
    empresa.adicionarFuncionario(funcionario2);
    empresa.adicionarFuncionario(funcionario3);
}

// Função para atualizar salário
function atualizarSalario(empresa: Empresa, matricula: number, novoSalario: number): void {
    empresa.atualizarSalario(matricula, novoSalario);
}

// Função para consultar funcionário
function consultarFuncionario(empresa: Empresa, matricula: number): void {
    const funcionario = empresa.consultarFuncionario(matricula);
    if (funcionario) {
        console.log(`Matrícula: ${funcionario.getMatricula()}, Nome: ${funcionario.getNome()}, Cargo: ${funcionario.getCargo()}, Salário: ${funcionario.getSalario()}`);
    }
}

// Criar instância da empresa
const minhaEmpresa = new Empresa();

// Cadastrar funcionários
cadastrarFuncionarios(minhaEmpresa);

// Atualizar salário de um funcionário
atualizarSalario(minhaEmpresa, 2, 6500);

// Consultar funcionários
consultarFuncionario(minhaEmpresa, 1);
consultarFuncionario(minhaEmpresa, 2);
consultarFuncionario(minhaEmpresa, 3);
consultarFuncionario(minhaEmpresa, 4); // Teste de funcionário inexistente