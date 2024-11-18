export class Funcionario {
    // Propriedades privadas
    private matricula: number;
    private nome: string;
    private cargo: string;
    private salario: number;

    // Construtor
    constructor(matricula: number, nome: string, cargo: string, salario: number) {
        this.matricula = matricula;
        this.nome = nome;
        this.cargo = cargo;
        this.salario = salario;
    }

    // Métodos públicos para acessar as propriedades
    public getMatricula(): number {
        return this.matricula;
    }

    public getNome(): string {
        return this.nome;
    }

    public getCargo(): string {
        return this.cargo;
    }

    public getSalario(): number {
        return this.salario;
    }

    public setSalario(novoSalario: number): void {
        this.salario = novoSalario;
    }
}