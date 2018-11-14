import { TipoInmueble } from './TipoInmueble';
import { Ciudad } from './Ciudad';
import { Usuario } from './Usuario';
import { Promocion } from './Promocion';

export class InmuebleTemporal {
    id: number;
    direccion: string;
    numero_matricula: string;
    area: number;
    valor: number;
    banios: number;
    /**
     * 0 = pendiente de publicacion
     * 1 = publicado
     * 2 = Vendido o Arrendado
     * 3 = Eliminado
     */
    estado: number;
    /**
     * 0 = Arriendo
     * 1 = Venta
     */
    tipoAV: number;
    garajes: number;
    habitaciones: number;
    detalles: string;
    anoconstruccion: string;
    ascensor: string;
    canchasDepor: string;
    zonasHumedas: string;
    zonaInfantil: string;
    jardines: string;
    transporteCercano: string;
    precioNegociable: string;
    zonasRopas: string;
    parqueadero: string;
    deposito: string;
    estudio: string;
    tipoCortinas: string;
    cuartoServicio: string;
    chimenea: string;
    cocinaAC: string;
    comedorIndependiente: string;
    vistaExterior: string;
    /**
     * 0 = Norte
     * 1 = Sur
     * 2 = Oriente
     * 3 = Occidente
     */
    zona: number;
    fechaAprobacion: string;
    latitud: number;
    longitud: number;
    tipo: TipoInmueble;
    ciudad: Ciudad;
    usuario: Usuario;
    administrador: Usuario;
    promocion: Promocion;

}