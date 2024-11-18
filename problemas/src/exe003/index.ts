import { Hotel } from "./Hotel";
import { Reserva } from "./Reserva";

// Função para registrar reservas
function registrarReservas(hotel: Hotel): void {
    const reserva1 = new Reserva(101, "João Silva", new Date("2023-11-01"), new Date("2023-11-10"));
    const reserva2 = new Reserva(102, "Maria Oliveira", new Date("2023-11-05"), new Date("2023-11-15"));
    
    hotel.registrarReserva(reserva1);
    hotel.registrarReserva(reserva2);
}

// Função para cancelar reserva
function cancelarReserva(hotel: Hotel, numeroQuarto: number): void {
    hotel.cancelarReserva(numeroQuarto);
}

// Função para consultar status
function consultarStatus(hotel: Hotel, numeroQuarto: number): void {
    const status = hotel.consultarStatusQuarto(numeroQuarto);
    console.log(`Status do quarto ${numeroQuarto}: ${status}`);
}

// Testando o sistema
const hotel = new Hotel();

registrarReservas(hotel);
consultarStatus(hotel, 101); 
consultarStatus(hotel, 102); 

cancelarReserva(hotel, 101);
consultarStatus(hotel, 101); // Deve imprimir "Disponível"
consultarStatus(hotel, 102); // Deve imprimir "Reservado"