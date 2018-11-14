import { Acceso } from './Acceso';

export class Rol {

    id: number;
    nombre: string;
    descripcion: string;
    // Lista de Accesos del rol
    accesos: Array<Acceso> = [];
}
