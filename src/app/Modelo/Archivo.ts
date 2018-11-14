import { Inmueble } from './Inmueble';

export class Archivo {

    id: number;
    /**
     * 0 = imagen
     * 1 = video
     */
    tipo: number;
    nombre: string;
    inmueble: Inmueble;

}
