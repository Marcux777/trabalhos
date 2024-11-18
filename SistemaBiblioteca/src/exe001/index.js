"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Biblioteca_1 = require("./Biblioteca");
var Livro_1 = require("./Livro");
// Criar alguns livros
var livro1 = new Livro_1.Livro(1, "O Senhor dos Anéis", "J.R.R. Tolkien", true);
var livro2 = new Livro_1.Livro(2, "1984", "George Orwell", true);
// Criar instância da biblioteca
var minhaBiblioteca = new Biblioteca_1.Biblioteca([livro1, livro2]);
// Listar livros na biblioteca
minhaBiblioteca.exibirLivros();
