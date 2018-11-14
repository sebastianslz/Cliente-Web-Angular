import { Contrato } from './Contrato';
import { Empleado } from './Empleado';

export class Venta {

    id: number;
    contrato: Contrato;
    empleado: Empleado;
    fecha: string;
    descripcion: string;

}
