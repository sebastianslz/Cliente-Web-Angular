import { Empleado } from "./Empleado";

/**
 * La experiencia de un empleado
 */
export class Experiencia {
    
    id: number;
    empresa: string;
    empresa_direccion: string;
    empresa_telefono: string;
    cargo: string;
    fecha_inicio: string;
    fecha_fin: string;
    file_certificacion: string;
    empleado: Empleado;

}