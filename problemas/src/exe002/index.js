"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Empresa_1 = require("./Empresa");
var Funcionario_1 = require("./Funcionario");
// Função para cadastrar funcionários
function cadastrarFuncionarios(empresa) {
    var funcionario1 = new Funcionario_1.Funcionario(1, "Alice", "Desenvolvedora", 5000);
    var funcionario2 = new Funcionario_1.Funcionario(2, "Bob", "Gerente", 6000);
    var funcionario3 = new Funcionario_1.Funcionario(3, "Charlie", "Analista", 7000);
    empresa.adicionarFuncionario(funcionario1);
    empresa.adicionarFuncionario(funcionario2);
    empresa.adicionarFuncionario(funcionario3);
}
// Função para atualizar salário
function atualizarSalario(empresa, matricula, novoSalario) {
    empresa.atualizarSalario(matricula, novoSalario);
}
// Função para consultar funcionário
function consultarFuncionario(empresa, matricula) {
    var funcionario = empresa.consultarFuncionario(matricula);
    if (funcionario) {
        console.log("Matr\u00EDcula: ".concat(funcionario.getMatricula(), ", Nome: ").concat(funcionario.getNome(), ", Cargo: ").concat(funcionario.getCargo(), ", Sal\u00E1rio: ").concat(funcionario.getSalario()));
    }
}
// Criar instância da empresa
var minhaEmpresa = new Empresa_1.Empresa();
// Cadastrar funcionários
cadastrarFuncionarios(minhaEmpresa);
// Atualizar salário de um funcionário
atualizarSalario(minhaEmpresa, 2, 6500);
// Consultar funcionários
consultarFuncionario(minhaEmpresa, 1);
consultarFuncionario(minhaEmpresa, 2);
consultarFuncionario(minhaEmpresa, 3);
consultarFuncionario(minhaEmpresa, 4); // Teste de funcionário inexistente
