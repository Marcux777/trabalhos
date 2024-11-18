"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
var Funcionario = /** @class */ (function () {
    // Construtor
    function Funcionario(matricula, nome, cargo, salario) {
        this.matricula = matricula;
        this.nome = nome;
        this.cargo = cargo;
        this.salario = salario;
    }
    // Métodos públicos para acessar as propriedades
    Funcionario.prototype.getMatricula = function () {
        return this.matricula;
    };
    Funcionario.prototype.getNome = function () {
        return this.nome;
    };
    Funcionario.prototype.getCargo = function () {
        return this.cargo;
    };
    Funcionario.prototype.getSalario = function () {
        return this.salario;
    };
    Funcionario.prototype.setSalario = function (novoSalario) {
        this.salario = novoSalario;
    };
    return Funcionario;
}());
exports.Funcionario = Funcionario;
