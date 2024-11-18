"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = void 0;
var Empresa = /** @class */ (function () {
    function Empresa() {
        // private array de funcionarios
        this.funcionarios = [];
    }
    // método para adicionar funcionários
    Empresa.prototype.adicionarFuncionario = function (funcionario) {
        this.funcionarios.push(funcionario);
    };
    Empresa.prototype.atualizarSalario = function (matricula, novoSalario) {
        var funcionario = this.funcionarios.find(function (f) { return f.getMatricula() === matricula; });
        if (funcionario) {
            funcionario.setSalario(novoSalario);
        }
        else {
            console.error("Funcion\u00E1rio com matr\u00EDcula ".concat(matricula, " n\u00E3o encontrado."));
        }
    };
    Empresa.prototype.consultarFuncionario = function (matricula) {
        var funcionario = this.funcionarios.find(function (f) { return f.getMatricula() === matricula; });
        if (!funcionario) {
            console.error("Funcion\u00E1rio com matr\u00EDcula ".concat(matricula, " n\u00E3o encontrado."));
        }
        return funcionario;
    };
    return Empresa;
}());
exports.Empresa = Empresa;
