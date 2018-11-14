import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../Modelo/Persona';

@Injectable({
    providedIn: 'root'
})

export class RolService {

    // Ruta raiz donde se encuentran los servicios
    domain = 'http://localhost:4300/';

    constructor(private http: HttpClient) {
    }

    /**
     * Obtenemos la lista de roles
     */
    listar () {
        return this.http.get<any>(this.domain + 'rol/listar')
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Obtenemos la informacion de un Rol 
     * @param rol el rol al que vamos a obtener la informacion
     */
    buscar (rol: number) {
        return this.http.get<any>(this.domain + 'rol/rol-by-id/' + rol)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Buscar la informacion de un rol de una persona
     * @param persona 
     */
    buscarRolPersona (persona: Persona){
        return this.http.get<any>(this.domain + 'rol/rol-by-persona/' + persona.id)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

}