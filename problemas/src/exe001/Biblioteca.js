"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biblioteca = void 0;
var Biblioteca = /** @class */ (function () {
    function Biblioteca(livros) {
        this.acervo = livros;
    }
    Biblioteca.prototype.adicionarLivro = function (livro) {
        this.acervo.push(livro);
    };
    Biblioteca.prototype.registrarEmprestimo = function (livro) {
        var find = this.acervo.find(function (l) { return l.codigo === livro.codigo; });
        if (find) {
            find.disponivel = false;
        }
    };
    Biblioteca.prototype.consultarDisponibilidade = function (livro) {
        var find = this.acervo.find(function (l) { return l.codigo === livro.codigo; });
        return find ? find.disponivel : false;
    };
    Biblioteca.prototype.exibirLivros = function () {
        this.acervo.forEach(function (livro) {
            console.log(livro);
        });
    };
    return Biblioteca;
}());
exports.Biblioteca = Biblioteca;
