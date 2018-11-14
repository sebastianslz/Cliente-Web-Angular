import { Archivo } from './../../../Modelo/Archivo';
import { PersonaService } from '../../../Servicios/personaServ.service';
import { Usuario } from './../../../Modelo/Usuario';
import { Rol } from './../../../Modelo/Rol';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../../../Modelo/Persona';
import { Date } from '../../../Modelo/date';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../Servicios/usuarioServ.service';
import { NgForm } from '@angular/forms';
import { RolService } from '../../../Servicios/rolServ.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  // Usuario que vamos a registrar
  usuario: Usuario = new Usuario;
  // La persona asignada al usuario que vamos a registrar
  persona: Persona = new Persona();
  // Rol del cliente (2)
  rol: Rol = new Rol();

  foto: Archivo;

  // Variables para los mensajes en la pagina
  show: number;
  msj: string;

  constructor(private rolServicio: RolService, private personaServicio: PersonaService, private servicios: UsuarioService) { }

  ngOnInit() {
    // Asignamos el rol Cliente con id 2
    this.rol.id = 2;
    // Validamos si el usuario ya inicio sesion
    if (this.servicios.getUsuario() != null) {
      // como ya inicio sesion, lo redireccionamos al inicio
      this.servicios.redireccionar('/');
    }
  }


  /**
   * Registra un cliente con su usuario
   */
  registrar(form: NgForm) {
    // Asignamos el rol a la persona
    this.persona.rol = this.rol;
    // Asignamos la persona al usuario
    this.usuario.persona = this.persona;
    console.log(this.usuario);
    this.personaServicio.registrar(this.usuario).subscribe(rta => {
      if (rta.data === 'exito') {
        this.msj = 'Se ha registrado correctamente';
        this.show = 2;
        window.alert(this.msj);
        // limpiamos los campos
        form.reset();
      } else {
        this.msj = rta.data;
        this.show = 1;
        window.alert(rta.data);
      }
    });
  }

}
