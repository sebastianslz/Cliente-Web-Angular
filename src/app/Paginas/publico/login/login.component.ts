import { Usuario } from '../../../Modelo/Usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../Servicios/usuarioServ.service';
import {Router} from '@angular/router';

@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    // Variables para los mensajes en la pagina
    show: number;
    msj: string;

    // usuario que iniciara sesion
    usuario: Usuario = new Usuario();

    constructor(private servicios: UsuarioService, private router: Router) { }

    ngOnInit() {
      // Validamos si el usuario ya inicio sesion
      if (this.servicios.getUsuario() != null) {
        // como ya inicio sesion, lo redireccionamos al inicio
        this.servicios.redireccionar('/');
        return false;
      }
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
                   //  window.location.reload();
                  });
                }
              });
            }
          });
        }
      });
    }

}
