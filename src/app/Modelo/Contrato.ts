import { Empleado } from './Empleado';
import { Usuario } from './Usuario';
import { ReservarVisita } from './ReservarVisita';

export class Contrato {

    id: number;
    descripcion: string;
    empleado: Empleado;
    cliente: Usuario;
    visita: ReservarVisita;
    valorFinalInmueble: number;
    /**
     * 0=pendiente
     * 1=finalizado
     */
    estado: number;
    fecha_finalizacion: string;
    fecha_solicitud: string;

    /**
     * retorna el valor texto de un estado
     * @param estado el numero del indice a retornar
     */
    

    getEstado(estado: number) {
        const estados = [
            '1',
            '0'
        ];
        if (estado == null) {
            // Retornamos todo el listado de estados
            return estados;
        } else {
            return estados[estado];
        }
    }

}
