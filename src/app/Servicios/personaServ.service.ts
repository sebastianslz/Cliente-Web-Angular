import { map } from 'rxjs/operators';
import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../Modelo/Persona';
import { Usuario } from '../Modelo/Usuario';
import { Rol } from '../Modelo/Rol';
// import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
})

export class PersonaService {

    // Ruta raiz donde se encuentran los servicios
    domain = 'http://localhost:4300/';

    constructor(private http: HttpClient) {
    }

    /**
     * Obtenemos la lista de personas
     */
    listar () {
        return this.http.get<any>(this.domain + 'personas/listar')
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Obtenemos la lista de personas por un Determinado Rol
     */
    listarPersonasByRol (rol: Rol) {
        return this.http.get<any>(this.domain + 'personas/listar-by-rol/' + rol.id)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * buscamos una persona por su cedula
     * @param persona la persona a buscar
     */
    personaByCedula (persona: Persona) {
        console.log('////////////////// 1');
        return this.http.get<any>(this.domain + 'personas/persona-by-cedula/' + persona.cedula)
        .pipe(
            map(res => {
                console.log('////////////////// 2' + res.length);
                return res;
            })
        );
    }

    /**
     * buscamos una persona por su cedula y un rol
     * @param persona la persona a buscar
     */
    personaByCedulaRol (persona: Persona) {
        return this.http.get<any>(this.domain + 'personas/persona-by-cedula-rol/' + persona.cedula + '/' + persona.rol.id)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Obtenemos el usuario de una persona
     * @param persona la persona a la que vamos a buscar su usuario
     */
    usuarioByPersona (persona: Persona) {
        return this.http.get<any>(this.domain + 'usuarios/usuario-by-persona/' + persona.id)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * Registrar una persona y su usuario
     */
    registrar(usuario: Usuario) {
        //console.log(usuario);
        return this.http.post<any>(this.domain + 'personas/registrar', usuario)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

    /**
     * editar una persona y su usuario
     */
    editar(usuario: Usuario) {
        return this.http.post<any>(this.domain + 'personas/editar', usuario)
        .pipe(
            map(res => {
                return res;
            })
        );
    }

}
