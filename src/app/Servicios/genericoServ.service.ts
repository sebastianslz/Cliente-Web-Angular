import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class GenericoService {

    // Ruta raiz donde se encuentran los servicios
    domain = 'http://localhost:4300/';

    constructor(private http: HttpClient) {
    }

    /**
     * Listar registros de una determinada tabla
     * @param tabla la tabla de donde se traera los registros
     * @param objeto los parametros dado el caso que vaya a iltrar
     */
    listar (table: string, object: object) {
        var data = {'tabla' : table, 'objeto' : object};
        return this.http.post<any>(this.domain + 'generico/listar', data)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Obtenemos la lista de roles
     */
    listarDirect () {
        return this.http.get<any>(this.domain + 'promocion/listar')
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    listarInmuebesPromociones () {
        return this.http.get<any>(this.domain + 'promocion/listarInmuPromo')
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Registrar en una determinada tabla
     * @param tabla la tabla de donde se traera los registros
     * @param objeto el objeto a registrar
     */
    registrar (table: string, object: object) {
        var data = {'tabla' : table, 'objeto' : object};
        console.log(data);
        return this.http.post<any>(this.domain + 'generico/guardar', data)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Editar en una determinada tabla
     * @param tabla la tabla de donde se traera los registros
     * @param objeto el objeto a editar
     */
    editar (table: string, object: object, pk: string) {
        var data = {'tabla' : table, 'objeto' : object, 'pk' : pk};
        console.log(data);
        return this.http.post<any>(this.domain + 'generico/editar', data)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Editar en una determinada tabla
     * @param tabla la tabla de donde se traera los registros
     * @param objeto el objeto a editar
     */
    editarEntero (table: string, object: object, pk: number) {
        var data = {'tabla' : table, 'objeto' : object, 'pk' : pk};
        return this.http.post<any>(this.domain + 'generico/editar', data)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Buscar en una determinada tabla
     * @param tabla la tabla de donde se traera los registros
     * @param objeto los parametros dado el caso que vaya a iltrar
     */
    buscar (table: string, object: object) {
        var data = {'tabla' : table, 'objeto' : object};
        return this.http.post<any>(this.domain + 'generico/buscar', data)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Elimina de una determinada tabla
     * @param tabla la tabla de donde eliminara
     * @param objeto los parametros para eliminar, el objeto tiene la pk y el valor
     */
    eliminar (table: string, object: object) {
        var data = {'tabla' : table, 'objeto' : object};
        return this.http.post<any>(this.domain + 'generico/eliminar', data)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Returna una variable por get
     * @param {String} sParam Nombre del parametro get
     * @returns {String}
     * @author Johnny Alexander Salazar
     * @version 0.1
    */
    getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    /**
     * 
     * @param date 
     */
    formatoFecha(date){
        // Cortamos el date a 10 caracteres y luego hacemos split cada que encuentre un -
        var data = date.slice(0, 10).split('-');
        // retornamos año-mes-dia
        return data[0] + '-' + data[1] + '-' + data[2];
    }

    /**
     * convierte un archivo a base64
     * @param archivo a convertir en base64
     */
    getBase64(archivo) {
        var reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onload = function () {
            return reader.result;
        };
    }

    /**
     * sube un archivo al servidor
     * @param archivo
     */
    cargarArchivo (archivo: File) {
        return this.http.post<any>(this.domain + 'archivo/subir', archivo)
        .pipe(
            map(res => {
                return res;
            })
        );
    }
    
}