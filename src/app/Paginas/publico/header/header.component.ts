import { Usuario } from '../../../Modelo/Usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../Servicios/usuarioServ.service';
import { Acceso } from '../../../Modelo/Acceso';
import {Router} from "@angular/router";
import { Inmueble } from '../../../Modelo/Inmueble';
import { Ciudad } from '../../../Modelo/Ciudad';
import { GenericoService } from '../../../Servicios/genericoServ.service';
import { TipoInmueble } from '../../../Modelo/TipoInmueble';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    // Variables para los mensajes en la pagina
    show: number;
    msj: string;

  // Usuario que inicio sesion en la aplicacion
  usuario: Usuario;
  // Listado de Accesos a los que puede ingresar el usuario que inicio sesion
  accesos: Array<Acceso> = []; 
  // Ciudades
  ciudades: Array<Ciudad> = [];
  // Tipos de inmueble
  tiposInmueble: Array<TipoInmueble> = [];
  // inmueble, objeto para obtener parametros para buscar
  inmueble: Inmueble = new Inmueble();

  constructor(private genericoServicio: GenericoService,private servicios: UsuarioService, private router: Router) {
   }

  ngOnInit() {
    this.usuario = this.servicios.getUsuario();
    if(this.usuario != null){
      this.accesos = this.usuario.persona.rol.accesos;
    }else{
      this.usuario = new Usuario();
    }
    // Cargamos las ciudades en la busqueda
    this.cargarCiudades();
    // Cargamos los tipos de inmueble
    this.cargarTiposInmueble();
  }

  /**
   * Busca de acuerdo a los parametros seleccionados por el usuario
   */
  buscar(){
    // Convertimos el objeto inmueble a json
    var json = JSON.stringify(this.inmueble);
    // Redireccionamos al index con los parametros a buscar
    location.href="/?objeto="+json;
  }

  /**
   * Carga todas las ciudades
   */
  cargarCiudades(){
    this.genericoServicio.listar("ciudades", null).subscribe(rta => {
      if(rta.data != null){
        this.ciudades = rta.data
      }
    });
  }
  
  /**
   * Carga todas las ciudades
   */
  cargarTiposInmueble(){
    this.genericoServicio.listar("tipo_inmueble", null).subscribe(rta => {
      if(rta.data != null){
        this.tiposInmueble = rta.data
      }
    });
  }
  /**
   * Cerramos la sesion del usuario
   */
  logout(event) {
    this.servicios.logout();
  }


    /**
     * Iniciar Sesion en la aplicacion
     */
    login(event) {
      // enviamos al servicio
      this.servicios.Login(this.usuario).subscribe(rta => {
        if (rta.data == null) {
          this.msj = 'A ingresado datos incorrectos';
          this.show = 1;
          window.alert(this.msj);
          return false;
        } else {
          // --- El usuario se encuentra registrado ---//
          this.usuario = rta.data;
          // Obtenemos la persona del usuario
          this.servicios.getUsuarioPersona(this.usuario).subscribe(rta2 => {
            if (rta2.data == null) {
              // No se encontro la persona asociada al usuario
              this.msj = 'A ingresado datos incorrectos';
              this.show = 1;
            } else {
              // --- La persona se encuentra registrada ---//
              this.usuario.persona = rta2.data;
              // Obtenemos el rol de la persona
              this.servicios.getUsuarioPersonaRol(this.usuario.persona).subscribe(rta3 => {
                if (rta3.data == null) {
                  // No se encontro la persona asociada al usuario
                  this.msj = 'A ingresado datos incorrectos';
                  this.show = 1;
                } else {
                  this.usuario.persona.rol = rta3.data;
                  // Obtenemos los accesos del rol
                  this.servicios.getUsuarioRolAccesos(this.usuario.persona.rol).subscribe(rta4 => {
                    this.usuario.persona.rol.accesos = rta4.data;
                    // una vez construido el objeto con el usuario, persona, rol, acceso
                    // procedemos a guardarlo como variable de sesion en angular 6
                    this.servicios.setUsuario(this.usuario);
                    // Redirigimos el usuario al inicio
                     window.location.reload();
                  });
                }
              });
            }
          });
        }
      });
    }

}
