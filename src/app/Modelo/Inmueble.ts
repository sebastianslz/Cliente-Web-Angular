import { Ciudad } from './Ciudad';
import { TipoInmueble } from './TipoInmueble';
import { Usuario } from './Usuario';
import { Promocion } from './Promocion';
export class Inmueble {

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
    ascensor: boolean;
    canchasDepor: boolean;
    zonasHumedas: boolean;
    zonaInfantil: boolean;
    jardines: boolean;
    transporteCercano: boolean;
    precioNegociable: boolean;
    zonaRopas: boolean;
    parqueadero: boolean;
    deposito: boolean;
    estudio: boolean;
    tipoCortinas: string;
    cuartoServicio: boolean;
    chimenea: boolean;
    cocinaAC: boolean;
    comedorIndependiente: boolean;
    vistaExterior: boolean;
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

    /**
     * retorna el valor texto de un estado
     * @param estado el numero del indice a retornar
     */
    getEstado(estado: number) {
        const estados = [
            'pendiente de publicacion',
            'publicado',
            'Vendido o Arrendado',
            'Eliminado'
        ];
        if (estado == null) {
            // Retornamos todo el listado de estados
            return estados;
        } else {
            return estados[estado];
        }
    }

    /**
     * retorna el valor texto de un tipo venta arrendo
     * @param tipoAV el numero del indice a retornar
     */
    getTipoAV(tipoAV: number) {
        const tipos = [
            'Arriendo',
            'Venta'
        ];
        if (tipoAV == null) {
            // Retornamos todo el listado de tipos
            return tipos;
        } else {
            return tipos[tipoAV];
        }
    }

    /**
     * retorna el valor texto de una zona
     * @param zona el numero del indice a retornar
     */
    getZona(zona: number) {
        const zonas = [
            'Norte',
            'Sur',
            'Oriente',
            'Occidente'
        ];
        if (zona == null) {
            // Retornamos todo el listado de zonas
            return zonas;
        } else {
            return zonas[zona];
        }
    }

    /**
     * Agregamos comas a los miles
     * @param numero el numero al que le agregaremos comas
     */
    addComa(num) {
        // tslint:disable-next-line:no-var-keyword
        var cents;
        // tslint:disable-next-line:no-var-keyword
        var sign;
        if (!num || num === 'NaN') { return '-'; }
        if (num === 'Infinity') { return '&#x221e;'; }
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num)) {
            num = '0';
            sign = (num === (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();
        }
        if (cents < 10) {
            cents = '0' + cents;
        }
        // tslint:disable-next-line:no-var-keyword
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
        }
        return (((sign) ? '' : '') + num);
    }
}