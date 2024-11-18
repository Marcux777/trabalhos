import {Livro} from './Livro';

export class Biblioteca{
    acervo: Livro[];

    constructor(livros: Livro[]) {
        this.acervo = livros;
    }

    adicionarLivro(livro: Livro): void {
        this.acervo.push(livro);
    }
    registrarEmprestimo(livro: Livro): void {
        const find = this.acervo.find(l => l.codigo === livro.codigo);
        if(find){
            find.disponivel = false;
        }
    }

    consultarDisponibilidade(livro: Livro): boolean{
        const find = this.acervo.find(l => l.codigo === livro.codigo);
        return find ? find.disponivel : false;
    }
    exibirLivros(): void{
        this.acervo.forEach(livro => {
            console.log(livro);
        });
    }
}