import { Funcionario } from "./Funcionario";

export class Empresa {
    // private array de funcionarios
    private funcionarios: Funcionario[] = [];
    
    // método para adicionar funcionários
    public adicionarFuncionario(funcionario: Funcionario): void {
        this.funcionarios.push(funcionario);
    }

    public atualizarSalario(matricula: number, novoSalario: number): void {
        const funcionario = this.funcionarios.find(f => f.getMatricula() === matricula);
        if (funcionario) {
            funcionario.setSalario(novoSalario);
        } else {
            console.error(`Funcionário com matrícula ${matricula} não encontrado.`);
        }
    }

    public consultarFuncionario(matricula: number): Funcionario | undefined {
        const funcionario = this.funcionarios.find(f => f.getMatricula() === matricula);
        if (!funcionario) {
            console.error(`Funcionário com matrícula ${matricula} não encontrado.`);
        }
        return funcionario;
    }
}