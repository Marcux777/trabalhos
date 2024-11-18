export class Reserva {
    numeroQuarto: number;
    nomeHospede: string;
    dataEntrada: Date;
    dataSaida: Date;

    constructor(numeroQuarto: number, nomeHospede: string, dataEntrada: Date, dataSaida: Date) {
        this.numeroQuarto = numeroQuarto;
        this.nomeHospede = nomeHospede;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
    }
}