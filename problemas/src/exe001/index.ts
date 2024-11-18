import { Biblioteca } from "./Biblioteca";
import { Livro } from "./Livro";

// Criar alguns livros
const livro1 = new Livro(1, "O Senhor dos Anéis", "J.R.R. Tolkien", true);
const livro2 = new Livro(2, "1984", "George Orwell", true);

// Criar instância da biblioteca
const minhaBiblioteca = new Biblioteca([livro1, livro2]);

// Listar livros na biblioteca
minhaBiblioteca.exibirLivros();
