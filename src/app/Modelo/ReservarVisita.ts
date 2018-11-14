import { Inmueble } from './Inmueble';
import { Usuario } from './Usuario';
import { Empleado } from './Empleado';
import { Persona } from './Persona';

export class ReservarVisita {

    id: number;
    mensaje: string;
    fecha: string;
     /**
     * Pendiete (para visitar)
     * Visitado
     */
    estado: string;
    inmueble: Inmueble;
    cliente: Persona;
    empleado: Persona;
    comentario: string; // El comentario que hace el cliente despues de haber realizado su visita
    hora_visita: number; // la hora de la visita
}
