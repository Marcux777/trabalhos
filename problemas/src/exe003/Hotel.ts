import { Reserva } from "./Reserva";

export class Hotel {
    private reservas: Reserva[] = [];

    registrarReserva(reserva: Reserva): void {
        this.reservas.push(reserva);
    }

    cancelarReserva(numeroQuarto: number): void {
        this.reservas = this.reservas.filter(reserva => reserva.numeroQuarto !== numeroQuarto);
    }

    consultarStatusQuarto(numeroQuarto: number): string {
        const reserva = this.reservas.find(reserva => reserva.numeroQuarto === numeroQuarto);
        return reserva ? "Reservado" : "Disponível";
    }
}