"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
var Livro = /** @class */ (function () {
    function Livro(codigo, titulo, autor, disponivel) {
        if (disponivel === void 0) { disponivel = true; }
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
    }
    return Livro;
}());
exports.Livro = Livro;
